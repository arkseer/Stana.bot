const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { commands, commands_description } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of helpful commands')
        .setDefaultPermission(true),

    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor('78282f');

        for (let x in commands) {
            helpEmbed.addField(`**${commands[x]}**`, `${commands_description[x]}`, false);
        }
        await interaction.reply({ embeds: [helpEmbed], components: [] });
    }
}