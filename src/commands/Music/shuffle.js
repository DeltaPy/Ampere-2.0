const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the current queue."),

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        const shuffleEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription("🔀 - Queue shuffled.")

        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true})
        
        
        try {
            await queue.shuffle();
            return await interaction.reply({ embeds: [shuffleEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not shuffle queue.', ephemeral: true});
        }
    }
}