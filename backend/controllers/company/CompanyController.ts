import { Request, Response, NextFunction } from 'express';
const Company = require('../../models/Company');
const CompanyUser = require('../../models/CompanyUser');
const BaseController = require('../BaseController');
// const os = require('os');
import generateHash from 'random-hash';
import { Storage } from '@google-cloud/storage';
import { matchedData } from 'express-validator';
const ASSETS_BUCKET = process.env.GCLOUD_STORAGE_BUCKET;

/**
 *
 * @swagger
 *
 * /employer/companies:
 *   get:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *
 * @returns list of company objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const userscompaniesSubQuery = CompanyUser.query().where('user_id', user.id).whereNotDeleted();
    const companies = await CompanyUser.relatedQuery('company').for(userscompaniesSubQuery).whereNotDeleted();

    const data = {
      'success': true,
      'companies': companies,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err.message, mes: "there was an error" });
  }
}

/**
 * Get specified Company
 *
 * @swagger
 *
 * /employer/companies{id}:
 *   get:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single company object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const { id } = req.params;
    const company = await Company.query().whereNotDeleted().findById(id);

    if (!company) {
      return res.json({
        'success': true,
        'message': 'Company not found.',
      });
    }

    const data = {
      'success': true,
      'company': company,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Company.
 *
 * @swagger
 *
 * /employer/companies:
 *   post:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: company
 *         in: body
 *         required: true
 *         type: Company
 *
 * @returns company object.
 */
async function store(req: any, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { company } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    const createdCompany = await Company.query().insertAndFetch(company);

    if (createdCompany) {
      // add company users record on company creation.
      const company_user = await Company.relatedQuery('company_users')
        .for(createdCompany.id)
        .insert({ user_id: user.id, company_id: createdCompany.id });

      const data = {
        'success': true,
        company: createdCompany,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "Company was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}


/**
 * Uploads company logo image to gcloud storage and associates it with the company.
 *
 * @swagger
 *
 * /employer/companies/{id}/logo:
 *   post:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: logoFile
 *         in: formData
 *         required: true
 *         type: file
 *
 * @returns company object.
 */
async function storeLogo(req: any, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const { logoFile } = req.files;
    // check that user is part of the company.
    const companyUser = await CompanyUser.query().whereNotDeleted().where('company_id', id).where('user_id', user.id);
    if (!companyUser) throw new Error("Only member of the company can perform this action.");

    if (logoFile) {
      const storage = new Storage();
      const destination_folder_path = `uploads/company-${user.id}/`
      // Generate unique filename
      const hash = generateHash({ length: 16 });

      let extension;
      extension = logoFile.type === "image/png" ? ".png" : extension;
      extension = logoFile.type === "image/jpeg" ? ".jpg" : extension;

      if (!extension) throw new Error("Invalid file type");

      const file_name = `logo-${hash}.${extension}`;

      storage.bucket(ASSETS_BUCKET).upload(
        logoFile.path,
        {
          destination: `${destination_folder_path}${file_name}`,
        }
      );

      const url = `https://storage.googleapis.com/${ASSETS_BUCKET}/${destination_folder_path}${file_name}`;
      const updatedCompany = await Company.query().where('id', id).patch({ logo_url: url });

      if (updatedCompany) {
        const data = {
          'success': true,
          company: updatedCompany,
        };

        return res.json(data);
      }
    }

    return res.json({ success: false, mes: "Logo was not stored successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update Company.
 *
 * @swagger
 *
 * /employer/companies/{id}:
 *   put:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: company
 *         in: body
 *         required: true
 *         type: Company
 *
 * @returns company object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { company } = matchedData(req);
    const user = await BaseController.getAuthUser(req);

    const companyUser = await CompanyUser.query()
      .whereNotDeleted()
      .where('company_id', id)
      .where('user_id', user.id)
      .first();

    if (!companyUser) throw new Error("Only member of the company can perform this action.");

    const updatedCompany = await Company.query().whereNotDeleted().patchAndFetchById(id, company);

    const data = {
      'success': true,
      'company': updatedCompany
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err.message, mes: "there was an error" });
  }
}

/**
 * Delete Company.
 *
 * @swagger
 *
 * /employer/companies/{id}:
 *   delete:
 *     tags:
 *       - company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns boolean.
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);

    // Make sure user is part of company before deleting.
    const companyUser = await CompanyUser.query().whereNotDeleted().where('company_id', id).where('user_id', user.id).find();
    if (!companyUser) throw new Error("Only member of the company can perform this action.");

    const deletedWorkHistory = await Company.query().delete().findById(id);

    const data = {
      'success': true,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  storeLogo,
}
