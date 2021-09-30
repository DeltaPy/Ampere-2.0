const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('np')
    .setDescription('Displays whats playing.'),

    async execute(interaction, client) {

        const queue = client.player.getQueue(interaction.guildId);
        const track = queue.previousTracks[queue.previousTracks.length - 1];

        const npEmbed = new MessageEmbed()
        .setDescription(`🎵 - Now playing **[${track.title} - ${track.author}](${track.url})**.`)
        .setColor("#00FFFF")

        if(!queue || !queue.playing) return await interaction.reply({ content: '🤔 - No music is currently playing!', ephemeral: true});


        try {
            return await interaction.reply({ embeds: [npEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not display now playing.', ephemeral: true})
        }
    }
}