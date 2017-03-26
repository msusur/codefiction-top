import { Component, OnInit } from '@angular/core';
import { Datastructure } from '../../../Datastructure/TopperStack';
import { SocketService } from "../socket.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './top-main.component.html',
    styleUrls: ['./top-main.component.css']
})
export class TopMainComponent implements OnInit {
    socketService: SocketService;
    currentTopper: Datastructure.ITopper;
    topperList: Datastructure.TopperStack = new Datastructure.TopperStack([]);
    socket;

    constructor(socketService: SocketService, private router: Router) {
        this.socketService = socketService;
        this.currentTopper = this.socketService.getCurrentTopper();
        if (this.currentTopper.name === null) {
            this.router.navigate(['/register'], {});
        }
    }

    ngOnInit() {
        this.socketService.getSocketConnection().on('update_toppers', (data) => {
            this.topperList.setList(data.toppers);
        });
    }

    topMe() {
        this.socketService.getSocketConnection().emit('top_me', this.currentTopper);
    }
}
