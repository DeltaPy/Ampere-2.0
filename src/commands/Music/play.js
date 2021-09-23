const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music if in a voice channel.')
    .addStringOption(option => 
        option.setName('song')
        .setDescription('The song you want to play.')
        .setRequired(true)),

  async execute(interaction, client) {
    player = client.player;
    // check if user is in vc
    if(!interaction.member.voice.channelId){
        return await interaction.reply({ content : '😔 - You are not in a voice channel.', ephemeral: true});
    }
    // check if user is in the same vc as the bot
    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId){
        return await interaction.reply({ content: '🤔 - The bot is in another voice channel.', ephemeral: true });
    }
    const query = interaction.options.get('song').value;
    const queue = player.createQueue(interaction.guild, {
        metadata: {
            channel: interaction.channel
        }
    });

    // search query
    const result = await player.search(query, {
        requestedBy: interaction.user
    });
    if (!result) return await interaction.followUp({ content: `❌ - Track **${query}** not found!`, ephemeral: true });

    // console.log(query);

    // join vc 
    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        queue.destroy();
        return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }
    await interaction.deferReply({ephemeral: true});
        //Play found track or playlist
        result.playlist ? queue.addTracks(result.tracks) : await queue.play(result.tracks[0]);
        if (!queue.playing) await queue.play();


        // return await interaction.followUp({ content: '**Loading...**', ephemeral: true });
  }
};
