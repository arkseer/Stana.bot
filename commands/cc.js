const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, channels: { management } } = require('../config.json');

module.exports = {
    // Command format: /cc <linktree> <platform> <link>
    data: new SlashCommandBuilder()
        .setName('cc')
        .setDescription('Submit details to support your Content creator application')
        .addStringOption(option => option
            .setName('linktree')
            .setDescription('Enter your linktr.ee link (for social media platforms)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('platform')
            .setDescription('Choose the main platform you publish your content on')
            .setRequired(true)
            .addChoice('Twitch', 'twitch')
            .addChoice('Youtube', 'youtube')
            .addChoice('Tiktok', 'tiktok'))
        .addStringOption(option => option
            .setName('link')
            .setDescription('Enter the link to your main platform')
            .setRequired(true)),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getBot = await interaction.guild.members.fetch(bot);

        function ccEmbed() {
            const embedDescription = `some description`;

            const ccPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(embedDescription)
                .setImage('https://i.imgur.com/tGSh027.png');

            return ccPost;
        }

        const ccBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cc_app_approve')
                    .setLabel('Approve')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('cc_app_deny')
                    .setLabel('Deny')
                    .setStyle('DANGER'),
            );

        let _ccEmbed = ccEmbed();

        await interaction.reply({ content: `it works`, ephemeral: true, components: [ccBtn], embeds: [_ccEmbed] });
    }
}