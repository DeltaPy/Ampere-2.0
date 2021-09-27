const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears the queue.'),

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        const clearEmbed = new MessageEmbed()
        .setDescription(' Queue **cleared**.')
        .setColor("#00FFFF")

        //Check if music is Playing
        if(!queue || !queue.playing) return await interaction.reply({ content: '🤔 - No music is currently playing!', ephemeral: true});

        try {
            queue.clear();
            return await interaction.reply({ embeds: [clearEmbed] });
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not clear the queue!', ephemeral: true });
        }
    }
}