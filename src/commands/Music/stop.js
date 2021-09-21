const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and disconnects bot.'),

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
        if(!queue || !queue.playing) return await interaction.reply({ content : '🤔 - No music is currently playing!', ephemeral: true})
        // delete queue and stop
        queue.destroy();
        return await interaction.reply({ content : '⏹️ - Music **stopped**!'})
    }
}