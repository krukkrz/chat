import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

export class ChatService{
    private url = 'http://localhost:3000'
    private socket

    constructor(){
       this.socket = io(this.url) 
    }
    
    public sendMessage(message, conversation_id){
        this.socket.emit('subscribe', conversation_id);
        this.socket.emit('new-message', {
            room: conversation_id,
            message: message
        })
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (data) => {
                observer.next(data);
            });
        });
    }
}