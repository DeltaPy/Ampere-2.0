const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { ReactionMenu } = require('@xenon-devs/discordjs-reaction-menu');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Displays the current queue."),

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true})
        
        const currentTrack = queue.current;

        let startTrack = 0;
        let endTrack = 10;

        let tracks = queue.tracks.slice(startTrack, endTrack).map((t, i) => {
            return `${i + 1}: **[${t.title}](${t.url})** - by: ${t.requestedBy.username}#${t.requestedBy.discriminator}`;
        });

        if(tracks.length == 0) tracks[0] = "**Queue is empty**";
        // console.log(tracks);

        // Emmbed
        let queueEmbed = new MessageEmbed()
        .setTitle('Queue')
        .setColor("#00FFFF")
        .setDescription(`${tracks.join('\n')}`)
        .addField("Now Playing: ",`🎵 - **[${currentTrack.title}](${currentTrack.url})**`);

        try {
            await interaction.reply({embeds:[queueEmbed], ephemeral: false});

            //get the sended interaction and add reactions if queue longer than 10
            if(queue.tracks.length > 10) {
                interaction.fetchReply()
                .then((message) => {
                    message.react('⬅️').then(() => {message.react('➡️')});
                });

            }
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not display the queue.', ephemeral: true});
        }
    }
}