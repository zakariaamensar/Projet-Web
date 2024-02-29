import isLoggedIn from "./isLoggedIn";
// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// socketIO

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  isLoggedIn();
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
    //
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("http://localhost:3000/getUser", {
        withCredentials: true,
      });
      if (response.data) {
        setCurrentUser(response.data);
        socket?.emit("addUser", response.data._id);
        socket?.on("getUsers", (users) => {
          setUsers(users);
          console.log(users);
        });
      }
    };
    getUser();

    //
  }, [socket]);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket?.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket?.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });
  }, [socket]);

  const sendMessage = () => {
    if (inputMessage !== "") {
      socket?.emit("message", inputMessage);
      setInputMessage("");
    }
  };

  const pushNotification = () => {
    const otherUsers = users.filter((user) => user.userId !== currentUser._id);
    console.log(otherUsers);
    socket?.emit("notification", otherUsers);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <ol>
        {messages.map((message, index) => (
          <li key={index} style={{ margin: "0.5rem" }}>
            {message}
          </li>
        ))}
      </ol>
      <div style={{ display: "flex", width: "30vw", margin: "1rem 0" }}>
        <input
          type="text"
          className="form-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
      <button className="btn" onClick={pushNotification}>
        Push Notification
      </button>

      <ol>
        {notifications.map((notification, index) => (
          <li key={index} style={{ margin: "0.5rem" }}>
            {notification}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MainPage;
