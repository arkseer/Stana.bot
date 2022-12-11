const { SlashCommandBuilder } = require('@discordjs/builders');
const { bot } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cc')
        .setDescription('Submit details to support your Content creator application'),

    async execute(interaction) {
        await interaction.reply({ content: `it works`, ephemeral: true, components: [] });
    }
}