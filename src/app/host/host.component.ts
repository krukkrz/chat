import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  rooms = [];
  message: string;
  messages: string[] = []
  messagesPerRoom: any[] = []

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRooms()
  }
  
  private getRooms() {
    this.chatService.getRooms().subscribe(
      (data) => {
        data.forEach(d => {
          this.rooms.push(d)
        });
        this.assignMessagesToRoom()
      }, (err)=>console.error(err)
      );
      console.log('clients: ', this.rooms);          
    }
    
    public sendMessage(conversation_id){
    this.chatService.sendMessageFromHost(this.message, conversation_id)
    this.message = '';
  }

  private getMessages(conversation_id){
    let messages: string[] = []
    this.chatService
    .getMessagesForHost(conversation_id)
    .subscribe((message: string) => {
      messages.push(message)
      console.log('id: ', conversation_id);
      console.log('message: ', message);      
    })    
    return messages
  }
  
  private assignMessagesToRoom(){
    
    this.rooms.forEach(room =>{
      let messages = this.getMessages(room)
      let msgPerRoom = {
        room: room,
        messages: messages
      }
      this.messagesPerRoom.push(msgPerRoom)
    })
    console.log(this.messagesPerRoom);

  }

  
}
