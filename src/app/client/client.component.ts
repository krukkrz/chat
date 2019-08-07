import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  message: string
  messages: string[] = []

  constructor(
    private chatService: ChatService
  ){}
  
  sendMessage(){
    this.chatService.sendMessage(this.message)
    this.message = '';
  }
  
  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message)
    })
  }

}
