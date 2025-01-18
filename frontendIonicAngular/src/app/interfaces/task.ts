import { User } from "./user";

export interface TaskInterface {
    name: string,
    description: string, 
    status: string, 
    date: Date,
    event: Event,
    users: User
}
