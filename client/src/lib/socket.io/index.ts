import io from "socket.io-client";
import { config } from "./store.js";

const url = config.url;

const socket = io(url, {
  autoConnect: false,
  reconnection: true
});

export default socket;
