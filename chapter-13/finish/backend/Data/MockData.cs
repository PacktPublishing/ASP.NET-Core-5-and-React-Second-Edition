using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QandA.Data
{
    public static class MockData
    {
        public static readonly IEnumerable<MockQuestion> Questions = new List<MockQuestion>()
            {
                new MockQuestion()
                {
                    QuestionId = 1,
                    Title = "Why should I learn TypeScript?",
                    Content = "TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?",
                    UserId = "1",
                    UserName = "bob.test@test.com",
                    Created = new DateTime(2020, 12, 04, 14, 32, 0),
                    Answers = new List<MockAnswer>()
                    {
                        new MockAnswer()
                        {
                            AnswerId = 1,
                            QuestionId = 1,
                            Content = "To catch problems earlier speeding up your developments",
                            UserId = "2",
                            UserName = "jane.test@test.com",
                            Created = new DateTime(2020, 12, 04, 14, 40, 0),
                        },
                        new MockAnswer()
                        {
                            AnswerId = 2,
                            QuestionId = 1,
                            Content = "So, that you can use the JavaScript features of tomorrow, today",
                            UserId = "3",
                            UserName = "fred.test@test.com",
                            Created = new DateTime(2020, 12, 06, 10, 04, 0),
                        }
                    }
                },
                new MockQuestion()
                {
                    QuestionId = 2,
                    Title = "Which state management tool should I use?",
                    Content = "There seem to be a fair few state management tools around for React - Redux, Recoil, ... Which one should I use?",
                    UserId = "2",
                    UserName = "jane.test@test.com",
                    Created = new DateTime(2020, 12, 04, 15, 03, 0),
                    Answers = new List<MockAnswer>()
                },
                new MockQuestion()
                {
                    QuestionId = 3,
                    Title = "Accessing HttpContext in a service class",
                    Content = "How do you access HttpContext",
                    UserId = "1",
                    UserName = "bob.test@test.com",
                    Created = new DateTime(2020, 12, 06, 17, 39, 0),
                    Answers = new List<MockAnswer>()
                }
            };

        public static readonly string[] Users = { "", "bob.test@test.com", "jane.test@test.com", "fred.test@test.com" };
    }

    public class MockQuestion
    {
        public int QuestionId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public IEnumerable<MockAnswer> Answers { get; set; }
    }
    public class MockAnswer
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}
