import React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { QuestionList } from './QuestionList';
import {
  getUnansweredQuestions,
  QuestionData,
} from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

import { PrimaryButton } from './Styles';

import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [
    questions,
    setQuestions,
  ] = React.useState<QuestionData[]>([]);
  const [
    questionsLoading,
    setQuestionsLoading,
  ] = React.useState(true);

  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
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
