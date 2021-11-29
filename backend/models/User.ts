import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class User extends SoftDeletes(Model) {
  static get tableName() {
    return 'users';
  }


  /**
   * Returns whether the account type is "talent".
   *
   * @returns boolean
  */
  isTalent() {
    return this.account_type === 1;
  }

  /**
   * Returns whether the account type is "employer".
   *
   * @returns boolean
  */
  isEmployer() {
    return this.account_type === 2;
  }

  /**
   * Returns the user's upload directory in cloud storage.
   *
   * @returns boolean
  */
  uploadsDirectory() {
    return `uploads/user-${this.id}/`
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const TalentProfile = require('./TalentProfile');
    const WorkHistory = require('./WorkHistory');
    const Resume = require('./Resume');
    const Education = require('./Education');
    const Video = require('./Video');
    const Company = require('./Company');
    const Job = require('./Job');
    const JobResponse = require('./JobResponse');
    const Country = require('./Country');

    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: 'users.country_id',
          to: 'countries.id'
        }
      },
      talent_profiles: {
        relation: Model.HasManyRelation,
        modelClass: TalentProfile,
        join: {
          from: 'users.id',
          to: 'talent_profiles.user_id'
        }
      },
      work_history: {
        relation: Model.HasManyRelation,
        modelClass: WorkHistory,
        join: {
          from: 'users.id',
          to: 'work_history.user_id'
        }
      },
      resumes: {
        relation: Model.HasManyRelation,
        modelClass: Resume,
        join: {
          from: 'users.id',
          to: 'resumes.user_id'
        }
      },
      education: {
        relation: Model.HasManyRelation,
        modelClass: Education,
        join: {
          from: 'users.id',
          to: 'education.user_id'
        }
      },
      videos: {
        relation: Model.HasManyRelation,
        modelClass: Video,
        join: {
          from: 'users.id',
          to: 'videos.user_id'
        }
      },
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: 'users.id',
          to: 'jobs.user_id'
        }
      },
      job_responses: {
        relation: Model.HasManyRelation,
        modelClass: JobResponse,
        join: {
          from: 'users.id',
          to: 'job_responses.user_id'
        }
      },
      companies: {
        relation: Model.ManyToManyRelation,
        modelClass: Company,
        join: {
          from: 'users.id',
          through: {
            from: 'company_users.user_id',
            to: 'company_users.company_id'
          },
          to: 'companies.id'
        }
      }
    };
  }

}

module.exports = User;
