import { WebSocket } from "ws";

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
        ws.send(`Received message => ${message}`);
    });

    setInterval(() => {
        ws.send("New data from text generator");
    }, 100);
});
