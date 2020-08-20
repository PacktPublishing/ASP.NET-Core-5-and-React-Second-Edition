import React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { QuestionList } from './QuestionList';
import { getUnansweredQuestions } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

import { PrimaryButton } from './Styles';

import { useNavigate } from 'react-router-dom';

import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  GettingUnansweredQuestionsAction,
  GotUnansweredQuestionsAction,
  AppState,
} from './Store';

export const HomePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: AppState) =>
      state.questions.unanswered,
  );
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading,
  );

  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
        type: 'GettingUnansweredQuestions',
      };
      dispatch(gettingUnansweredQuestionsAction);
      const unansweredQuestions = await getUnansweredQuestions();
      const gotUnansweredQuestionsAction: GotUnansweredQuestionsAction = {
        type: 'GotUnansweredQuestions',
        questions: unansweredQuestions,
      };
      dispatch(gotUnansweredQuestionsAction);
    };
    doGetUnansweredQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>
          Unanswered Questions
        </PageTitle>
        <PrimaryButton
          onClick={handleAskQuestionClick}
        >
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};
