import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';

import {UserInfoService} from "../userinfo.service";
import {Router} from "@angular/router";
import {Datastructure} from "../../../Datastructure/TopperStack";
import {Chat} from "../../../Datastructure/Message";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild('chatwindow') private myScrollContainer: ElementRef;


    private _prevChatHeight: number = 0;
    userInfoService: UserInfoService;
    currentTopper: Datastructure.ITopper;
    messages: Chat.Message[];

    constructor(userInfoService: UserInfoService, private router: Router) {
        this.userInfoService = userInfoService;
        this.currentTopper = this.userInfoService.getCurrentTopper();
        this.messages = [];
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    ngOnInit() {
        this.userInfoService.getSocketConnection().on('message', (data) => {
            this.messages.push(data);
        });

    }

    sendMessage(event) {
        let message: Chat.Message = {
            message: event.target.value,
            sender: this.currentTopper.name,
            room: this.currentTopper.room,
            date: null
        };
        console.log(this.userInfoService);

        this.userInfoService.getSocketConnection().emit('message', message);
        event.target.value = '';
    }

    scrollToBottom(): void {
        if(this._canScroll()) {
            try {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 30;
            } catch (err) {
            }
        }
    }

    //http://stackoverflow.com/a/35493028/3399234
    private _canScroll(): boolean {
        /* compares prev and current scrollHeight */
        let can = (this._prevChatHeight !== this.myScrollContainer.nativeElement.scrollHeight);
        this._prevChatHeight = this.myScrollContainer.nativeElement.scrollHeight;
        return can;
    }
}
