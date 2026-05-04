const login = require("fca-unofficial");
const express = require('express');
const app = express();

// --------------------------
// ARIEL BOT CONFIGURATION
// --------------------------
const BOT_NAME = "Ariel Bot";

// Login to account
login({appState: JSON.parse(process.env.APPSTATE || '[]')}, (err, api) => {
    if(err) return console.error(err);

    console.log("====================================");
    console.log("✅ ARIEL BOT IS NOW ONLINE!");
    console.log("====================================");
    
    api.setOptions({
        listenEvents: true,
        logLevel: "silent"
    });

    // Listen for messages
    api.listen(async (err, event) => {
        if(err) return console.error(err);
        if(event.type !== "message") return;

        let body = event.body.toLowerCase();
        let threadID = event.threadID;

        // ============== AUTO REPLIES ==============

        // If someone says "ariel"
        if(body.includes("ariel")) {
            api.sendMessage(`🤖 Hello! I am ${BOT_NAME} 🇨🇩🇨🇩\nHow can I help you today? ❤️`, threadID);
        }

        // ✅ NEW: If someone says "Ai"
        else if(body.includes("ai")) {
            api.sendMessage(`🤖 ${BOT_NAME} is active! 🇨🇩🇨🇩\nWhat can I do for you? 😘`, threadID);
        }

        // If someone says hello
        else if(body.includes("hello") || body.includes("salut") || body.includes("bonjour")) {
            api.sendMessage(`👋 Hello! I am ${BOT_NAME} 🇨🇩🇨🇩`, threadID);
        }

        // If someone asks for help
        else if(body.includes("help") || body.includes("aide")) {
            api.sendMessage(`📖 **HELP MENU - ${BOT_NAME}**\n\n💬 Type "Ariel" or "Ai" and I will reply\n❤️ I am always here for you!`, threadID);
        }
    });
});

// Server to keep bot alive
app.get('/', (req, res) => {
    res.send(`${BOT_NAME} is working perfectly! ✅`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
