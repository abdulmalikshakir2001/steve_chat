document.addEventListener("DOMContentLoaded", (event) => {
    let socket;
    localStorage.setItem("socket_conn_status", "false");
    const connect_button = document.querySelector("#connection_button");
    const dis_connection_button = document.querySelector(
        "#dis_connection_button"
    );
    const chatContainer = document.getElementById("chatContainer");
    const input = document.getElementById("messageInput");

    const handleResponseChat = (data) => {
        const newChat = document.createElement("div");
        newChat.classList.add("chat");
        newChat.textContent = data.chatMessage;
        chatContainer.appendChild(newChat);

        // Scroll chat container to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
        input.value=""
    };

    // send button click handler
    function handleSendButtonClick(e) {
        
        if (input.value.trim() === "") {
            alert("Type a message to get response from the socket server");
            return false;
        }
        const status = connect_button.getAttribute("data-status");
        if (localStorage.getItem("socket_conn_status") == "false") {
            alert("Please click the connect button to get response");
            return false;
        }

        // send chat message
        var inputField = document.getElementById("messageInput");
        var inputValue = inputField.value;
        socket.emit("chat", { chatMessage: inputValue });
    }

    document.getElementById("sendButton").addEventListener("click", handleSendButtonClick);

    // socket server start ----------------------------
    connect_button.addEventListener("click", () => {
        localStorage.setItem("socket_conn_status", "true");

        socket = io("http://localhost:8001");
        socket.on("connected", (data) => {
            dis_connection_button.classList.remove("hide");
            connect_button.classList.add("hide");
            alert("You are connected to the socket successfully");
        });

        dis_connection_button.addEventListener("click", () => {
            socket.emit("end", "disconnect the user");
            localStorage.setItem("socket_conn_status", "false");
            dis_connection_button.classList.add("hide");
            connect_button.classList.remove("hide");
            alert("You are disconnected from the socket server");
        });

        // Listen for response chat messages
        socket.on("responseChat", handleResponseChat);
    });
    //------------------------------- socket server end
});
