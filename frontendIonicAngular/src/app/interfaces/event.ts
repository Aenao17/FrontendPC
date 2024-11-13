import { DBObject } from "./db-object";
import { Post } from "./post";
import { User } from "./user";

export interface Event extends DBObject {
    name: string;
    description: string;
    date: Date;
    participantCount: number;
    location: string;
    image: string;
    organizerId?: number;
    organizer?: User;
    postIds?: number[];
    posts?: Post[];
};