const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, channels: { pings }, roles, roles: { achievements } } = require('../config.json');
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
                .addChoice('Tiktok', 'tiktok')))
        .addSubcommand(subcommand => subcommand
            .setName('later')
            .setDescription('Schedule a delayed live notification')
            .addStringOption(option => option
                .setName('title')
                .setDescription('Write the title of your stream')
                .setRequired(true))
            .addStringOption(option => option
                .setName('platform')
                .setDescription('Choose the platform you will be live on')
                .setRequired(true)
                .addChoice('Twitch', 'twitch')
                .addChoice('Youtube', 'youtube')
                .addChoice('Tiktok', 'tiktok'))
            .addStringOption(option => option
                .setName('delay')
                .setDescription('Select the delay amount your stream will start at')
                .setRequired(true)
                .addChoice('+30 minutes', '30_minutes')
                .addChoice('+1 hour', '1_hour')
                .addChoice('+2 hours', '2_hours')
                .addChoice('+3 hours', '3_hours')
                .addChoice('+4 hours', '4_hours')
                .addChoice('+5 hours', '5_hours'))),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const getRole = interaction.member.roles.cache.some(role => role.id === achievements.content_creator.id);

        let getCC = members[interaction.user.id];
        let liveTitle = interaction.options.getString('title');
        let livePlatform = interaction.options.getString('platform');

        let getStreamCH = interaction.client.channels.cache.get(pings.streamers.id);

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

        if (interaction.options.getSubcommand() === 'now') {
            let _liveEmbed = liveEmbed(getCC[livePlatform], liveTitle, livePlatform);

            if (!getRole) {
                await interaction.reply({ content: `Sorry ${interaction.member.displayName}, you're not a content creator yet.\nIf you wish to stream under our banner, please use /apply to join our content creators programme.`, ephemeral: true, components: [] });
            } else {
                await interaction.reply({ephemeral: true, components: [liveBtn], embeds: [_liveEmbed] });
                await wait(1000);
                await getStreamCH.send({ content: `<@&${roles.pings['streamers']['id']}>`, ephemeral: false, components: [liveBtn], embeds: [_liveEmbed] });
            }
        } else if (interaction.options.getSubcommand() === 'later') {
            await interaction.reply({ content: `it works`, ephemeral: true, components: [liveBtn] });
        }
    }
}