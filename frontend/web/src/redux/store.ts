import {
    ActionTypes,
    SET_GENRE,
    SET_TITLE,
    SET_YEAR
} from "./actions";
import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

export interface Store {
    title: string;
    genre: string;
    year: string;
}


// Redux implementation
function storeReducer(state: Store = {
    title: "",
    genre: "",
    year: "0",
}, action: any) {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload
            };
        case "SET_GENRE":
            return {
                ...state,
                genre: action.payload
            };
        case "SET_YEAR":
            return {
                ...state,
                year: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(storeReducer,applyMiddleware(thunk));

export default store;