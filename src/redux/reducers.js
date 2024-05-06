import { combineReducers } from '@reduxjs/toolkit';

const placeholderReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    placeholder: placeholderReducer,
});

export default rootReducer;
