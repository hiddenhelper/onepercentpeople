import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class CompanyUser extends SoftDeletes(Model) {
  static get tableName() {
    return 'company_users';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Company = require('./Company');

    return {
      company: {
        relation: Model.HasOneRelation,
        modelClass: Company,
        join: {
          from: 'companies.id',
          to: 'company_users.company_id',
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'company_users.user_id',
        }
      },
    };
  }
}

module.exports = CompanyUser;
