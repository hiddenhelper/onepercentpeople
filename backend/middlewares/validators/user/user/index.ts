export { };
const { index } = require('./GetUserValidator');
const { update } = require('./UpdateUserValidator');
const { storeProfilePhoto } = require('./StoreProfilePhotoUserValidator');


module.exports = {
  index,
  update,
  storeProfilePhoto,
};
