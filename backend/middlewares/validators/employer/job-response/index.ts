export { };
const { index } = require('./GetJobResponseValidator');
const { show } = require('./ShowJobResponseValidator');
const { interested } = require('./InterestedJobResponseValidator');
const { reject } = require('./RejectJobResponseValidator');
const { hire } = require('./HireJobResponseValidator');

module.exports = {
  index,
  show,
  interested,
  reject,
  hire,
};
