import axios from "axios";
import { useState } from "react";
import { Box, useToast, Input, Image } from "@chakra-ui/react";
import Header from "./components/Header";
import send from "./assets/send.svg"
import { useLocation} from 'react-router-dom';

const App = () => {
  const toast = useToast();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mes = [...messages, prompt]
    setMessages(mes);
    axios.post("http://localhost:5000/chat", { prompt, model: queryParams.get('chat')})
      .then((res) => {
        setMessages([...mes, res.data]);
      })
      .catch((err) => {
        setMessages([...mes, err.message]);
        toast({
          title: err.message,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        console.error(err);
      }).finally(() => {
        setPrompt("");
      })
  }

  return (
    <>
      <Header />
      <Box className="container">
        {messages.map((response, index) => (
          <Box key={index} mt={4} p={2} borderWidth={1} borderRadius="md">
            {response}
          </Box>
        ))}
        <Box className="search">
          <Input value={prompt} placeholder="text sommething..." onChange={(e) => setPrompt(e.target.value)} />
          <Image src={send} alt="send" width={10} onClick={handleSubmit} />
        </Box>
      </Box>
    </>
  )
}

export default App;
