const socket = io(); // establish socket connection

let username = ""; // initialize username variable

// handle join button click event
document.getElementById("join-btn").addEventListener("click", (event) => {
  event.preventDefault();

  username = document.getElementById("username-input").value; // get username from input field
  if (username.trim() != "") { // check if username is not empty
    document.querySelector(".form-username").style.display = "none"; // hide the username input form
    document.querySelector(".chatroom-container").style.display = "block"; // show the chatroom container
    document.querySelector(".chatroom-header").innerText = `Chatroom - ${username}`; // set chatroom header with the entered username

    socket.emit("username enter", username); // emit username enter event to server
  } else {
    alert("Username cannot be empty"); // show alert if username is empty
  }
});

// handle send button click event
document.getElementById("send-btn").addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    username: username,
    message: document.getElementById("message-input").value,
  };
  socket.emit("message", data); // emit message event to server
  addMessage(data, true); // add message to chatroom UI
});

// handle username enter event received from server
socket.on("username enter", (data) => {
  if (data !== username) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data} has enterred!`;
    msgDiv.style.color ="green"
    msgDiv.style.fontWeight ="bold"

    document.querySelector("#messages-container").appendChild(msgDiv); // add message to chatroom UI
  }
});

// handle message event received from server
socket.on("message", (data) => {
  if (data.username !== username) {
    addMessage(data, false); // add message to chatroom UI
  }
});

// function to add message to chatroom UI
function addMessage(data, flag) {
  var msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (flag) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message received");
  }

  document.querySelector("#messages-container").appendChild(msgDiv); // add message to chatroom UI
}

// handle exit button click event
document.getElementById("exit-btn").addEventListener("click", () => {
  socket.emit("username left", username); // emit username left event to server
});

// handle username left event received from server
socket.on("username left", (data) => {
  if (data !== username) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data} has left!`;
    msgDiv.style.color ="red"
    msgDiv.style.fontWeight ="bold"
    document.querySelector("#messages-container").appendChild(msgDiv); // add message to chatroom UI
  }
});
