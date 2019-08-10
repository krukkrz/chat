import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  rooms: any[] = [];
  message: string;
  messages: any[] = []
  messagesByRoom: any[] = []


  constructor(
    private chatService: ChatService
  ) {
    this.getRooms()
  }
  
  ngOnInit() {
    this.getMessages()
    console.log('messages', this.messages);      
  }
  
  private getRooms() {
    this.chatService.getRooms().subscribe(
      (data) => {
        data.forEach(d => {
          this.rooms.push(d)
        });
      }, (err)=>console.error(err)
      );
      console.log('clients', this.rooms);
    }
    
    sendMessage(conversation_id){
      this.chatService.sendMessageFromHost(this.message, conversation_id)
      this.message = '';
    }
    
    private getMessages(){
      this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log('message', message);      
        this.messages.push(message)
      })
      console.log('rooms', this.rooms);    
      
      this.messagesByRoom = []
      this.rooms.forEach(r => {
        console.log('room', r);     
        this.groupMessagesByRoom(r)
      })
      console.log('messages by room', this.messagesByRoom);      
  }

  private groupMessagesByRoom(room){
    console.log('hi');
    
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
    console.log(this.messagesByRoom);

  }

  
}
