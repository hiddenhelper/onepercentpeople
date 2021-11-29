import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Currency extends SoftDeletes(Model) {
  static get tableName() {
    return 'currencies';
  }
}

module.exports = Currency;
