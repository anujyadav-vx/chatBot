import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        {
          message: input,
        }
      );

      const aiMessage = {
        role: "assistant",
        content: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setInput("");
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Chatbot</h1>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
            }}
          >
            <strong>
              {msg.role === "user" ? "You" : "AI"}:
            </strong>

            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
        }}
      />

      <button
      disabled={loading}
        onClick={sendMessage}
        style={{
          padding: "10px",
          marginLeft: "10px",
        }}
      >
        {loading ? "Thinking..." : ""}
        Send
      </button>
    </div>
  );
}

export default App;