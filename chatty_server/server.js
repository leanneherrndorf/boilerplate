const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');
const WebSocket = require('ws');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let clientcount = {
  count: wss.clients.size,
  type: "clientCount"
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
  wss.on('connection', (ws) => {
    console.log('Client connected');
    clientcount.count = wss.clients.size;
    wss.broadcast(JSON.stringify(clientcount));

    ws.on('message', (data) => {
      const message = JSON.parse(data);
      let uuid = uuidV1();
      console.log("data", data);
      switch(message.type){
        case "postMessage":
        const outputMessage = {
          type: "incomingMessage",
          id: uuid,
          username: message.username,
          content: message.content,
          usercolour: message.usercolour
        }
        console.log("outputmessage", outputMessage);
        wss.broadcast(JSON.stringify(outputMessage));
        break;
        case "postNotification":
        const newUser = {
          type: "incomingNotification",
          id: uuid,
          notification: message.notification
        }
        wss.broadcast(JSON.stringify(newUser));
        break;
        default:
          throw new Error("Unknown event type " + message.type);
        }
      });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    clientcount.count = wss.clients.size;
    wss.broadcast(JSON.stringify(clientcount));
  });

});