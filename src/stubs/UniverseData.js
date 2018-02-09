import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// Actions.
export const setDistance = distance => {
    type: 'SET_DISTANCE',
    distance
}

// Reducers.
const distanceReducer = (state = {}, action) => {
    // This one doesn't do much. But it shows the flow.
    return state;
}

// If you need more than one reducer to register, use this helper.
const reducers = combineReducers({
    distanceReducer
});

// Finally, create the initial store.
export const UniverseStore = createStore(reducers);
