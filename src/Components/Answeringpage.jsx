import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { formatDistanceToNow } from 'date-fns';

function AnswerPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('questions')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setQuestion(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    const unsubscribe = db
      .collection('questions')
      .doc(id)
      .collection('answers')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        console.log('snapshot', snapshot);

        setAnswers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        console.log(answers)
      });

    return () => unsubscribe();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) {
      alert('You are not logged in. Please log in to submit an answer.');
      return;
    }
    const db = firebase.firestore();
    const answer = {
      text: answerText,
      userId: user.uid,
      userEmail: user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    try {
      await db.collection('questions').doc(id).collection('answers').add(answer);
      setAnswerText('');
      alert('Answer added to Firestore!');
    } catch (error) {
      console.error('Error adding answer: ', error);
      alert('Error adding answer to Firestore!');
    }
  };

  return (
    <div>
      {question && (
        <div className="questionasked">
          <h2>{question.title}</h2>
          <p className="question-tags">{question.tags}</p>
          <p className="question-posted-by">Posted by {question.userEmail} {formatDistanceToNow(question.createdAt.toDate())} ago</p>
          <p>{question.body}</p>
        </div>
      )}
      <hr />
      <h2>Answers</h2>
      {answers.map((answer) => (
        <div key={answer.id} className="Answers">
          <p>{answer.text}</p>
          <p className="answer-info">Answered by {answer.userEmail} {formatDistanceToNow(answer.createdAt.toDate())} ago</p>
          <hr />
        </div>
      ))}
      <form onSubmit={handleAnswerSubmit}>
        <div className="form-group">
          <label htmlFor="answerText">Your Answer:</label>
          <textarea
            id="answerText"
            name="answerText"
            rows="8"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default AnswerPage;

