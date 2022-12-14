import { IUserProps } from './UserData';
import { Message } from './Message';
import internal from 'stream';

export interface IConversation {
    id: number;
    name: string;
    groupid: number;
    messages: Message[];
    users: IUserProps[];
}
export class MultiUserConversation implements IConversation {
    id: number;
    name: string;
    messages: Message[];
    users: IUserProps[];
    groupid: number;

    constructor(id: number, name: string,  groupid: number,  messages: Message[], users: IUserProps[]) {
        this.id = id;
        this.name = name;
        this.groupid = groupid
        this.messages = messages;
        this.users = users;
    }
}
