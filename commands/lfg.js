const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant'),
        
    async execute(interaction, client) {
        interaction.guild.channels.create(`new-voice-channel`, { reason: `cool new channel` })
            .then(console.log)
            .catch(console.error);
    }
}