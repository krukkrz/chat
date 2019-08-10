import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  message: string
  messages: any[] = []
  conversation_id

  constructor(
    private chatService: ChatService
  ){}
  
  sendMessage(){
    this.chatService.sendMessage(this.message)
    this.message = '';
  }
  
  ngOnInit() {
    this.getMessages();
  }

  private getMessages() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        // adds new message at the beginning
        this.messages = [message].concat(this.messages);
        console.log(this.messages);
      });
  }

  ngOnDestroy(){
    this.chatService.leaveRoom();
  }

}
