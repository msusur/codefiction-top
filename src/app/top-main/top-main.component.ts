import {Component, OnInit} from '@angular/core';
import { Datastructure } from '../../../Datastructure/TopperStack';
import {UserInfoService} from "../userinfo.service";
import {Router} from "@angular/router";

@Component({
  //  selector: 'app-top-main',
    templateUrl: './top-main.component.html',
    styleUrls: ['./top-main.component.css']
})
export class TopMainComponent implements OnInit {

    userInfoService: UserInfoService;
    currentTopper: Datastructure.ITopper;
    topperList: Datastructure.TopperStack = new Datastructure.TopperStack([]);
    socket;


    constructor(userInfoService: UserInfoService, private router: Router){
        this.userInfoService = userInfoService;
        this.currentTopper = this.userInfoService.getCurrentTopper();
        if(this.currentTopper.name === null) {
            this.router.navigate(['/register'], {});
        }
    }

    ngOnInit() {

        this.userInfoService.getSocketConnection().on('update_toppers', (data) => {
            this.topperList.setList(data.toppers);
        });

    }

    onTopMe() {
        this.userInfoService.getSocketConnection().emit('top_me', this.currentTopper);
    }

    ngOnDestroy() {

    }
}
