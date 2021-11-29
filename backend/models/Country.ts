import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Country extends SoftDeletes(Model) {
  static get tableName() {
    return 'countries';
  }
}

module.exports = Country;
