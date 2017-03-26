import { Datastructure } from "../../Datastructure/TopperStack";
import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';

/**
 * Created by ugur on 2016-12-27.
 */
@Injectable()
export class SocketService {

    private socket;

    currentTopper: Datastructure.ITopper = {
        id: null,
        name: null,
        color: SocketService.generateHex(),
        room: null
    };

    constructor() {
        //Connects the current host
        this.socket = io();
    }

    getCurrentTopper(): Datastructure.ITopper {
        return this.currentTopper
    }

    // obsolete.
    getSocketConnection() {
        return this.socket;
    }

    public emit(eventName: string, value: any): void {
        this.socket.emit(eventName, value);
    }

    public on(eventName: string, callback: any): void {
        this.socket.on(eventName, callback);
    }

    static generateHex(): string {
        return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    }
}
