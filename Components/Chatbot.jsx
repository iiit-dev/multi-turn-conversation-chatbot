import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Alert from '@mui/material/Alert';
import { useMediaQuery } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import { Box, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Send from '../SVG/Send';
import '../CSS/Crossfade.css';
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:767px)');
  const genAI = new GoogleGenerativeAI('AIzaSyB1FU0rO6DvfxQlyy8JD4mQLP4JHUo9Klo');

  useEffect(() => {
    const initChat = async () => {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const initialChat = model.startChat({
        history: messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        generationConfig: {
          maxOutputTokens: 100
        }
      });
      setChat(initialChat);
    };
    initChat();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (chat && input) {
      const newMessages = [...messages, { role: 'user', text: input }];
      setMessages(newMessages);
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();
      setMessages([...newMessages, { role: 'model', text }]);
      // setInput('');
    }
  };
  return (
    <Box width={'100vw'} height={'100vh'} border={'2px solid black'} sx={{ background:'url(https://tinyurl.com/background-img-turl) center/cover no-repeat'}} >
      <Box  height={'87vh'} px={!isSmallScreen?'23%':'0%'} className='scroll-container' sx={{ overflowY: 'auto' }} display={'flex'} flexDirection={'column'} >
        {messages.map((msg, index) => (
          <Box key={crypto.randomUUID()} fontSize={'18px'} >
            <Box sx={{my:'5px', width: 'fit-content', ml: (msg.role === 'user') && 'auto', bgcolor: (msg.role === 'model') ? '#5B3873' : '#688C4F' }} className={(msg.role === 'user') ? "bubble right" : 'bubble left'}>
              {msg.text}
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={'10px'}  onSubmit={handleSendMessage} component={'form'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
       <TextField sx={{ '& .MuiInputBase-root': { height:'40px', width: '50vw' } }} type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type='submit' sx={{ borderRadius: '0 999999px 999999px 0', height: '40px', bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'black' } }} ><Send/></Button>
      </Box>
    </Box>
  );
};
export default Chatbot