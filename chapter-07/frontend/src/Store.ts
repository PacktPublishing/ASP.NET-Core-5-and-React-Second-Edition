import { QuestionData } from './QuestionsData';
import {
  Action,
  Store,
  createStore,
  combineReducers,
} from 'redux';

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}
export interface AppState {
  readonly questions: QuestionsState;
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

export interface GettingUnansweredQuestionsAction
  extends Action<'GettingUnansweredQuestions'> {}

export interface GotUnansweredQuestionsAction
  extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[];
}

export interface GettingQuestionAction
  extends Action<'GettingQuestion'> {}

export interface GotQuestionAction
  extends Action<'GotQuestion'> {
  question: QuestionData | null;
}

export interface SearchingQuestionsAction
  extends Action<'SearchingQuestions'> {}

export interface SearchedQuestionsAction
  extends Action<'SearchedQuestions'> {
  questions: QuestionData[];
}

type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | GettingQuestionAction
  | GotQuestionAction
  | SearchingQuestionsAction
  | SearchedQuestionsAction;

const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions,
) => {
  switch (action.type) {
    case 'GettingUnansweredQuestions': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GotUnansweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case 'GettingQuestion': {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case 'GotQuestion': {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case 'SearchingQuestions': {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case 'SearchedQuestions': {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
    default:
      neverReached(action);
  }

  return state;
};

const neverReached = (never: never) => {};

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export function configureStore(): Store<
  AppState
> {
  const store = createStore(
    rootReducer,
    undefined,
  );
  return store;
}
