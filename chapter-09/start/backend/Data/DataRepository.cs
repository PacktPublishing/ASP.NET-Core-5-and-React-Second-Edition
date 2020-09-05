using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using QandA.Data.Models;
using System.Reflection;

namespace QandA.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly string _connectionString;
        public DataRepository(IConfiguration configuration)
        {
            _connectionString =
            configuration["ConnectionStrings:DefaultConnection"];
        }

        public AnswerGetResponse GetAnswer(int answerId)
        {
            return new AnswerGetResponse();
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            var q = MockData.Questions.Where(q => q.QuestionId == questionId).FirstOrDefault();
            if (q == null)
            {
                return null;
            }
            return new QuestionGetSingleResponse()
            {
                QuestionId = q.QuestionId,
                Title = q.Title,
                Content = q.Content,
                UserName = q.UserName,
                UserId = q.UserId,
                Created = q.Created,
                Answers = q.Answers.Select(a => new AnswerGetResponse() { AnswerId = a.AnswerId, Content = a.Content, UserName = a.UserName, Created = a.Created })
            };
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            return MockData.Questions.Select(q =>
                new QuestionGetManyResponse()
                {
                    QuestionId = q.QuestionId,
                    Title = q.Title,
                    Content = q.Content,
                    UserName = q.UserName,
                    Created = q.Created,
                });
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            return MockData.Questions
                .Where(q => q.Title.ToLower().Contains(search.ToLower()) || q.Content.ToLower().Contains(search.ToLower()))
                .Select(q =>
                    new QuestionGetManyResponse()
                    {
                        QuestionId = q.QuestionId,
                        Title = q.Title,
                        Content = q.Content,
                        UserName = q.UserName,
                        Created = q.Created,
                    });
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            return MockData.Questions
                .Where(q => q.Answers.Count() == 0)
                .Select(q =>
                    new QuestionGetManyResponse()
                    {
                        QuestionId = q.QuestionId,
                        Title = q.Title,
                        Content = q.Content,
                        UserName = q.UserName,
                        Created = q.Created,
                    });
        }

        public bool QuestionExists(int questionId)
        {
            return MockData.Questions
                .Where(q => q.QuestionId == questionId)
                .Count() > 0;
        }

        public QuestionGetSingleResponse PostQuestion(QuestionPostRequest question)
        {
            var nextQuestionId = MockData.Questions.Select(q => q.QuestionId).Max() + 1;
            return new QuestionGetSingleResponse()
            {
                QuestionId = nextQuestionId,
                Title = question.Title,
                Content = question.Content,
                UserId = question.UserId,
                UserName = MockData.Users[Convert.ToInt32(question.UserId)],
                Created = question.Created,
                Answers = new List<AnswerGetResponse>()
            };
        }

        public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
        {
            var q = GetQuestion(questionId);
            q.Title = question.Title;
            q.Content = question.Content;
            return q;
        }

        public void DeleteQuestion(int questionId)
        {
        }

        public AnswerGetResponse PostAnswer(AnswerPostRequest answer)
        {
            return new AnswerGetResponse()
            {
                AnswerId = 3,
                Content = answer.Content,
                UserName = answer.UserName,
                Created = answer.Created
            };
        }
    }
}
