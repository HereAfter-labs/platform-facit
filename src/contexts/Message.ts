import { IUserProps } from "./UserData";

export class Message{
    id: number;
    message: string;
    senderid: number;

    constructor(id: number, message: string, sid: number) {
        this.id = id;
        this.message = message;        
        this.senderid = sid;
    }
}