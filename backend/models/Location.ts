import { Model } from 'objection';

class Location extends Model {
  static get tableName() {
    return 'locations';
  }
}

module.exports = Location;
