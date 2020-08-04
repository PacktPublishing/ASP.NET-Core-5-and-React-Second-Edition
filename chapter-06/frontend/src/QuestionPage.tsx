import React from 'react';
import { Page } from './Page';
import { useParams } from 'react-router-dom';
import {
  QuestionData,
  getQuestion,
  postAnswer,
} from './QuestionsData';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';

import { AnswerList } from './AnswerList';

import { useForm } from 'react-hook-form';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const [
    successfullySubmitted,
    setSuccessfullySubmitted,
  ] = React.useState(false);

  const [
    question,
    setQuestion,
  ] = React.useState<QuestionData | null>(null);

  const { questionId } = useParams();

  React.useEffect(() => {
    const doGetQuestion = async (
      questionId: number,
    ) => {
      const foundQuestion = await getQuestion(
        questionId,
      );
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);

  const {
    register,
    errors,
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccessfullySubmitted(
      result ? true : false,
    );
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0
            rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null
            ? ''
            : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
  ${question.created.toLocaleDateString()} 
  ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={
                  formState.isSubmitting ||
                  successfullySubmitted
                }
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">
                    Your Answer
                  </FieldLabel>
                  <FieldTextArea
                    id="content"
                    name="content"
                    ref={register({
                      required: true,
                      minLength: 50,
                    })}
                  />
                  {errors.content &&
                    errors.content.type ===
                      'required' && (
                      <FieldError>
                        Your must enter the answer
                      </FieldError>
                    )}
                  {errors.content &&
                    errors.content.type ===
                      'minLength' && (
                      <FieldError>
                        The answer must be at
                        least 50 characters
                      </FieldError>
                    )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully
                    submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
