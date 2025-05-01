const socket = io(); // connects to the server
const usercount = document.getElementById('user-count');
// 📩 Receive and display chat messages
socket.on('chat message', (msg) => {
    const messages = document.getElementById('messages');
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    //window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user count', (count) => {
    usercount.textContent = `${count} ${count === 1 ? "user" : "users"} online`;
});

// 💬 Send chat message on form submit
const form = document.getElementById('chat-form');
const input = document.getElementById('m');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() !== '') {
        socket.emit('chat message', `${socket.id.substring(0, 4)}: ${input.value}`);
        input.value = '';
    }
});

// 🧠 Receive game state (placeholder for game logic)
socket.on('gameState', (state) => {
    // In a real game, you'd loop through players, update positions, etc.
    console.log('Game state update:', state);
});
