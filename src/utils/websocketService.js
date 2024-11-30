// websocketService.js
import io from "socket.io-client";

const SOCKET_URL = "ws://localhost:5000"; // Replace with your server's WebSocket URL

class WebSocketService {
  socket;
   
  connect() {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    // Listening for incoming messages
    this.socket.on("message", (message) => {
      console.log("Received message:", message);
    });
  }

  sendMessage(senderId, recipientId, message) {
    if (this.socket) {
      this.socket.emit("message", { senderId, recipientId, message });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const websocketService = new WebSocketService();
export default websocketService;
