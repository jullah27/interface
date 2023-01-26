const socket = new WebSocket('wss://jason27.uber.space/interface/receiver');
//const socket = new WebSocket('ws://localhost:8000/receiver');

const meanDot = document.querySelector('.dot.mean');

// listen to connection open
socket.addEventListener('open', (event) => {
  setInterval(() => {
    if (socket.readyState == socket.OPEN) {
      socket.send('');
    }
  }, 30000);
});

// listen to message from server
socket.addEventListener('message', (event) => {
  const mean = JSON.parse(event.data);
  window.max.outlet('mean', mean[0], mean[1]);
});
