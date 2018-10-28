import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DictionariesListPage from './DictionariesListPage';
import DictionaryViewPage from './DictionaryViewPage';
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
            path="/view/:dictionaryid"
            component={DictionaryViewPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
