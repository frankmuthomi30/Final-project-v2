import React, { useState, useEffect } from 'react';
import './Questionspage.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // get the navigate function from the router

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('questions')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const questionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsData);
      });
    return unsubscribe;
  }, []);

  const handleQuestionClick = (questionId) => {
    navigate(`/AnswersPage/${questionId}`); // navigate to the AnswersPage with the questionId as a parameter
  };

  return (
    <div className="questions-page">
      <h2>Questions</h2>
      {questions.map((question) => (
        <div key={question.id} className="question-container" onClick={() => handleQuestionClick(question.id)}>
          <div className="question-infomation">
            <h3 className="question-name">{question.title}</h3>
            <p className="question-topic">Tags: {question.tags}</p>
            <p className="question-posted-by">Posted {formatDistanceToNow(question.createdAt.toDate())} ago by {question.userEmail}</p>
          </div>
          {/* <p className="question-body">{question.body}</p> */}
        </div>
      ))}
    </div>
  );
}

export default QuestionsPage;
