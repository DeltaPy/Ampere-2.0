const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });
const { Player } = require('discord-player');

client.commands = new Collection();

require('dotenv').config();

// init discord-player
const player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio'
    }
});
client.player = player;
// event handlers for discord-Player
// client.player.on("trackStart", (message, track) => message.channel.send(`🎵 - Now playing **${track.title}**!`));

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.TOKEN);
})();