import { QuestionData } from './QuestionsData';
import {
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

export const GETTINGUNANSWEREDQUESTIONS =
  'GettingUnansweredQuestions';
export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

export const GOTUNANSWEREDQUESTIONS =
  'GotUnansweredQuestions';
export const gotUnansweredQuestionsAction = (
  questions: QuestionData[],
) =>
  ({
    type: GOTUNANSWEREDQUESTIONS,
    questions: questions,
  } as const);

export const GETQUESTION = 'GettingQuestion';
export const gettingQuestionAction = () =>
  ({
    type: GETQUESTION,
  } as const);

export const GOTQUESTION = 'GotQuestion';
export const gotQuestionAction = (
  question: QuestionData | null,
) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

export const SEARCHQUESTIONS =
  'SearchingQuestions';
export const searchingQuestionsAction = () =>
  ({
    type: SEARCHQUESTIONS,
  } as const);

export const SEARCHEDQUESTIONS =
  'SearchedQuestions';
export const searchedQuestionsAction = (
  questions: QuestionData[],
) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions,
  } as const);

type QuestionsActions =
  | ReturnType<
      typeof gettingUnansweredQuestionsAction
    >
  | ReturnType<
      typeof gotUnansweredQuestionsAction
    >
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

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
  }

  return state;
};

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
