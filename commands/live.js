const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('live')
        .setDescription('Send a notification when you go live')
        .addSubcommand(subcommand => subcommand
            .setName('now')
            .setDescription('Send a notification when you go live')),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        interaction.reply({ content: `it works`, ephemeral: true, components: [] });
    }
}