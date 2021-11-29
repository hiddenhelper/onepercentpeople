import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class TalentProfile extends SoftDeletes(Model) {
  static get tableName() {
    return 'talent_profiles';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Salary = require('./Salary');
    const EmploymentType = require('./EmploymentType');
    const EnglishProficiency = require('./EnglishProficiency');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'talent_profiles.user_id',
          to: 'users.id'
        }
      },
      expected_salary: {
        relation: Model.BelongsToOneRelation,
        modelClass: Salary,
        join: {
          from: 'talent_profiles.expected_salary_id',
          to: 'salaries.id'
        }
      },
      employment_type_preference: {
        relation: Model.BelongsToOneRelation,
        modelClass: EmploymentType,
        join: {
          from: 'talent_profiles.employment_type_preference_id',
          to: 'employment_types.id'
        }
      },
      english_proficiency: {
        relation: Model.BelongsToOneRelation,
        modelClass: EnglishProficiency,
        join: {
          from: 'talent_profiles.english_proficiency_id',
          to: 'english_proficiencies.id'
        }
      },
    };
  }

}

module.exports = TalentProfile;
