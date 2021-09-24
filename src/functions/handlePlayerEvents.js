const { MessageEmbed } = require('discord.js');
module.exports = (client) => {
    client.handlePlayerEvents = (player) => {
        let lastMessageNP = 0;
        player.on("trackStart", async (queue, track) => {
            
            const nowPlaying = new MessageEmbed()
            .setDescription(`🎵 - Now playing **[${track.title} - ${track.author}](${track.url})**.`)
            .setColor("#00FFFF")
            .addField('Requested by: ',`${track.requestedBy.username}#${track.requestedBy.discriminator}`)

            // delete last message if exist
            if(lastMessageNP) lastMessageNP.delete();

            queue.metadata.channel.send({embeds:[nowPlaying]})
            .then((message) => {
                lastMessageNP = message;
            });
        });

        player.on("trackAdd", (queue, track) => {
            const trackAdded = new MessageEmbed()
            .setDescription(`🎶 - Queued **${track.title}**.`)
            .setColor("#00FFFF")
            queue.metadata.channel.send({embeds:[trackAdded]});
        });

        player.on("queueEnd", (queue) => {
            const queueEnd = new MessageEmbed()
            .setDescription('😞 - The queue has ended, leaving...')
            .setColor("#00FFFF")

            if(lastMessageNP) lastMessageNP.delete();

            queue.metadata.channel.send({embeds:[queueEnd]}).then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 15000);
            });
        });

        player.on("channelEmpty", (queue) => {
            const channelEmpty = new MessageEmbed()
            .setDescription('🤨 - Nobody is in the voice channel, leaving...')
            .setColor("#00FFFF")

            if(lastMessageNP) lastMessageNP.delete();
            
            queue.metadata.channel.send({embeds:[channelEmpty]}).then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 15000);
            });
        });

        // player.on("botDisconnect", (queue) => {
        //     queue.metadata.send('Disconnected.');
        // });

        // Error catching
        player.on("error", (queue, error) => {
            console.log(`[${queue.guild.name}] Error from queue: ${error.message}`);
        });
        player.on("connectionError", (queue, error) => {
            console.log(`[${queue.guild.name}] ConnectionError: ${error.message}`);
        });
    }
}