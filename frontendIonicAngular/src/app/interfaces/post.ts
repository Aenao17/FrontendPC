import { DBObject } from "./db-object";

export interface Post extends DBObject {
    name: string;
    description: string;
    image: string;
    eventId?: number;
    event?: Event;
    commentIds?: number[];
    comments?: Comment[];
};