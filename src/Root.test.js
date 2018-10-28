import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Root from './Root';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<Root />', () => {
  describe('render()', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Root store={store} />);
    });

    it('has the right child nodes', () => {
      const wrapper = shallow(<Root store={store} />);
      expect(wrapper.find('Provider')).toHaveLength(1);
      expect(wrapper.find('BrowserRouter')).toHaveLength(1);
      expect(wrapper.find('Route')).toHaveLength(1);
    });
  });
});
