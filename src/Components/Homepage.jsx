import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'
function HomePage() {
  return (
    <div className="HomePage">
      <header>
        <h1>Welcome to the Q&A site</h1>
        <p>Get answers to your questions and help others by answering their questions.</p>
      </header>
      <main>
        <div className="action-buttons">
          <Link to="Askingpage" className="ask-button">Ask a Question</Link>
          <Link to="Questionspage" className="browse-button">Browse Questions</Link>
        </div>
        <div className="featured-questions">
          <h2>Featured Questions</h2>
          <ul>
            <li><Link to="Questionspage">What's the best way to learn React?</Link></li>
            <li><Link to="Questionspage">What are the differences between React and Angular?</Link></li>
            <li><Link to="Questionspage">How do I optimize my website for SEO?</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
