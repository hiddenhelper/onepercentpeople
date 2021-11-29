import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Company extends SoftDeletes(Model) {
  static get tableName() {
    return 'companies';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Job = require('./Job');
    const CompanyUser = require('./CompanyUser');

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'companies.id',
          through: {
            from: 'company_users.company_id',
            to: 'company_users.user_id'
          },
          to: 'users.id'
        }
      },
      company_users: {
        relation: Model.HasManyRelation,
        modelClass: CompanyUser,
        join: {
          from: 'companies.id',
          to: 'company_users.company_id',
        }
      },
      jobs: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: 'jobs.company_id',
          to: 'companies.id'
        }
      },
    };
  }
}

module.exports = Company;
