
const axios = require('axios');
const callChatGPT = async (prompt, previousMessages) => {
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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';
    const model = 'gpt-3.5-turbo';
    const previviousMessagesForApi = previousMessages.map((message) => ({ role: message.user, content: message.message }));
    return new Promise(async (resolve, reject) => {
        let data = JSON.stringify({
            messages: [
                { role: 'system', content: prompt },
                ...previviousMessagesForApi,],
            "model": "gpt-3.5-turbo"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            });
    })

}


module.exports = callChatGPT;