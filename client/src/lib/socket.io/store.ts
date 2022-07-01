import { writable } from "svelte/store";

export const config = {
  url: "http://localhost:8080"
};

// Rerferences to HTML elements
export const elements = {
  input: null,
  messages: null
};

const { subscribe, set, update } = writable({
  username: "Guest-" + Math.floor(100000 + Math.random() * 900000),
  connecting: true,
  connected: false,
  userlist: [],
  messages: [],
  status: "",
  clicks: 0
});

export const state = {
  subscribe,
  set,
  update,

  setConnected(connected: boolean) {
    if (connected) {
      update((data) => ({
        ...data,
        connected,
        connecting: false,
        status: `Connected to ${config.url} as ${data.username}`
      }));
    } else {
      update((data) => ({
        ...data,
        connected,
        status: `Not connected.`
      }));
    }
  }
};
