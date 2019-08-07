import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  rooms = []

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRooms()
  }

  private getRooms() {
    this.chatService.getRooms().subscribe(
      (data) => {
        this.rooms = data
      }, (err)=>console.error(err)
    );
    console.log('clients: ');
    console.log(this.rooms);
    
  }

}
