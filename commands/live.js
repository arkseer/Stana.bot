const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('live')
        .setDescription('Send a notification when you go live or apply to join our content creators programme')
        .addSubcommand(subcommand => subcommand
            .setName('\@me')
            .setDescription('Send a notification when you go live'))
        .addSubcommand(subcommand => subcommand
            .setName('apply')
            .setDescription('Apply to join our content creators programme')),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        interaction.reply({ content: `it works`, ephemeral: true, components: [] });
    }
}