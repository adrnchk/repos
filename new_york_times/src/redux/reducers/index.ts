import {combineReducers} from 'redux'
import userInfo from './userInfo'
import articles from './articles'
export const rootReducer = combineReducers(
    {
        userInfo,
        articles,
    } 
);