import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DictionariesListPage from './DictionariesListPage';
import DictionaryCreatePage from './DictionaryCreatePage';
import DictionaryViewPage from './DictionaryViewPage';
import DictionaryEditPage from './DictionaryEditPage';
import NotFoundPage from './NotFoundPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={DictionariesListPage} />
          <Route exact path="/list/" component={DictionariesListPage} />
          <Route
            exact
            path="/create/"
            component={DictionaryCreatePage}
          />
          <Route
            exact
            path="/view/:dictionaryid"
            component={DictionaryViewPage}
          />
          <Route
            exact
            path="/edit/:dictionaryid"
            component={DictionaryEditPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
