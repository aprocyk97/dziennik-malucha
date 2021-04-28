import { ISingleFeed } from '../entities/feed';
import * as actionTypes from '../action/actionTypes/kindergardenTypes';

export interface IKindergardenReducers {
    feedList: ISingleFeed[];
}

const defaultState = (): IKindergardenReducers => ({
    feedList: [],
    
});

export default (state = defaultState(), action: any) => {

    switch(action.type) {

        case actionTypes.GET_FEEDS: {
            const payload: actionTypes.IKindergardenTypes['GET_FEEDS'] = action;
            return {
                ...state,
                feedList: payload.feedList
            }
        }

        default: {
            return state;
        }
    }
}