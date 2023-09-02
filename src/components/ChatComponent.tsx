import { useState } from 'react';
import { OpenAI } from 'langchain/llms/openai';

const llm = new OpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  temperature: 0.9,
});

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
        const result = llm.predict(input)
        .then(res => {
          console.log(res);
          messages.push({ text: input, sender: 'You' });
          messages.push({ text: res, sender: 'Bot' });
          setMessages([...messages, ]);
          setInput('');
        });
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', width: '400px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%' }}
        />
        <button onClick={handleSend} style={{ width: '18%', marginLeft: '2%' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
