"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import mychat from '../../public/images/Chatbot/Chatbot.svg';

const ChatbotBox = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        const timestamp = new Date().toLocaleTimeString();
        const userMessage = { sender: 'user', text: input, timestamp };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:8003/chat', { 
                message: input,
            });
            const botMessage = {
                sender: 'bot',
                text: res.data.response,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error('Error while chatting:', err);
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    text: 'There was an error connecting to the server.',
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);
        }

        setIsTyping(false);
    };

    return (
        <>
        <div className='relative size-32'>
        <div className="absolute bottom-0 left-0">
            {/*------------------------------- Chat Icon Button------------------------------- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-full shadow-xl z-[60] flex justify-center items-center hover:scale-110 transition-transform duration-300"
            >
                <Image
                    src={mychat}
                    alt="My SVG"
                    width={36}
                    height={18}
                />
            </button>

            {/*------------------------------- Overlay------------------------------- */}
            {isOpen && <div className="fixed inset-0 bg-black/50 z-[50]" onClick={() => setIsOpen(false)} />}

            {/* -------------------------------Chatbot Window -------------------------------*/}
            <div
                className={`fixed bottom-24 left-6 w-[400px] h-[550px] border border-gray-300 rounded-2xl bg-white dark:bg-gray-800 z-[60] flex flex-col transition-all duration-300 ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                }`}
            >
                <div className="p-4 font-semibold text-lg bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-t-2xl">Diabetes Assistant</div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded-t-3xl">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender !== 'user' && <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">D</div>}
                            <div
                                className={`text-sm px-4 py-3 rounded-2xl max-w-[75%] shadow-md ${
                                    msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <strong>{msg.sender === 'user' ? 'You' : 'Diascan'}</strong>
                                    <span className="text-xs ml-5 text-gray-300">{msg.timestamp}</span>
                                </div>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">D</div>
                            <div className="text-sm px-4 py-3 rounded-2xl max-w-[75%] bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md">
                                <strong>DiaScan:</strong> <span className="italic text-gray-500">Typing...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex border-t p-3 bg-gray-50 dark:bg-gray-900 rounded-b-3xl">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about Diabetes..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm shadow-md hover:scale-105 transition-transform duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default ChatbotBox;