const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Set loop mode.")
    .addIntegerOption(option => 
        option.setName('mode')
        .setDescription('Loop mode')
        .setRequired(true)
        .addChoice('Off', QueueRepeatMode.OFF)
		.addChoice('Track', QueueRepeatMode.TRACK)
		.addChoice('Queue', QueueRepeatMode.QUEUE)
		.addChoice('Autoplay', QueueRepeatMode.AUTOPLAY)
        ),

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

        const selectedMode = interaction.options.get('mode').value;
        const mode = (selectedMode === QueueRepeatMode.TRACK ? 'Track 🔂' : selectedMode === QueueRepeatMode.QUEUE ? 'Queue 🔁' : selectedMode === QueueRepeatMode.OFF ? 'Off' : 'Autoplay');

        // Emmbed
        const loopEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription(`Loop mode: **${mode}**`)

        try {
            queue.setRepeatMode(selectedMode);
            return await interaction.reply({ embeds: [loopEmbed]});
        } catch (e) {
            console.error(e);
            return await interaction.reply({ content: 'Could not change loop mode.'});
        }
    }
}
