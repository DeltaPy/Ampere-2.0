const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Removes track from queue.')
    .addStringOption(option => 
        option.setName('song')
        .setDescription("Track's name to remove.")
        .setRequired(true)
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


        const trackName = interaction.options.get('song').value;

        const foundTrack = queue.tracks.find(track => track.title === trackName);
        // const foundTrack = queue.tracks.find(track => (track.title).toLowerCase() === (trackName).toLowerCase());
        // const foundTrack = queue.tracks.find(track => console.log( (track.title).toLowerCase()) );

        const removeFailEmbed = new MessageEmbed()
        .setColor("#00FFFF")
        .setDescription(`Could not find **${trackName}**`)

        try {
            const removeEmbed = new MessageEmbed()
            .setColor("#00FFFF")
            .setDescription(`Removed: **${track.title} - ${track.author}**`)

            queue.remove(foundTrack);
            return await interaction.reply({ embeds: [removeEmbed]});
        } catch (e) {
            // console.error(e);
            return await interaction.reply({ embeds: [removeFailEmbed], ephemeral: true });
        }
    }
}