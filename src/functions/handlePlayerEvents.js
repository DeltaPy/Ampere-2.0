module.exports = (client) => {
    client.handlePlayerEvents = (player) => {
        // player.on("botDisconnect", (queue) => {
        //     queue.metadata.send('Disconnected.');
        // });
        player.on("trackStart", (queue, track) => {
            queue.metadata.send(`🎵 - Now playing **${track.title}**!`);
        });
        player.on("trackAdd", (queue, track) => {
            queue.metadata.send(`🎶 - Track **${track.title}** has ben added to the queue!`);
        });
        player.on("queueEnd", (queue) => {
            queue.metadata.send('😞 - The queue has ended!');
        });
        player.on("channelEmpty", (queue) => {
            queue.metadata.send('🤨 - Nobody is in the voice channel, leaving...');
        });
    
        // Error catching
        player.on("error", (queue, error) => {
            console.log(`[${queue.guild.name}] Error from queue: ${error.message}`);
        });
        player.on("connectionError", (queue, error) => {
            console.log(`[${queue.guild.name}] ConnectionError: ${error.message}`);
        });
    }
}