import { Model } from 'objection';

const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Job extends SoftDeletes(Model) {

  static get tableName() {
    return 'jobs';
  }

  static modifiers = {
    openToApplications(query) {
      query
        .whereNotNull('posted_at')
        .whereNull('paused_at')
        .whereNull('deleted_at');
    },
  };

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Company = require('./Company');
    const Role = require('./Role');
    const Urgency = require('./Urgency');
    const EmploymentType = require('./EmploymentType');
    const JobResponse = require('./JobResponse');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'jobs.user_id',
          to: 'users.id'
        }
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'jobs.company_id',
          to: 'companies.id'
        }
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'jobs.role_id',
          to: 'roles.id'
        }
      },
      urgency: {
        relation: Model.BelongsToOneRelation,
        modelClass: Urgency,
        join: {
          from: 'jobs.urgency_id',
          to: 'urgencies.id'
        }
      },
      employment_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: EmploymentType,
        join: {
          from: 'jobs.employment_type_id',
          to: 'employment_types.id'
        }
      },
      job_responses: {
        relation: Model.HasManyRelation,
        modelClass: JobResponse,
        join: {
          from: 'jobs.id',
          to: 'job_responses.job_id'
        }
      },
    };
  }

}

module.exports = Job;
