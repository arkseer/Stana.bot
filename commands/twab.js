const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twab')
        .setDescription('Posts the weekly twab in the specific text channel')
        .setDefaultPermission(true)
        .addStringOption(option => option
                .setName('link')
                .setDescription('Requires bung.ie/<link> or bungie.net/<link>')
                .setRequired(true)),
    async execute(interaction, client) {
        await interaction.reply({ content: `twab`, ephemeral: true, components: [] });
    }
}