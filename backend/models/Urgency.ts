import { Model } from 'objection';

class Urgency extends Model {
  static get tableName() {
    return 'urgencies';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Job = require('./Job');

    return {
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: 'urgencies.id',
          to: 'jobs.urgency_id'
        }
      },
    };
  }

}

module.exports = Urgency;
