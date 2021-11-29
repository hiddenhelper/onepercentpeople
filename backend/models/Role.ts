import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Role extends SoftDeletes(Model) {
  static get tableName() {
    return 'roles';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Job = require('./Job');

    return {
      jobs: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: 'roles.id',
          to: 'jobs.role_id'
        }
      },
    };
  }

}

module.exports = Role;
