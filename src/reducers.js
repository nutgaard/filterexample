import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import localStorageHOC from './reducers/localStorage';
import filterReducer from './reducers/filter';

export default combineReducers({
    form: formReducer,
    filter: localStorageHOC('filter', filterReducer)
});