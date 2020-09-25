using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QandA.Data;
using QandA.Data.Models;

namespace QandA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        private readonly IQuestionCache _cache;
        public QuestionsController(IDataRepository dataRepository, IQuestionCache questionCache)
        {
            _dataRepository = dataRepository;
            _cache = questionCache;
        }

        [HttpGet]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetQuestions(string search, bool includeAnswers, int page = 1, int pageSize = 20)
        {
            if (string.IsNullOrEmpty(search))
            {
                if (includeAnswers)
                {
                    return await _dataRepository.GetQuestionsWithAnswers();
                }
                else
                {
                    return await _dataRepository.GetQuestions();
                }
            }
            else
            {
                return await _dataRepository.GetQuestionsBySearchWithPaging(search, page, pageSize);
            }
        }

        [HttpGet("unanswered")]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions()
        {
            return await _dataRepository.GetUnansweredQuestions();
        }

        [HttpGet("{questionId}")]
        public async Task<ActionResult<QuestionGetSingleResponse>> GetQuestion(int questionId)
        {
            var question = _cache.Get(questionId);
            if (question == null)
            {
                question = await _dataRepository.GetQuestion(questionId);
                if (question == null)
                {
                    return NotFound();
                }
                _cache.Set(question);
            }
            return question;
        }

        [HttpPost]
        public async Task<ActionResult<QuestionGetSingleResponse>> PostQuestion(QuestionPostRequest questionPostRequest)
        {
            var savedQuestion = await _dataRepository.PostQuestion(new QuestionPostFullRequest
            {
                Title = questionPostRequest.Title,
                Content = questionPostRequest.Content,
                UserName = "bob.test@test.com",
                UserId = "1",
                Created = DateTime.UtcNow
            });
            return CreatedAtAction(nameof(GetQuestion), new
            {
                questionId = savedQuestion.QuestionId
            }, savedQuestion);
        }

        [HttpPut("{questionId}")]
        public async Task<ActionResult<QuestionGetSingleResponse>> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = await _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title) ? question.Title : questionPutRequest.Title;
            questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content) ? question.Content : questionPutRequest.Content;
            var savedQuestion = await _dataRepository.PutQuestion(questionId, questionPutRequest);
            _cache.Remove(savedQuestion.QuestionId);
            return savedQuestion;
        }

        [HttpDelete("{questionId}")]
        public async Task<ActionResult> DeleteQuestion(int questionId)
        {
            var question = await _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            await _dataRepository.DeleteQuestion(questionId);
            _cache.Remove(questionId);
            return NoContent();
        }

        [HttpPost("answer")]
        public async Task<ActionResult<AnswerGetResponse>> PostAnswer(AnswerPostRequest answerPostRequest)
        {
            var questionExists = await _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
            if (!questionExists)
            {
                return NotFound();
            }
            var savedAnswer = await _dataRepository.PostAnswer(new AnswerPostFullRequest
            {
                QuestionId = answerPostRequest.QuestionId.Value,
                Content = answerPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });

            _cache.Remove(answerPostRequest.QuestionId.Value);

            return savedAnswer;
        }

    }
}
