import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Resume extends SoftDeletes(Model) {
  static get tableName() {
    return 'resumes';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'resumes.user_id',
          to: 'users.id'
        }
      },
    };
  }
}

module.exports = Resume;
