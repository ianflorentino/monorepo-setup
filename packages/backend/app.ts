import feathers from "@feathersjs/feathers";
import "@feathersjs/transport-commons";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";

const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Express middleware to to host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());

// Express middleware with a nicer error handler
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on("connection", (connection) => app.channel("everybody").join(connection));
// Publish all events to the `everybody` channel
app.publish((data) => app.channel("everybody"));

// Start the server
app
  .listen(3030)
  .on("listening", () =>
    console.log("Feathers server listening on localhost:3030")
  );
