<script lang="ts">
  import { onMount } from "svelte";
  import socket from "$lib/socket.io";

  let value = "";
  let results: any[] = [];
  onMount(() => {
    import("bootstrap");
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

<div
  class="card text-center m-auto p-2 mt-3 mb-5"
  style="max-width: 512px; width: fit-content;"
>
  <div class="card-body d-flex flex-column">
    <h4 class="card-title">Welcome to SvelteKit 1122334455</h4>
    <div class="mb-3 mt-2">Hello World</div>
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Input</span>
      </div>
      <input type="text" class="form-control" bind:value />
    </div>
    <div class="mb-3">
      Value: {value}
    </div>
    <button class="btn btn-primary" on:click={sendMessage}>OK</button>
  </div>
</div>

<div class="mx-auto" style="max-width: 512px;">
  <ul class="list-group">
    {#each results as result}
      <!-- {result.no}
      {result.result} -->
      <li class="list-group-item">
        {JSON.stringify(result)}
      </li>
      <!-- <li class="flex gap-2 items-center">
        {result.no}
        {result.result}
      </li> -->
    {/each}
  </ul>
</div>
