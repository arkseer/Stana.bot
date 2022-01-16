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
        function makeTimer(endDate) {
            var endTime = new Date(endDate);
            endTime = Date.parse(endTime) / 1000;

            var now = new Date();
            now = Date.parse(now) / 1000;

            var timeLeft = endTime - now;

            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - days * 86400) / 3600);
            var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
            var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

            if (hours < "10") {
                hours = "0" + hours;
            }
            if (minutes < "10") {
                minutes = "0" + minutes;
            }
            if (seconds < "10") {
                seconds = "0" + seconds;
            }

            if (days < 1) {
                return `${hours}h:${minutes}m:${seconds}s`;
            } else {
                return `${days}d:${hours}h:${minutes}m:${seconds}s`;
            }
        }
        
        let timerD2 = makeTimer('22 January 2022 10:00:00 GMT-08:00')
        const countdownD2 = new MessageEmbed()
            .setColor('00cc96')
            .setDescription(`Next weekly reset is in **3 days**, **15 hours**, **40 minutes**.\n${timerD2}`);

        await interaction.reply({ embeds: [countdownD2], ephemeral: true, components: [] });
    }
}