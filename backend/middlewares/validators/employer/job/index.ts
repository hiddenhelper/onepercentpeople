export { };
const { index } = require('./GetJobValidator');
const { show } = require('./ShowJobValidator');
const { store } = require('./StoreJobValidator');
const { update } = require('./UpdateJobValidator');
const { destroy } = require('./DestroyJobValidator');
const { pause } = require('./PauseJobValidator');
const { resume } = require('./ResumeJobValidator');
const { post } = require('./PostJobValidator');


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  pause,
  resume,
  post,
};
