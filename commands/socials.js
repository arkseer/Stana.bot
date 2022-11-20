const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { commands, commands_description } = require('../config.json');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription('Sends an embed with all social platforms')
        .setDefaultPermission(true),

    async execute(interaction) {
        const socialsEmbed = new MessageEmbed()
            .setColor('78282f');

        for (let x in commands) {
            socialsEmbed.addField(`**${commands[x]}**`, `${commands_description[x]}`, false);
        }
        await interaction.reply({ embeds: [socialsEmbed], ephemeral: true, components: [] });
    }
}