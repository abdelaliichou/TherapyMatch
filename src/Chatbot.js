import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";  // Import the CSS file

function ChatBot() {
    const [messages, setMessages] = useState([
        { 
          id: 1, 
          content: "Bonjour, je suis là pour vous écouter et vous aider. Pouvez-vous me parler de ce qui vous préoccupe aujourd'hui ?", 
          sender: "bot" 
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [conversationStage, setConversationStage] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== "") {
            const newMessage = {
                id: messages.length + 1,
                content: inputMessage,
                sender: "user",
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");

            setTimeout(() => {
                let botResponse;
                if (conversationStage === 0) {
                    botResponse = {
                        id: messages.length + 2,
                        content: "Je vous remercie de partager cela avec moi. Je peux comprendre que cette situation soit difficile pour vous. Si j'ai bien compris, vous ressentez [résumé des symptômes mentionnés]. Est-ce que cela reflète bien ce que vous vivez ? Pouvez-vous me dire comment cela affecte votre quotidien ?",
                        sender: "bot",
                    };
                    setConversationStage(1);
                } else if (conversationStage === 1) {
                    botResponse = {
                        id: messages.length + 2,
                        content: "Je vous remercie pour ces précisions. Je peux imaginer à quel point cela peut être éprouvant. Basé sur ce que vous m'avez décrit, une approche de thérapie cognitive-comportementale pourrait être bénéfique. Elle pourrait vous aider à gérer [symptômes spécifiques mentionnés]. Qu'en pensez-vous ?",
                        sender: "bot",
                    };
                    setConversationStage(2);
                } else {
                    botResponse = {
                        id: messages.length + 2,
                        content: "Je comprends votre point de vue. Chaque personne est unique, et il est important de trouver l'approche qui vous convient le mieux. Souhaiteriez-vous que je vous mette en relation avec un thérapeute spécialisé qui pourrait vous guider davantage dans ce processus ?",
                        sender: "bot",
                    };
                }
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            }, 1000);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-messages">
                <div className="chatbot-message-area">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chatbot-message ${message.sender}`}
                        >
                            {message.sender === "bot" && (
                                <div className="chatbot-avatar">
                                    <img 
                                        src="/placeholder.svg?height=32&width=32" 
                                        alt="Bot"
                                        className="chatbot-avatar-image"
                                    />
                                    <div className="chatbot-avatar-fallback">AT</div>
                                </div>
                            )}
                            <div className={`chatbot-message-content ${message.sender}`}>
                                {message.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="chatbot-input-area">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="chatbot-input-form"
                >
                    <input
                        id="message"
                        placeholder="Tapez votre message ici..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="chatbot-input"
                    />
                    <button 
                        type="submit"
                        className="chatbot-send-button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Envoyer</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatBot;
