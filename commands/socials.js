const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { urlNames, urlHandles, urlEmojis, urls } = require('../config.json');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription('Sends an embed with all social platforms')
        .setDefaultPermission(true),

    async execute(interaction) {
        const socialsEmbed = new MessageEmbed()
            .setColor('fa6775');

        for (let x in urlNames) {
            //socialsEmbed.addField(`**${commands[x]}**`, `${commands_description[x]}`, false);
            socialsEmbed.addField(`${urlEmojis[x]} **${urlNames[x]}**`, `   — [${urlHandles[x]}](${urls[x]})`, false);
        }
        await interaction.reply({ embeds: [socialsEmbed], ephemeral: true, components: [] });
    }
}