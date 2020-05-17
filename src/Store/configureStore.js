import { createStore, combineReducers } from 'redux';
import toggleLogState from './Reducers/logStateReducer';
import toggleFollowed from './Reducers/followedReducer';

const combinedReducers = combineReducers({
    logState: toggleLogState,
    followed: toggleFollowed
});

export default createStore(combinedReducers);

/*export default createStore(toggleLogState);*/