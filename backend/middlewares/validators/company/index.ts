export { };
const { index } = require('./GetCompanyValidator');
const { show } = require('./ShowCompanyValidator');
const { store } = require('./StoreCompanyValidator');
const { update } = require('./UpdateCompanyValidator');
const { destroy } = require('./DestroyCompanyValidator');
const { storeLogo } = require('./StoreLogoCompanyValidator');

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  storeLogo,
};
