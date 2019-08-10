import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  rooms: string[] = [];
  message: string;
  messages: any[] = []
  messagesByRoom: any[] = []


  constructor(
    private chatService: ChatService
  ) {
    this.getRooms()
  }

  private getRooms() {
    this.chatService.getRooms().subscribe(
      (data) => {
        data.forEach(d => {
          this.rooms.push(d)
          this.chatService.subscribeHost(d)
        });
        this.getRoomsWithEmptyMessages()        
      }, (err)=>console.error(err)
    );
  }


  ngOnInit() {
    this.getMessages()
    console.log('messages', this.messages);      
  }
    
  sendMessage(conversation_id){
    this.chatService.sendMessageFromHost(this.message, conversation_id)
    this.message = '';
  }

  private getRoomsWithEmptyMessages(){
    this.rooms.forEach( r => {
      this.messagesByRoom.push({
        room: r,
        messages: []
      })
    })
  }
    
  private getMessages(){
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message)
      console.log('host component getMessages() message', message);      
      this.messagesByRoom = []
      console.log(this.rooms.length);
      
      this.rooms.forEach(r => {
        this.groupMessagesByRoom(r)
      })
    })
    console.log('messages by room', this.messagesByRoom);          
  }

  private groupMessagesByRoom(room){
    let messages: string[] = []
    this.messages.forEach(m => {
      if(m.room == room){
        messages.push(m.message)
      }
    })
    this.messagesByRoom.push({
      room: room,
      messages: messages
    })
  }
}
