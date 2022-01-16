const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders } = require('../config.json');
const { makeTimer } = require('../functions/makeTimer');

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
        let timerD2 = makeTimer('22 January 2022 10:00:00 GMT-08:00')
        const countdownD2 = new MessageEmbed()
            .setColor('00cc96')
            .setDescription(`Next weekly reset is in **3 days**, **15 hours**, **40 minutes**.\n${timerD2}`);

        await interaction.reply({ embeds: [countdownD2], ephemeral: true, components: [] });
    }
}