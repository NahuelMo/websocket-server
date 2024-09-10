import { WebSocketServer, WebSocket } from 'ws';

// Crear un servidor WebSocket
const wss = new WebSocketServer({ port: 8080 });

// Escuchar las conexiones entrantes
wss.on('connection', (ws: WebSocket) => {
  console.log('Cliente conectado');

  // Enviar un mensaje cuando se conecte un cliente
  ws.send('Bienvenido, cliente');

  // Escuchar mensajes del cliente
  ws.on('message', (message: string) => {
    console.log('Mensaje recibido del cliente:', message);

    // Responder al cliente
    ws.send(`Mensaje recibido: ${message}`);
  });

  // Manejar el cierre de la conexión
  ws.on('close', () => {
    console.log('Conexión cerrada');
  });
});

console.log('Servidor WebSocket funcionando en ws://localhost:8080');
