const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const config = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(config);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const { model, prompt } = req.body;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 100,
            temperature: 0,
            prompt: prompt
        })
        console.log(completion.data.choices[0].text)
        res.send(completion.data.choices[0].text);
    } catch (e) {
        if (e.response) {
            console.log(e.response.status);
            console.log(e.response.data);
        } else {
            console.log(e.message);
        }
        res.status(500).send(e.message);
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})