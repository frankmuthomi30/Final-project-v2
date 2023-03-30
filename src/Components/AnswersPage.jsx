import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function AnswersPage() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    const db = firebase.firestore();
    const questionRef = db.collection('questions').doc(questionId);

    questionRef.get().then((doc) => {
      if (doc.exists) {
        const questionData = {
          id: doc.id,
          ...doc.data(),
        };
        setQuestion(questionData);
      } else {
        console.log('No such document!');
      }
    });

    const unsubscribe = questionRef.collection('answers')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const answersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnswers(answersData);
      });

    return unsubscribe;
  }, [questionId]);

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    const { uid, email } = firebase.auth().currentUser;
    const { content } = event.target.elements;

    const answerData = {
      content: content.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userUid: uid,
      userEmail: email,
    };

    await db.collection('questions').doc(questionId).collection('answers').add(answerData);

    content.value = ''; // clear the input field
  };

  return (
    <div className="answers-page">
      {question && (
        <div className="question-container">
          <div className="question-info">
            <h3 className="question-title">{question.title}</h3>
            <p className="question-tags">Tags: {question.tags}</p>
            <p className="question-posted-by">Posted {formatDistanceToNow(question.createdAt.toDate())} ago by {question.userEmail}</p>
          </div>
          <p className="question-body">{question.body}</p>
        </div>
      )}
      <div className="answer-form-container">
        <form onSubmit={handleAnswerSubmit} className="answer-form">
          <textarea name="content" placeholder="Write your answer here" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      {answers.length > 0 ? (
        <div className="answers-list">
          {answers.map((answer) => (
            <div key={answer.id} className="answer-container">
              <div className="answer-info">
                <p className="answer-content">{answer.content}</p>
                <p className="answer-posted-by">Posted {formatDistanceToNow(answer.createdAt.toDate())} ago by {answer.userEmail}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No answers yet.</p>
      )}
    </div>
  );
}

export default AnswersPage;
