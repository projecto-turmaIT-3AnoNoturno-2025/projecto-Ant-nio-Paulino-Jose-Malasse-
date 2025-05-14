const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the chat.html file
app.use(express.static(path.join(__dirname, 'public')));

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  // Broadcast incoming messages to all connected clients
  ws.on('message', (message) => {
    const mensagem = message.toString('utf8'); // Convert buffer to string
    console.log('Mensagem recebida:', mensagem);

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(mensagem);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('Erro no WebSocket:', error);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});