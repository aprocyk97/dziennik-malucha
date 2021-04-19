import { ISingleFeed } from '../../entities/feed'

export const GET_FEEDS = 'GET_FEEDS';

export interface IKindergardenTypes {
    GET_FEEDS: {
        feedList: ISingleFeed[];
    }
}