// script.js
const listenButton = document.getElementById("listenButton");
const sendButton = document.getElementById("sendButton");
const portInput = document.getElementById("portInput");
const messageInput = document.getElementById("messageInput");
const chatContainer = document.getElementById("chatContainer");
const urlInput = document.getElementById("url_input");
const successAlert = document.querySelector(".success-alert");
var socket
const handleListen =  async () => {
    const port = portInput.value;
      socket = io.connect(`http://localhost:${port}`);
      socket.on("toReciever", (message) => {
        const newDiv = document.createElement("div");
        newDiv.id = "myNewDiv"; // Set an ID (optional)
        newDiv.classList.add("chat-message"); // Add a CSS class (optional)
        newDiv.textContent = `${message}`; // Set the content (optional)
        chatContainer.appendChild(newDiv);
      });

    try {
        const response = await fetch('/listen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ port }), // Send the port number as JSON
        });

        if (response.ok) {
            const data = await response.json();
            const existingSpan = successAlert.querySelector('span');
        if (existingSpan) {
            successAlert.removeChild(existingSpan);
        }
            // Create a new span element
    const spanElement = document.createElement('span');
    spanElement.textContent = `work station A listening to Port : ${data.port}` ; // Set the content of the span
    // Append the span to the existing div
    successAlert.appendChild(spanElement);

            // current
            
            

        } else {
            console.error('Error connecting to server');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


listenButton.addEventListener('click',handleListen);


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
  


