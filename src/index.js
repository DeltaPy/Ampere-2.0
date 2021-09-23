require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });
const { Player } = require('discord-player');
client.commands = new Collection();

// init discord-player
const player = new Player(client, {
    ytdlOptions: {
        // quality: 'highestaudio'
    },
    leaveOnEmptyCooldown: 300000,
    leaveOnEnd: false,
    bufferingTimeout: 1000
});
client.player = player;

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handlePlayerEvents(client.player);
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.TOKEN);
})();