import colors from 'colors';
import readlineSync from 'readline-sync';
import openai from "./config/open-ai.js";


async function main() {
    console.log(colors.green('Welcome to Jarlita Chatbot!'));
    console.log(colors.green('You can start chatting with the bot.'));

    // Store chat history
    const chatHistory = [ ];

    while (true) {
        const prompt = readlineSync.question(colors.white('You: '));
        
        try {
            //Construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({ role, content }));

            //Add latest user prompt
            messages.push({ role: 'user', content: prompt });

            //Call the API with user prompt
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            });

            //Get completion content
            const completionResponse = response.data.choices[0].message.content;

            // When user is through with the bot an type 'done'
            if(prompt.toLowerCase() == 'done') {
                console.log(colors.green('Jarlita: ') + completionResponse);
                return;
            }

            console.log(colors.green('Jarlita: ') + completionResponse);

            //Update history with user prompt and assistant response
            chatHistory.push(['user', prompt]);
            chatHistory.push(['assistant', completionResponse]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
};

main();