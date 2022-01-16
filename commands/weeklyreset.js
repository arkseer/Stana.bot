const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders, month } = require('../config.json');

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

        function nextDate(dayIndex) {
            var today = new Date();
            today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);

            return today;
        }

        // Get next Tuesday
        const resetDayD2 = nextDate(2);

        const resetDayD2_day = resetDayD2.getDate();
        const resetDayD2_month = month[resetDayD2.getMonth()];
        const resetDayD2_year = resetDayD2.getFullYear();

        let timerD2 = `${resetDayD2_day} ${resetDayD2_month} ${resetDayD2_year} 18:00:00 GMT+00:00`;
        timerD2 = makeTimer(timerD2);

        const countdownD2 = new MessageEmbed()
            .setColor('00cc96')
            .setDescription(`Next weekly reset is in **3 days**, **15 hours**, **40 minutes**.\n${timerD2}`);

        await interaction.reply({ embeds: [countdownD2], ephemeral: true, components: [] });
    }
}