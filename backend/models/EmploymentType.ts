import { Model } from 'objection';

class EmploymentType extends Model {
  static get tableName() {
    return 'employment_types';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Job = require('./Job');

    return {
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: 'employment_types.id',
          to: 'jobs.employment_type_id'
        }
      },
    };
  }

}

module.exports = EmploymentType;
