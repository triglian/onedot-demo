import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = props => {
  return (
    <div>
      <header className="App-header">
        <h1>React Dictionary App</h1>
      </header>
      <div>
        <h2>404 - Not found</h2>
        <Link to="/">Return to the home page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
