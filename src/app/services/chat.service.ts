import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

export class ChatService{
    private url = 'http://localhost:3000'
    private socket
    clients = []

    constructor(){
       this.socket = io(this.url) 
    }
    
    public sendMessageFromHost(message, conversation_id){
        console.log(conversation_id);        
        this.socket.emit('subscribe', conversation_id);
        this.socket.emit('new-message', {
            room: conversation_id,
            message: message
        })
    }

    public sendMessage(message){
        let conversation_id = this.socket.id;
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

    // public getMessagesForHost(conversation_id) {
    //     this.socket.emit('subscribe', conversation_id);
    //     return Observable.create((observer) => {
    //         this.socket.on('new-message', (data) => {
    //             observer.next(data);
    //         });
    //     });
    // }

    public leaveRoom(){
        this.socket.emit('disconnect');
    }

    public getRooms(){
        return Observable.create((observer) => {
            this.socket.emit('clients'); 
            this.socket.on('get-clients', (m)=>{
                observer.next(m)
            });
        })
    }
    
}