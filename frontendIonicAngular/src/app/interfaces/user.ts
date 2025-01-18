import { DBObject } from "./db-object";

export interface User extends DBObject {
  id: string;
    role: 'USER';
    username: string;
    password?: string;
    email: string;
    fullname: string;
    organizedEventIds?: number[];
    commentIds?: number[];
};
