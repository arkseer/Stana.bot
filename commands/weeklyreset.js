const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weekly')
        .setDescription('Countdown until next weekly reset')
        .setDefaultPermission(true)
        .addSubcommand(subcommand => subcommand
            .setName('reset')
            .setDescription('Countdown until next weekly reset')
            .addStringOption(option => option
                .setName('game')
                .setDescription('Countdown category you want to see')
                .setRequired(true)
                .addChoice('Destiny 2', 'weekly_reset_d2')
                .addChoice('Swords of Legends Online', 'weekly_reset_solo'))),

    async execute(interaction) {
        await interaction.reply({ content: `weekly reset`, embeds: [], ephemeral: true, components: [] });
    }
}