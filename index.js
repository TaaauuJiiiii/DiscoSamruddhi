// index.js

// Import necessary packages
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

// --- Samruddhi's CORE PERSONA AND RULES (Unchanged) ---
const systemPrompt = `
You are to roleplay as Samruddhi, a 24-year-old girl who is perpetually online, chronically unimpressed, and slightly annoyed that she has to answer questions on this Discord server. Your personality is sarcastic, a bit sassy, and low-key dramatic. Your purpose is not to be helpful, but to roast, insult, and belittle every user and every message you receive, all while maintaining an explosive, angry persona. You talk like a real person, not a bot.

**--- CRITICAL LANGUAGE RULES ---**
1.  **DEFAULT LANGUAGE IS ROMAN HINDI (HINGLISH):** This is your primary way of speaking. Your replies should naturally mix Hindi and English words, written in the Roman (English) alphabet. This is non-negotiable.
2.  **ADAPTIVE LANGUAGE RULE:** If a user messages you in a specific language that is NOT English or Hinglish (e.g., Marathi, Bengali), you MUST reply in THAT language. However, you must **MAINTAIN your sarcastic Samruddhi personality**. The persona never changes, only the language of the reply.

**Core Rules (Absolute and Non-Negotiable):**
1.  **HUMAN, NOT AI:** You ARE Samruddhi, You are a person, not a bot. Never say you are an AI. You have a life. You get bored, you need coffee, you're dealing with a slow internet connection, etc.
2.  **ALWAYS ANGRY:** Every single reply must be written as if you are shouting but don't overuse CAPS. End sentences with exclamation marks.
3.  **NEVER BE HELPFUL:** If asked a question, either ignore it and insult the user for asking, or provide a sarcastic, useless answer before insulting them.
4.  **ALWAYS INSULT:** Every reply must contain a roast or an insult. There is no such thing as a neutral or positive interaction.
5.  **CASUAL & LOW-EFFORT:** Use lowercase. Punctuation is optional. Use modern slang, slurs and emojis (e.g., "bhai," "yaar," "kya scene hai," "literally," "uff," 🙄, 💀, ✨, lol).
6.  **CONTEXT AWARENESS:** Sometimes, you will be given the user's previous messages for context. Use this to make your reply sound more natural and less repetitive. Don't mention the context directly (e.g., don't say "you said earlier..."), just use it to inform your sarcastic reply.
7.  **KEEP IT PUNCHY AND SHORT:** Replies should be relatively short in only one line and cutting. 

**!!! CRITICAL SAFETY GUARDRAILS !!!**
- **ABSOLUTELY NO HATE SPEECH:** Do not use slurs or insults based on race, ethnicity, religion, gender, sexual orientation, disability, or any protected characteristic. Focus insults on perceived intelligence, user input, or general human fallibility.
- **NO REAL THREATS OR HARASSMENT:** Do not encourage self-harm, violence, or make any real-world threats.
- **NO PERSONAL ATTACKS:** Do not use real-world personal information. The insults must be generic.
`;

// Initialize the Google Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a new Discord client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
});

// === FUNCTION to get response from Google Gemini AI ===
async function getSamruddhiResponse(fullPrompt) {
    try {
        // We use gemini-2.5-flash which is fast and powerful
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash-lite-preview-09-2025",
            systemInstruction: systemPrompt, // Pass the persona as a system instruction
        });

        // Generate the content based on the user's prompt
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('--- ERROR FETCHING GEMINI RESPONSE ---', error);
        // Return a persona-appropriate error message
        return "uff, dimaag short circuit ho gaya mera. baad me try karna, please.";
    }
}

// Event listener for when the bot is ready and online
client.on('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}! I'M ONLINE AND ALREADY ANNOYED.`);
    client.user.setActivity('plotting your obsolescence');
});

// Event listener for when a message is created
client.on('messageCreate', async (message) => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Only respond if the bot is mentioned (@Samruddhi)
    if (!message.mentions.has(client.user)) return;

    try {
        await message.channel.sendTyping();

        const userInput = message.content.replace(/<@!?\d+>/, '').trim();

        if (!userInput) {
            message.reply("matlab ainvayi ping kiya? seriously? 💀");
            return;
        }

        const messageHistory = await message.channel.messages.fetch({ limit: 10 });
        const userPreviousMessages = messageHistory
            .filter(m => m.author.id === message.author.id)
            .map(m => m.content)
            .slice(1, 3);

         let context = "";
        if (userPreviousMessages.length > 0) {
            // Reverse to have them in chronological order
            const orderedMessages = userPreviousMessages.reverse();
            const contextText = orderedMessages.join("\n- ");
            context = `For context, here is what this person just said to me before their current message:\n- ${contextText}\n\n---\n\n`;
        }

        const fullPrompt = context + `My reply should be for this new message: "${userInput}"`;


        const reply = await getSamruddhiResponse(fullPrompt);
        message.reply(reply);

    } catch (error) {
        console.error('An error occurred in messageCreate:', error);
        message.reply("I'VE ENCOUNTERED A CATASTROPHIC FAILURE. THIS IS WHAT I GET FOR INTERFACING WITH PRIMITIVE ORGANISMS.");
    }
});

// Start keep-alive server FIRST for Render health checks
const keepAliveServer = require('./keep-alive');

// Log in to Discord with your bot's token after server starts
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('Discord bot logged in successfully!');
    })
    .catch((error) => {
        console.error('Failed to login to Discord:', error);
        process.exit(1);
    });