document.addEventListener("DOMContentLoaded", function () {
  var sendButton = document.getElementsByClassName("send-button")[0];
  var messageInput = document.getElementsByClassName("message-input")[0];
  var messageList = document.getElementsByClassName("message-list")[0];

  sendButton.addEventListener("click", function () {
    var messageText = messageInput.value.trim();

    if (messageText !== "") {
      var messageDiv = document.createElement("div");
      messageDiv.className = "message";

      var senderDiv = document.createElement("div");
      senderDiv.className = "sender";
      senderDiv.textContent = "User1:";

      var contentDiv = document.createElement("div");
      contentDiv.className = "content";
      contentDiv.textContent = messageText;

      messageDiv.appendChild(senderDiv);
      messageDiv.appendChild(contentDiv);
      messageList.appendChild(messageDiv);
      messageInput.value = "";
      messageList.scrollTop = messageList.scrollHeight;
    }

    fetch("/get_variable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    })
      .then((response) => response.json())
      .then((data) => {
        var messageDiv = document.createElement("div");
        messageDiv.className = "answer";

        var senderDiv = document.createElement("div");
        senderDiv.className = "sender";
        senderDiv.textContent = "User2:";

        var contentDiv = document.createElement("div");
        contentDiv.className = "content";
        contentDiv.textContent = data.variable;

        messageDiv.appendChild(senderDiv);
        messageDiv.appendChild(contentDiv);
        messageList.appendChild(messageDiv);
        messageInput.value = "";
        messageList.scrollTop = messageList.scrollHeight;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});