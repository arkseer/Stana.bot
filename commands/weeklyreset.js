const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weeklyreset')
        .setDescription('Countdown until next weekly reset.')
        .setDefaultPermission(true),

    async execute(interaction) {
        await interaction.reply({ content: `weekly reset`, embeds: [], ephemeral: true, components: [] });
    }
}