// script.js
const listenButton = document.getElementById("listenButton");
const sendButton = document.getElementById("sendButton");
const portInput = document.getElementById("portInput");
const messageInput = document.getElementById("messageInput");
const chatContainer = document.getElementById("chatContainer");
const urlInput = document.getElementById("url_input");
const successAlert = document.querySelector(".success-alert");
var socket;

const handleListen = async () => {
  if (urlInput.value == "") {
    alert("please enter url");
    return false;
  }

  const port = portInput.value;
  socket = io(`${urlInput.value}:${port}`);
  socket.on("toReciever", (message) => {
    const newDiv = document.createElement("div");
    newDiv.id = "myNewDiv"; // Set an ID (optional)
    newDiv.classList.add("chat-message"); // Add a CSS class (optional)
    newDiv.textContent = `${message}`; // Set the content (optional)
    chatContainer.appendChild(newDiv);
  });
  socket.on("connectedToA", (data) => {
    if (data === "true") {
      alert("u r connect to work station A");
    }
  });
};
listenButton.addEventListener("click", handleListen);

const handleSend = () => {
  // messageInput
  socket.emit("senderMessage", messageInput.value);
  socket.on("toSender", (message) => {
    const newDiv = document.createElement("div");
    newDiv.id = "myNewDiv"; // Set an ID (optional)
    newDiv.classList.add("chat-message"); // Add a CSS class (optional)
    newDiv.textContent = `${message}`; // Set the content (optional)
    chatContainer.appendChild(newDiv);
  });
  socket.on("toReciever", (message) => {
    const newDiv = document.createElement("div");
    newDiv.id = "myNewDiv"; // Set an ID (optional)
    newDiv.classList.add("chat-message"); // Add a CSS class (optional)
    newDiv.textContent = `${message}`; // Set the content (optional)
    chatContainer.appendChild(newDiv);
  });


};
sendButton.addEventListener("click", handleSend);
