import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class EducationLevel extends SoftDeletes(Model) {
  static get tableName() {
    return 'education_levels';
  }

}

module.exports = EducationLevel;
