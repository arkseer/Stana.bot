const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { guild, mail_channel_id } = require('../config.json');

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
        const wait = require('util').promisify(setTimeout);

        let getMailCH = interaction.client.channels.cache.get(mail_channel_id);

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function mailEmbed() {
            const mailPost = new MessageEmbed()
                .setAuthor({ name: `${interaction.user.tag}'s mail`, url: ``, iconURL: interaction.user.displayAvatarURL() })
                .setColor('cf889f')
                .setTitle(`${interaction.member.displayName} needs help with: `)
                .setURL('https://dmlc.store')
                .setDescription(`*${capitalizeFirst(interaction.options.getString('issue'))}*`)
                .setImage('https://i.imgur.com/P47v0CQ.png')
                .addFields(
                    { name: `Priority`, value: `${capitalizeFirst(interaction.options.getString('priority'))}`, inline: true },
                );

            return mailPost;
        }
        interaction.reply({ content: `${interaction.member.displayName}, your message has been sent to our staff. They will reach out to you shortly.\n\nThank you!`, ephemeral: true, components: [] });
        await wait(1000);
        await getMailCH.send({ ephemeral: true, components: [], embeds: [mailEmbed()] });
    }
}