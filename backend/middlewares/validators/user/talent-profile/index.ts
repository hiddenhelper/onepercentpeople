export { };
const { index } = require('./GetTalentProfileValidator');
const { show } = require('./ShowTalentProfileValidator');
const { store } = require('./StoreTalentProfileValidator');
const { update } = require('./UpdateTalentProfileValidator');
const { destroy } = require('./DestroyTalentProfileValidator');


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
