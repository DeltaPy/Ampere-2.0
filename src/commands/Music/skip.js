const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips current track."),

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        // check if user is in vc
        if(!interaction.member.voice.channelId) {
            return await interaction.reply({ content : '😔 - You are not in a voice channel.', ephemeral: true});
        }
        // check if user is in the same vc
        if(interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId){
            return await interaction.reply({ content : '🤔 - The bot is in another voice channel.', ephemeral: true});
        }
        // check if music is playing
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!'})

        try {
            queue.skip();
            return await interaction.reply({ content: 'Track **skipped**.'});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not skip track.'});
        }
    }
}
