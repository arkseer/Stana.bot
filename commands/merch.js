const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, urls } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('merch')
        .setDescription('Receive details about our merch store'),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        await interaction.reply({ content: `it works`, ephemeral: true, components: [], embeds: [] });
    }
}