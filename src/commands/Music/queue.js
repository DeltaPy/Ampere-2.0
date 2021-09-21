const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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

        const tracks = queue.tracks.slice(startTrack, endTrack).map((m, i) => {
            return `${i + 1}: **[${m.title}](${m.url})**`;
        });

        console.log(tracks);

        // Emmbed
        const queueEmbed = new MessageEmbed()
        .setTitle('Queue')
        .setColor("#00FFFF")
        .setDescription(`${tracks.join('\n')}`)
        .addField("Now Playing: ",`🎵 - **[${currentTrack.title}](${currentTrack.url})**` )

        try {
            interaction.reply({embeds:[queueEmbed], ephemeral: true});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not display the queue.', ephemeral: true});
        }
    }
}