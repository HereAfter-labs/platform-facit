import { IUserProps } from './UserData';
import { Message } from './Message';

export interface IConversation {
    id: number;
    name: string;
    messages: Message[];
    users: IUserProps[];
}
export class ChannelConversation implements IConversation {
    id: number;
    name: string;
    messages: Message[];
    users: IUserProps[];

    constructor(id: number, name: string,  messages: Message[], users: IUserProps[]) {
        this.id = id;
        this.name = name;
        this.messages = messages;
        this.users = users;
    }
}

export class MultiUserConversation implements IConversation  {
    id: number;
    name: string;
    users: IUserProps[];
    messages: Message[];

    constructor(id: number, messages: Message[], users: IUserProps[]) {
        this.id = id;
        this.name = users.map((u) => u.name).join(', ');
        this.messages = messages;
        this.users = users;
    }
}