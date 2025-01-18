import { DBObject } from "./db-object";

export interface User extends DBObject {
  id: string;
    role: string;
    username: string;
    password?: string;
    email: string;
    fullname: string;
    organizedEventIds?: number[];
    commentIds?: number[];
};
