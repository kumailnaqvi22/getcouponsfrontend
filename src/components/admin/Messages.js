// Messages.js
import React, { useEffect, useState } from "react";
import fetchWithAuth from "../../utils/fetchWithAuth";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchWithAuth("/api/contact");
        const data = await response.json();
        
        // Ensure that the data is an array before setting it
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages">
      <h2>User Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
