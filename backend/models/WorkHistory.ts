import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class WorkHistory extends SoftDeletes(Model) {
  static get tableName() {
    return 'work_history';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Country = require('./Country');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'work_history.user_id',
          to: 'users.id'
        }
      },
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: 'work_history.country_id',
          to: 'countries.id'
        }
      },
    };
  }
}

module.exports = WorkHistory;
