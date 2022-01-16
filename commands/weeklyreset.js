const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weeklyreset')
        .setDescription('Countdown until next weekly reset.')
        .setDefaultPermission(true)
        .addSubcommand(subcommand => subcommand
            .setName('d2')
            .setDescription('Countdown until next weekly reset in Destiny 2.'))
        .addSubcommand(subcommand => subcommand
            .setName('solo')
            .setDescription('Countdown until next weekly reset in Swords of Legends Online.')),

    async execute(interaction) {
        await interaction.reply({ content: `weekly reset`, embeds: [], ephemeral: true, components: [] });
    }
}