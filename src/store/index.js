import { createStore } from 'redux';
import minReducers from '../modules/user-management/reducers';

const store = createStore(minReducers);

export default store;
