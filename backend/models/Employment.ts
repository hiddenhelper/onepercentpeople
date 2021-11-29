import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Employment extends SoftDeletes(Model) {
  static get tableName() {
    return 'employments';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Company = require('./Company');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'employments.user_id',
          to: 'users.id'
        }
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'employments.company_id',
          to: 'companies.id'
        }
      },
    };
  }

}

module.exports = Employment;
