const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of helpful commands')
        .setDefaultPermission(true),

    async execute(interaction) {
        await interaction.reply({ content: `I'm sorry, but this feature is still under construction.`, ephemeral: true, components: [] });
    }
}