import React from 'react';
import ReactDOM from 'react-dom';
import DictionaryViewPage from './DictionaryViewPage';
import configureStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import { createMount } from '@material-ui/core/test-utils';
import dictionaryData from './data/dictionaryData';

const mockStore = configureStore();
const initialState = {
  dictionaries: dictionaryData
};
const store = mockStore(initialState);

const match = {
  params: {
    dictionaryid: dictionaryData[0].uid
  }
};

const dictionary = describe('<DictionaryViewPage />', () => {
  describe('render()', () => {
    let shallow;

    beforeEach(() => {
      shallow = createShallow({ untilSelector: 'EditIcon' });
    });

    it('renders without crashing', () => {
      const wrapper = shallow(
        <DictionaryViewPage store={store} match={match} />
      );
    });

    it('has the right child nodes', () => {
      const wrapper = shallow(
        <DictionaryViewPage store={store} match={match} />
      );
      expect(wrapper.find('header')).toHaveLength(1);
      expect(wrapper.find('section.actions')).toHaveLength(1);
      expect(wrapper.find('pure(EditIcon)')).toHaveLength(1);
      expect(wrapper.find('pure(DeleteIcon)')).toHaveLength(1);
      expect(wrapper.find('WithStyles(DictionaryRows)')).toHaveLength(1);
    });
  });

  describe('nav()', () => {
    let shallow;

    beforeEach(() => {
      shallow = createShallow({ untilSelector: 'EditIcon' });
    });

    it('has the correct action links', () => {
      const wrapper = shallow(
        <DictionaryViewPage store={store} match={match} />
      );
      const editButton = wrapper.find('WithStyles(IconButton)[aria-label="Edit"]')
      expect(editButton.props().to).toEqual(`/edit/${dictionaryData[0].uid}`);

      const deleteButton = wrapper.find('WithStyles(IconButton)[aria-label="Delete"]')
      expect(deleteButton.props().to).toEqual(`/delete/${dictionaryData[0].uid}`);
    });
  });
});
