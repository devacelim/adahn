import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'


ReactDOM.render(
    <Router>
      <div>

        <Route path="/" component={Header} />

      </div>
    </Router>,
    document.getElementById('root'),
  );