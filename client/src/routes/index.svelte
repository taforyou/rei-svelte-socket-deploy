<script lang="ts">
  import { onMount } from "svelte";
  import socket from "$lib/socket.io";

  let value = "";
  let results: any[] = [];
  onMount(() => {
    socket.connect();
    // connect เป็น Methode มาตราฐาน เอา socket id มาได้เลย
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receive_message", (data) => {
      console.log("1=>", data);
      console.log("receive_message 112233");
    });

    // รับจาก io.emit จาก server ที่ส่งหาทุกคน
    socket.onAny((event, args) => {
      if (event === "result") {
        results = args; // รับมาตรงๆ เลยไม่ได้เหรอ ?
      }
    });
  });

  // ส่งไป
  function sendMessage() {
    socket.emit("play", value);
  }
</script>

<h1>Welcome to SvelteKit 1122334455</h1>

<pre>
  Hello World
  <input type="text" class="input input-bordered" bind:value />
  Value: {value}
  <button class="border btn" on:click={sendMessage}>OK</button>
  
  <ul>
    {#each results as result}
      <!-- {result.no}
      {result.result} -->
      {JSON.stringify(
        result
      )}
      <!-- <li class="flex gap-2 items-center">
        {result.no}
        {result.result}
      </li> -->
    {/each}
  </ul>
</pre>
