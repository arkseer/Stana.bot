const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls the dice and returns a random number from 1-100')
        .setDefaultPermission(true),

    async execute(interaction) {
        await interaction.reply({ content: `roll the dice`, ephemeral: false, components: [] });
    }
}