const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Sends a list of the bot's command.s"),

    async execute(interaction, client) {

        const helpEmbed = new MessageEmbed()
        .setTitle('Commands')
        .setColor("#00FFFF")
        .setThumbnail('https://i.imgur.com/gQJFWme.png')
        .addFields(
            { name: '/play ', value: 'Plays a given song or audio from youtube, spotify, facebook and more.', inline: true },
            { name: '/stop', value: 'Stops the bot and disconnects it.', inline: true },
            { name: '/skip', value: 'Skips current track.', inline: true },
            { name: '/pause', value: 'Pauses current track.', inline: true },
            { name: '/resume', value: 'Resumes paused track.', inline: true },
            { name: '/remove', value: 'Removes inputed track from queue.', inline: true },
            { name: '/queue', value: 'Displays the current queue.', inline: true },
            { name: '/loop', value: 'Changes the loop mode.', inline: true },
        )
        
        try {
            await interaction.reply({embeds:[helpEmbed], ephemeral: true});
        } catch (e) {
            console.error(e);
        }
    }

}