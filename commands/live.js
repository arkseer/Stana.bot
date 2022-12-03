const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild } = require('../config.json');
const { contentCreators, contentCreators: { members } } = require('../scripts/contentCreators.json');

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
                .addChoice('Tiktok', 'tiktok'))),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        let getCC = members[interaction.user.id];
        let liveTitle = interaction.options.getString('title');
        let livePlatform = interaction.options.getString('platform');

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function liveEmbed(stream, title, platform) {
            const livePost = new MessageEmbed()
                .setAuthor({ name: interaction.member.displayName, url: `${stream}`, iconURL: interaction.user.displayAvatarURL() })
                .setColor('9b59b6')
                .setDescription(`**"${capitalizeFirst(title)}"** — LIVE on ${capitalizeFirst(platform)}`)
                .setImage('https://i.imgur.com/9b10bBR.png');

            return livePost;
        }

        const liveBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Watch stream')
                    .setStyle('LINK')
                    .setURL(getCC[livePlatform]),
                new MessageButton()
                    .setLabel('Socials')
                    .setStyle('LINK')
                    .setURL(getCC['linktree']),
            );

        let _liveEmbed = liveEmbed(getCC[livePlatform], liveTitle, livePlatform);

        interaction.reply({ content: `it works`, ephemeral: true, components: [liveBtn], embeds: [_liveEmbed] });
    }
}