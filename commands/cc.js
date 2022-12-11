const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, channels: { management }, roles: { applications }, dividers } = require('../config.json');

module.exports = {
    // Command format: /cc <linktree> <platform> <link>
    data: new SlashCommandBuilder()
        .setName('cc')
        .setDescription('Submit details to support your Content creator application')
        .addStringOption(option => option
            .setName('linktree')
            .setDescription('Enter your linktr.ee link (for social media platforms) (provide full url)')
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
            .setDescription('Enter the link to your main platform (provide full url)')
            .setRequired(true)),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getUser = interaction.user.id;
        const getDisplayName = interaction.member.displayName;
        const getGuild = await interaction.guild;
        const getBot = await interaction.guild.members.fetch(bot);
        const getMember = await interaction.guild.members.fetch(getUser);

        const getLinktree = interaction.options.getString('linktree');
        const getPlatform = interaction.options.getString('platform');
        const getPlatformUrl = interaction.options.getString('link');

        const getAppChannel = interaction.client.channels.cache.get(management.applications.id);

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function ccEmbed(platform, platformURL, linktreeURL) {
            platform = capitalizeFirst(platform);

            const embedDescription = `**CONTENT CREATOR APPLICATION:**\n\u2800`;

            const ccPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('6d6085')
                .setDescription(embedDescription)
                .addField(`Applicant name`, `${getDisplayName} (<@${interaction.user.id}>)`, false)
                .addField(`Main platform`, `${platform}`, false)
                .addField(`Platform URL`, `${platformURL}`, false)
                .addField(`Linktr.ee URL`, `${linktreeURL}`, false)
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

        let _ccEmbed = ccEmbed(getPlatform, getPlatformUrl, getLinktree);

        await interaction.reply({ content: `Nicely done ${getDisplayName}, your application has been submitted and entered the last phase of the process.\nOur staff members will review your application and reach out to you with an expedient answer.\n\nThank you for your patience!`, ephemeral: true, components: [], embeds: [] });
        await wait(1000);
        await getAppChannel.send({ ephemeral: false, components: [ccBtn], embeds: [_ccEmbed] });
        await wait(1000);
        
        // Removing application roles
        
    }
}