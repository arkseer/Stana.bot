const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mail')
        .setDescription('Mail a moderator to assist with your issue')
        .addSubcommand(subcommand => subcommand
            .setName('me')
            .setDescription('Mail a moderator to assist with your issue')
            .addStringOption(option => option
                .setName('priority')
                .setDescription('Select the priority of your issue')
                .setRequired(true)
                .addChoice('High', 'high')
                .addChoice('Normal', 'normal')
                .addChoice('Low', 'low'))
            .addStringOption(option => option
                .setName('issue')
                .setDescription('Describe your issue as best you can')
                .setRequired(true))
        ),

    async execute(interaction, client) {

        function mailEmbed() {
            const mailPost = new MessageEmbed()
                .setAuthor({ name: `${interaction.user.tag}'s mail`, url: ``, iconURL: interaction.user.displayAvatarURL() })
                .setColor('cf889f')
                .setTitle(`${interaction.member.displayName} needs help with: `)
                .setDescription(`*${interaction.options.getString('issue')}*`)
                .setImage('https://i.imgur.com/P47v0CQ.png')
                .addFields(
                    { name: `Priority`, value: `${interaction.options.getString('priority').toUpperCase()}`, inline: true },
                );

            return mailPost;
        }
        interaction.reply({ content: `it works`, ephemeral: true, components: [], embeds: [mailEmbed()] });
    }
}