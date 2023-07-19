import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
