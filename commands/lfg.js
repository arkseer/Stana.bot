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
            .then(console.log(newChannel))
            .catch(console.error);
        //interaction.editReply({ content: `` })
    }
}