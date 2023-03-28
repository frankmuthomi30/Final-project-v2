import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './Navbar.css';

function Navbar() {
  // Set up state variable for user data
  const [user, setUser] = useState(null);

  // Set up useEffect hook to update user data when user signs in or signs out
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, update state variable
        setUser(user);
      } else {
        // User is signed out, reset state variable
        setUser(null);
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
    <div className='Navbar'>    
      <nav>
        <ul>
          <li><Link to='/'>LOGIN</Link></li>
          <li><Link to='Homepage'>HOME</Link></li>
          <li><Link to='Askingpage'>ASK QUESTION</Link></li>
          <li><Link to='Questionspage'>QUESTIONS</Link></li>
          {user ? (
            <li><Link to='Profilepage'>{user.displayName || user.email}</Link></li>
          ) : (
            <li><Link to='Signuppage'>SIGNUP</Link></li>
          )}
          {user && <li><button onClick={handleSignOut}>SIGN OUT</button></li>}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
