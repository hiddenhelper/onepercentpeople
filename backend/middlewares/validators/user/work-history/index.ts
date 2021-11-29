export { };
const { index } = require('./GetWorkHistoryValidator');
const { show } = require('./ShowWorkHistoryValidator');
const { store } = require('./StoreWorkHistoryValidator');
const { update } = require('./UpdateWorkHistoryValidator');
const { destroy } = require('./DestroyWorkHistoryValidator');


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
