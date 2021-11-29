import { Model } from 'objection';

class EnglishProficiency extends Model {
  static get tableName() {
    return 'english_proficiencies';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const TalentProfile = require('./TalentProfile');

    return {
      talent_profiles: {
        relation: Model.HasManyRelation,
        modelClass: TalentProfile,
        join: {
          from: 'english_proficiencies.id',
          to: 'talent_profiles.english_proficiency_id'
        }
      },
    };
  }

}

module.exports = EnglishProficiency;
