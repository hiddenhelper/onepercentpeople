import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Video extends SoftDeletes(Model) {
  static get tableName() {
    return 'videos';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'videos.user_id',
          to: 'users.id'
        }
      },
    };
  }
}

module.exports = Video;
