export { };
const { index } = require('./GetEducationValidator');
const { show } = require('./ShowEducationValidator');
const { store } = require('./StoreEducationValidator');
const { update } = require('./UpdateEducationValidator');
const { destroy } = require('./DestroyEducationValidator');


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
