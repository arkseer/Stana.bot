const { SlashCommandBuilder } = require('@discordjs/builders');
const { bot } = require('../config.json');

module.exports = {
    // Command format: /cc <linktree> <platform> <link>
    data: new SlashCommandBuilder()
        .setName('cc')
        .setDescription('Submit details to support your Content creator application')
        .addStringOption(option => option
            .setName('linktree')
            .setDescription('Enter your linktr.ee link (for social media platforms)')
            .setRequired(true)
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
            .setRequired(true))),

    async execute(interaction) {
        await interaction.reply({ content: `it works`, ephemeral: true, components: [] });
    }
}