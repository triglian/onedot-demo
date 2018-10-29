import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import configureStore from 'redux-mock-store';

describe('<App />', () => {
  describe('render()', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<App />);
    });
  });

  describe('routing', () => {
    it('has the all the routes', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('Route')).toHaveLength(6);
    });
  });
});
