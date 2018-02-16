import { createStore } from 'redux';
import setupReducer  from './app/reducers/setup';

const store = createStore(setupReducer);

export default store;