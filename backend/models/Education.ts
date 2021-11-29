import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Education extends SoftDeletes(Model) {
  static get tableName() {
    return 'education';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Country = require('./Country');
    const EducationLevel = require('./EducationLevel');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'education.user_id',
          to: 'users.id'
        }
      },
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: 'education.country_id',
          to: 'countries.id'
        }
      },
      education_level: {
        relation: Model.BelongsToOneRelation,
        modelClass: EducationLevel,
        join: {
          from: 'education.education_level_id',
          to: 'education_levels.id'
        }
      },
    };
  }

}

module.exports = Education;
