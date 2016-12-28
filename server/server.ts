import {Datastructure} from "../Datastructure/TopperStack";
/**
 * Created by ugur on 2016-12-26.
 */

let http_server = require('http').createServer().listen(3000, '0.0.0.0');
let io = require('socket.io').listen(http_server);

let topperStack = new Datastructure.TopperStack([]);

io.on('connection', function(client){

    //Send current user list to current user only
    client.emit('update_toppers', topperStack);

    client.on('addUser', function(data: Datastructure.ITopper){
        data.id = client.id;
        let register_result = topperStack.push(data);
        //User does not exist in the current list
        if(register_result === -1) {
            client.emit('update_me', data);
            io.emit('update_toppers', topperStack);
        } else {
            client.emit('register_failed', data);
        }
    });

    client.on('top_me', function(data: Datastructure.ITopper){
        topperStack.topThat(data);
        io.emit('update_toppers', topperStack);
    });

    // client.on('disconnect', function(data: Datastructure.ITopper){
    //     console.log("disconnected");
    //     console.log(data);
    //     topperStack.remove(data);
    //     io.emit('update_toppers', topperStack);
    // });
});

