const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes paused track.'),


    async execute (interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        const resumeEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription('▶️ - Track **resumed**.')

        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true});

        try {
            queue.setPaused(false);
            return await interaction.reply({ embeds: [resumeEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not resume track.'});
        }
    }
};