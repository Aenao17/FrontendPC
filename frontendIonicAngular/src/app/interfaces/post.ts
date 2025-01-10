import { DBObject } from "./db-object";

export interface Post extends DBObject {
    name: string;
    description: string;
    image: string;
    eventId?: number;
    comments?: Comment[];
};
