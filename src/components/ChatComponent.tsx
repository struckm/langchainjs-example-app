import { useState, FormEvent } from 'react';
import { OpenAI } from 'langchain/llms/openai';

const llm = new OpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  temperature: 0.9,
});

type Message = {
  text: string;
  sender: string;
};

const ChatComponent = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      messages.push({ text: input, sender: 'You' });
      setMessages([...messages,] );
      llm.predict(input)
        .then(res => {
          console.log(res);
          messages.push({ text: res, sender: 'ChatGPT' })
          setMessages([...messages,] );
          setInput('');
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%', margin: '0', padding: '0' }}>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '73%', fontSize: '16px', paddingLeft: '10px', backgroundColor: 'rgba(64,65,79)' }}
          />
          <button type="submit" style={{ width: '18%', marginLeft: '2%', backgroundColor: 'grey' }}>
            Send
          </button>
        </div>
      </form>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', width: '400px', backgroundColor: 'rgba(52,53,65)' }}>
        <div style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: 'left', lineHeight: '30px' }}>
              <strong>{message.sender}:</strong> {message.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
