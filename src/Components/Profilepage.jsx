import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebaseConfig';
import './Profilepage.css';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Profilepage() {
  // Set up state variables for user data
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  // Set up useEffect hook to update user data when user signs in or signs out
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, update state variables
        setUser(user);
        setDisplayName(user.displayName);
        setEmail(user.email);
      } else {
        // User is signed out, reset state variables
        setUser(null);
        setDisplayName('');
        setEmail('');
      }
    });

    // Clean up function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  // Handle sign out button click
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="ProfilePage">
      <h1>Profile Page</h1>
      {user ? (
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={user.photoURL || 'https://www.w3schools.com/howto/img_avatar2.png'}
              alt="Profile Avatar"
            />
          </div>
          <div className="profile-details">
            <h3>{displayName || email}</h3>
            <p>Email: {email}</p>
            <p>Username: {user.uid}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
}

export default Profilepage;
