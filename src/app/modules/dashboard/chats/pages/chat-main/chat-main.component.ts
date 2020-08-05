import {Component, OnInit} from '@angular/core';
import {ChatService} from '@@core/services/chat.service';
import {AuthService} from 'app/@auth/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
})
export class ChatMainComponent implements OnInit {
  AllMsgs;
  chatData;
  myImage;
  otherImage;
  myName;
  otherName;
  requestId;
  myId;
  chatForm: FormGroup;
  // messagesList: any;
  // usersList: any;
  // agent: {
  //   _id: any,
  //   name: string,
  // };
  // chatMessage: any;
  // selectedUser: any;

  constructor(
    private chatService: ChatService,
    private actRoute: ActivatedRoute
  ) {
    // this.chatService.getMessagesList().subscribe(messagesList => {
    //   this.messagesList = messagesList;
    //   this.usersList = Object.keys(this.messagesList).map(val => {
    //     return val;
    //   });
    // });
  }

  //
  // postMessage() {
  //   const user = {
  //     id: this.agent._id,
  //     name: this.agent.name
  //   };
  //   this.chatService.SendMessage(user, this.chatMessage, this.selectedUser);
  // }
  //
  // endConversation() {
  //   this.chatService.endConversation(this.selectedUser);
  // }

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.chatData = res.item;
      this.myId = res.item.auth_id;
    });
    this.createChatData(this.chatData);
    this.chatForm = new FormGroup({
      msgContent: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
    });
  }

  createChatData(data: object) {
    if (this.myId === data['user_1']) {
      this.myImage = data['user1_image'];
      this.myName = data['user1_name'];
      this.otherImage = data['user2_image'];
      this.otherName = data['user2_name'];
    } else {
      this.myImage = data['user2_image'];
      this.myName = data['user2_name'];
      this.otherImage = data['user1_image'];
      this.otherName = data['user1_name'];
    }
    this.AllMsgs = data['AllMessages'];
    this.requestId = data['request_id'];
  }

  onSubmit() {
    let otherId = 0;
    if (this.myId === this.chatData.user_2) {
      otherId = this.chatData.user_1;
    } else {
      otherId = this.chatData.user_2;
    }

    const data = {
      body: this.chatForm.get('msgContent').value,
      chat_id: this.chatData.id,
      sender_id: this.myId,
      receiver_id: otherId,
    };
    this.chatService.sendMessage(data).subscribe((res) => {
      location.reload();
    });
  }


}// end oF ClASS
