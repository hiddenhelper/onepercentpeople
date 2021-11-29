import { Model } from 'objection';
const SoftDeletes = require('../objection-mixins/SoftDeletes')();

class Chat extends SoftDeletes(Model) {
  static get tableName() {
    return 'chats';
  }


  static modifiers = {
    /**
     * Restricts messages to currrent user's messages
     * @param query
     * @param user
     */
    userMessages(query, user) {
      user.isEmployer() ? query.where('employer_user_id', user.id) : query.where('talent_user_id', user.id);
    },

    /**
     * Restricts message to one with the given talent_user_id.
     * @param query
     * @param talent_user_id
     */
    talentUserFilter(query: any, talent_user_id: any) {
      talent_user_id ? query.where('talent_user_id', talent_user_id) : null;
    },
  };

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const Job = require('./Job');
    const JobResponse = require('./JobResponse');

    return {
      employer_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'chats.employer_user_id',
          to: 'users.id'
        }
      },
      talent_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'chats.talent_user_id',
          to: 'users.id'
        }
      },
      job: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: 'chats.job_id',
          to: 'jobs.id'
        }
      },
      job_response: {
        relation: Model.BelongsToOneRelation,
        modelClass: JobResponse,
        join: {
          from: 'chats.job_response_id',
          to: 'job_responses.id'
        }
      },
    };
  }
}

module.exports = Chat;
