
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current track.'),


    async execute (interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        const pausedEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription('⏸️ - Track **paused**.')

        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true})

        try {
            queue.setPaused(true);
            return await interaction.reply({ embeds: [pausedEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not pause track.'});
        }
    }
};