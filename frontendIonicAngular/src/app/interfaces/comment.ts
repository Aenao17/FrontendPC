import { DBObject } from "./db-object";
import { Post } from "./post";
import { User } from "./user";

export interface Comment extends DBObject {
    message: string;
    user: Partial<User>;
    post: Partial<Post>;
};