using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QandA.Data.Models;

namespace QandA.Data
{
    public interface IQuestionCache
    {
        QuestionGetSingleResponse Get(int questionId);
        void Remove(int questionId);
        void Set(QuestionGetSingleResponse question);
    }
}

