import { Model } from 'objection';

class ScreenerQuestion extends Model {
  static get tableName() {
    return 'screener_questions';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    const ScreenerAnswers = require('./ScreenerAnswers');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'screener_questions.job_id',
          to: 'jobs.id'
        }
      },
      screener_answers: {
        relation: Model.HasManyRelation,
        modelClass: ScreenerAnswers,
        join: {
          from: 'screener_questions.id',
          to: 'screener_answers.screener_question_id'
        }
      },
    };
  }
}

module.exports = ScreenerQuestion;
