import { Component, OnInit } from '@angular/core';
import { SocketService } from "../socket.service";
import { Datastructure } from "../../../Datastructure/TopperStack";
import { Router } from "@angular/router";

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

    currentTopper: Datastructure.ITopper;
    usernameInvalid: boolean = false;
    onlineCount: number = 0;

    constructor(private socketService: SocketService, private router: Router) {
        this.router = router;
        this.socketService = socketService;
        this.currentTopper = this.socketService.getCurrentTopper();
    }

    public addUser(): void {
        this.socketService.emit('addUser', this.currentTopper);
    }

    public ngOnInit(): void {
        this.registerUpdateToppers();

        this.registerUpdateMe();

        this.registerRegisterFailed();
    }

    private registerRegisterFailed() {
        this.socketService.on('register_failed', (data): void => {
            this.currentTopper.id = data.id;
            this.usernameInvalid = true;
        });
    }

    private registerUpdateMe() {
        this.socketService.on('update_me', (data): void => {
            this.currentTopper.id = data.id;
            this.router.navigate(['/topper'], {});
        });
    }

    private registerUpdateToppers() {
        this.socketService.on('update_toppers', (totalTopppers): void => {
            this.onlineCount = totalTopppers;
        });
    }
}
