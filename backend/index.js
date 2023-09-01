const express = require('express');
const axios = require('axios');
const { createMessage, intializeChat } = require('./controllers/message.controller');
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const { Configuration, OpenAIApi } = require('openai');

const url = 'mongodb://localhost:27017'; // Default MongoDB local URL
const dbName = 'chabot'; // Replace this with your desired database name



require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const configuration = new Configuration({
    organization: "org-Ku7VqUTtkpQ1mr3OMXw96dlC",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a EbereGPT. You can help with graphic design tasks",
            },
            ...chats,
        ],
    });

    response.json({
        output: result.data.choices[0].message,
    });
});





// Redirect to Shopify for authentication
app.get('/auth', (req, res) => {
    const { SHOP_DOMAIN, API_KEY, SCOPES, REDIRECT_URI } = process.env;
    const authUrl = `https://${SHOP_DOMAIN}/admin/oauth/authorize?client_id=${API_KEY}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`;
    console.log("authUrl", authUrl)

    res.redirect(authUrl);
});

// Handle the callback after Shopify authentication
app.get('/auth/callback', async (req, res) => {
    const { SHOP_DOMAIN, API_KEY, API_SECRET, REDIRECT_URI } = process.env;
    console.log("req.query", req.query)
    const { code } = req.query;

    const accessTokenRequestUrl = `https://${SHOP_DOMAIN}/admin/oauth/access_token`;
    const accessTokenPayload = {
        client_id: API_KEY,
        client_secret: API_SECRET,
        code,
    };

    try {
        const response = await axios.post(accessTokenRequestUrl, accessTokenPayload);
        const accessToken = response.data.access_token;
        // You can now use the accessToken to make API requests on behalf of the store
        res.send(`Your access token: ${accessToken}`);
    } catch (error) {
        res.status(500).send('Error getting access token');
    }
});


app.get('/products', async (req, res) => {
    const { SHOP_DOMAIN, API_KEY, SCOPES, REDIRECT_URI } = process.env;
    try {
        const accessToken = req.headers['accesstoken']
        const result = await axios.get(`https://${API_KEY}:${accessToken}@${SHOP_DOMAIN}/admin/api/2023-07/collects.json`)
        return res.send(result.data)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error getting access token');
    }
});


async function connectToMongoDB() {
    try {
        await mongoose.connect(url + "/" + dbName, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToMongoDB();


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
