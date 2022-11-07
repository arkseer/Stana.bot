const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant'),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const parentCategory = "1038643441002889346";

        interaction.reply({ content: `Voice channel created.`, ephemeral: true, components: [] });
        await wait(1000);
        const newChannel = interaction.guild.channels.create(`new-voice-channel`, { 
            type: 'GUILD_VOICE',
            parent: parentCategory
         })
            .then(id => interaction.editReply({ content: `Your voice channel: ${id}`, ephemeral: true, components: [] }))
            .then(await interaction.member.voice.setChannel(newChannel))
            .catch(console.error);

        await wait(1000);
        //console.log(newChannel);
        //interaction.editReply({ content: `Your voice channel: ${newChannel} <#${newChannel}>`, ephemeral: true, components: [] });
        //interaction.editReply({ content: `` })
    }
}