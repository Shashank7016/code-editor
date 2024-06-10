const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.clientId = uuidv4();

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const { userId, editorId, language, value } = parsedMessage;

    // Broadcast the message to all other clients except the sender
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(JSON.stringify({ userId, editorId, language, value }));
      }
    });
  });

  ws.on('close', () => {
    console.log(`Client ${ws.clientId} disconnected`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
