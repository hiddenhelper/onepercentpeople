import { Model } from 'objection';

const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class JobResponse extends SoftDeletes(Model) {
  static get tableName() {
    return 'job_responses';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Job = require('./Job');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'job_responses.user_id',
          to: 'users.id'
        }
      },
      job: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: 'job_responses.job_id',
          to: 'jobs.id'
        }
      },
    };
  }
}

module.exports = JobResponse;
