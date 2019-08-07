import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  message: string
  messages: string[] = []
  conversation_id

  constructor(
    private chatService: ChatService
  ){}
  
  sendMessage(){
    this.conversation_id = sessionStorage.getItem('ID')
    this.chatService.sendMessage(this.message, this.conversation_id)
    this.message = '';
  }
  
  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message)
    })
  }

  ngOnDestroy(){
    this.chatService.leaveRoom();
  }

}
