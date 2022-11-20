const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { urlNames, urlHandles, urlEmojis, urls } = require('../config.json');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription('Sends an embed with all social platforms (Restricted to owner)')
        .setDefaultPermission(false),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);

        const socialsEmbed = new MessageEmbed()
            .setColor('fa6775')
            .setTitle(`**Social Media Platforms**`)
            .setDescription(`Make sure you follow us on these platforms to stay in touch with our work\n`);

        for (let x in urlNames) {
            //socialsEmbed.addField(`**${commands[x]}**`, `${commands_description[x]}`, false);
            socialsEmbed.addField(`${urlEmojis[x]} **${urlNames[x]}**`, `   — [${urlHandles[x]}](${urls[x]})`, false);
        }

        await interaction.reply({ content: `Command initiated`, ephemeral: true, components: [] });
        await wait(2000);

        await interaction.channel.send({ embeds: [socialsEmbed], ephemeral: false, components: [] });
    }
}