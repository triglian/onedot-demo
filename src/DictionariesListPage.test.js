import React from 'react';
import ReactDOM from 'react-dom';
import DictionariesListPage from './DictionariesListPage';
import configureStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<DictionariesListPage />', () => {
  describe('render()', () => {
    let shallow;

    beforeEach(() => {
      shallow = createShallow({ untilSelector: 'Button' });
    });

    it('renders without crashing', () => {
      const wrapper = shallow(<DictionariesListPage store={store} />);
    });

    it('has the right child nodes', () => {
      const wrapper = shallow(<DictionariesListPage store={store} />);
      expect(wrapper.find('header')).toHaveLength(1);
      expect(wrapper.find('WithStyles(DictionariesTable)')).toHaveLength(1);
      expect(wrapper.find('WithStyles(Tooltip)')).toHaveLength(1);
      expect(wrapper.find('WithStyles(Button)')).toHaveLength(1);
    });
  });
});
