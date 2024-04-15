import React, { useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <>
    <VStack spacing={4} align="stretch" p={"350px"}>
      <Box p={4} borderWidth="1px" borderRadius="md">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Box>
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <Button colorScheme="blue" onClick={handleSendMessage}>
        Send
      </Button>
    </VStack></>
  );
}

export default Chat;
