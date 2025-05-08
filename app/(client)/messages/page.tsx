"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";


export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );
  const [messages] = useState([
    { id: 1, content: "Hi there!", type: "received", time: "10:30 AM" },
    {
      id: 2,
      content: "Hello! How can I help you?",
      type: "sent",
      time: "10:31 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Mock user data and handlers for DashboardNavbar
  // const user = { id: "1", name: "John Doe", email: "johndoe@example.com" };
  // const [showProfileMenu, setShowProfileMenu] = useState(false);
  // const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  // const handleSignOut = async () => {
  //   console.log("Sign out clicked");
  // };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
    
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Conversations
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[1, 2].map((id) => (
              <div
                key={id}
                className={`flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer ${
                  activeConversation === id ? "bg-blue-50" : ""
                }`}
                onClick={() => setActiveConversation(id)}

              >
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm truncate">User {id}</p>
                    <span className="text-xs text-gray-500">10:3{id} AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">
                      Last message preview...
                    </p>
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                      1
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center p-4 border-b">
            <button className="block md:hidden mr-3 text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">User Name</h3>
              <small className="text-xs text-gray-500">Online</small>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex max-w-[70%] ${
                  msg.type === "sent" ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl text-sm relative ${
                    msg.type === "sent"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-800 shadow rounded-bl-md"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="block text-[10px] mt-1 text-right opacity-80">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center p-4 border-t bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-4 py-2 text-sm border rounded-full bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button className="ml-3 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
