import React, { useState } from 'react';
import './Askingpage.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Askingpage() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
const handleSubmit = async (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('You are not logged in. Please log in to ask a question.');
    return;
  }
  const question = {
    title,
    tags,
    body,
    userId: user.uid,
    userEmail: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const db = firebase.firestore();
  try {
    const docRef = await db.collection('questions').add(question);
    console.log('Document written with ID: ', docRef.id);
    setTitle('');
    setTags('');
    setBody('');
    alert('Question added to Firestore!');
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding question to Firestore!');
  }
};


  return (
    <div className='Askingpage'>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='tags'>Topic:</label>
          <input type='text' id='tags' name='tags' value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='body'>Body:</label>
          <textarea id='body' name='body' rows='8' value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <p>Posted by {firebase.auth().currentUser?.email} at {new Date().toLocaleString()}</p>
    </div>
  );
}

export default Askingpage;
