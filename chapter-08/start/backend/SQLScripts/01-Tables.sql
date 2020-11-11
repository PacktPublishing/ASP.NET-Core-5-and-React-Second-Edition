CREATE TABLE dbo.Question(
  QuestionId int IDENTITY(1,1) NOT NULL,
  Title nvarchar(100) NOT NULL,
  Content nvarchar(max) NOT NULL,
  UserId nvarchar(150) NOT NULL,
  UserName nvarchar(150) NOT NULL,
  Created datetime2(7) NOT NULL,
 CONSTRAINT PK_Question PRIMARY KEY CLUSTERED 
(
  QuestionId ASC
)
) 
GO

CREATE TABLE dbo.Answer(
  AnswerId int IDENTITY(1,1) NOT NULL,
  QuestionId int NOT NULL,
  Content nvarchar(max) NOT NULL,
  UserId nvarchar(150) NOT NULL,
  UserName nvarchar(150) NOT NULL,
  Created datetime2(7) NOT NULL,
 CONSTRAINT PK_Answer PRIMARY KEY CLUSTERED 
(
  AnswerId ASC
)
) 
GO
ALTER TABLE dbo.Answer  WITH CHECK ADD  CONSTRAINT FK_Answer_Question FOREIGN KEY(QuestionId)
REFERENCES dbo.Question (QuestionId)
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE dbo.Answer CHECK CONSTRAINT FK_Answer_Question
GO

SET IDENTITY_INSERT dbo.Question ON 
GO
INSERT INTO dbo.Question(QuestionId, Title, Content, UserId, UserName, Created)
VALUES(1, 'Why should I learn TypeScript?', 
    'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    '1',
    'bob.test@test.com',
    '2021-01-18 14:32')

INSERT INTO dbo.Question(QuestionId, Title, Content, UserId, UserName, Created)
VALUES(2, 'Which state management tool should I use?', 
    'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
    '2',
    'jane.test@test.com',
    '2021-01-18 14:48')
GO
SET IDENTITY_INSERT dbo.Question OFF
GO

SET IDENTITY_INSERT dbo.Answer ON 
GO
INSERT INTO dbo.Answer(AnswerId, QuestionId, Content, UserId, UserName, Created)
VALUES(1, 1, 'To catch problems earlier speeding up your developments', '2', 'jane.test@test.com', '2021-01-18 14:40')

INSERT INTO dbo.Answer(AnswerId, QuestionId, Content, UserId, UserName, Created)
VALUES(2, 1, 'So, that you can use the JavaScript features of tomorrow, today', '3', 'fred.test@test.com', '2021-01-18 16:18')
GO
SET IDENTITY_INSERT dbo.Answer OFF 
GO