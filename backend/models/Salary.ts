import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Salary extends SoftDeletes(Model) {
  static get tableName() {
    return 'salaries';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const TalentProfile = require('./TalentProfile');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: TalentProfile,
        join: {
          from: 'salaries.id',
          to: 'talent_profiles.expected_salary_id'
        }
      },
    };
  }

}

module.exports = Salary;
