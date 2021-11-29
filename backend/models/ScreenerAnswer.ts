import { Model } from 'objection';

class ScreenerAnswers extends Model {
  static get tableName() {
    return 'screener_answers';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');

    return {
      screener_question: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'screener_answers.screener_question_id',
          to: 'screener_questions.id'
        }
      },
    };
  }
}

module.exports = ScreenerAnswers;
