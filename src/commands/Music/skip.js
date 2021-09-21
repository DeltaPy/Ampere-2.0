const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips current track."),

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        // Emmbed
        const skipEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription('Track **skipped**.')

        // check if user is in vc
        if(!interaction.member.voice.channelId) {
            return await interaction.reply({ content : '😔 - You are not in a voice channel.', ephemeral: true});
        }
        // check if user is in the same vc
        if(interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId){
            return await interaction.reply({ content : '🤔 - The bot is in another voice channel.', ephemeral: true});
        }
        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true})

        try {
            queue.skip();
            return await interaction.reply({ embeds: [skipEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not skip track.'});
        }
    }
}
