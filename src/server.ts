import { WebSocketServer, WebSocket } from 'ws';

// Crear un servidor WebSocket
const wss = new WebSocketServer({ port: 8080 });

// Función para enviar un mensaje a todos los clientes conectados
function broadcast(data: string) {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

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

// Enviar una notificación a todos los clientes cada 1 minuto (60000 ms)
setInterval(() => {
  const notificationMessage = 'Notificación desde el servidor: ' + new Date().toLocaleTimeString();
  console.log('Enviando notificación a los clientes:', notificationMessage);
  broadcast(notificationMessage);
}, 60000);

console.log('Servidor WebSocket funcionando en ws://localhost:8080');
