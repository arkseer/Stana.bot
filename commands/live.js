const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('live')
        .setDescription('Send a notification when you go live')
        .addSubcommand(subcommand => subcommand
            .setName('now')
            .setDescription('Send a notification when you go live')
            .addStringOption(option => option
                .setName('title')
                .setDescription('Write the title of your stream')
                .setRequired(true))
            .addStringOption(option => option
                .setName('platform')
                .setDescription('Choose the platform you are live on')
                .setRequired(true)
                .addChoice('Twitch', 'twitch')
                .addChoice('Youtube', 'youtube')
                .addChoice('Facebook', 'facebook'))),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        function liveEmbed() {
            const livePost = new MessageEmbed()
                .setAuthor({ name: interaction.member.displayName, url: `https://dmlc.store`, iconURL: interaction.user.displayAvatarURL() })
                .setColor('9b59b6')
                .setDescription(`"Title goes here !blank !discord" — LIVE on Twitch`)
                .setImage('https://i.imgur.com/9b10bBR.png');

            return livePost;
        }

        interaction.reply({ content: `it works`, ephemeral: true, components: [], embeds: [liveEmbed()] });
    }
}