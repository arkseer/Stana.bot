const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, channels: { management }, roles: { applications }, dividers } = require('../config.json');

module.exports = {
    // Command format: /designer <linktree> <portfolio> <other>
    data: new SlashCommandBuilder()
        .setName('designer')
        .setDescription('Submit details to support your Designer application')
        .addStringOption(option => option
            .setName('linktree')
            .setDescription('Enter your linktr.ee link (for social media platforms) (provide full url)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('portfolio')
            .setDescription('Enter your portfolio link (provide full url)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('other')
            .setDescription('Enter any other links to support your work (provide full url)')
            .setRequired(false)),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getUser = interaction.user.id;
        const getDisplayName = interaction.member.displayName;
        const getGuild = await interaction.guild;
        const getBot = await interaction.guild.members.fetch(bot);
        const getMember = await interaction.guild.members.fetch(getUser);

        const getLinktree = interaction.options.getString('linktree');
        const getPortfolio = interaction.options.getString('portfolio');
        const getOther = interaction.options.getString('other');

        const getAppChannel = interaction.client.channels.cache.get(management.applications.id);

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function designerEmbed(linktreeURL, portfolioURL, otherURL) {
            if (otherURL === null) otherURL = "N/A" ?? otherURL;

            const embedDescription = `**DESIGNER APPLICATION:**\n\u2800`;

            const designerPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('fa6775')
                .setDescription(embedDescription)
                .addField(`Applicant name`, `<@${interaction.user.id}>`, false)
                .addField(`Portfolio URL`, `${portfolioURL}`, false)
                .addField(`Linktr.ee URL`, `${linktreeURL}`, false)
                .addField(`Other URL`, `${otherURL}`, false)
                .setImage('https://i.imgur.com/tGSh027.png');

            return designerPost;
        }

        const designerBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('designer_app_approve')
                    .setLabel('Approve')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('designer_app_deny')
                    .setLabel('Deny')
                    .setStyle('DANGER'),
            );

        let _designerEmbed = designerEmbed(getLinktree, getPortfolio, getOther);

        await interaction.reply({ content: `Nicely done ${getDisplayName}, your application has been submitted and entered the last phase of the process.\nOur staff members will review your application and reach out to you with an expedient answer.\n\nThank you for your patience!`, ephemeral: true, components: [], embeds: [] });
        await wait(1000);
        await getAppChannel.send({ ephemeral: false, components: [designerBtn], embeds: [_designerEmbed] });
        await wait(1000);
        
        // Revoking / granting application roles
        let pendingAppRole = getGuild.roles.cache.find(role => role.id === applications.pending.designer.id);
        let appliedAppRole = getGuild.roles.cache.find(role => role.id === applications.applied.designer.id);
        
        await getMember.roles.remove(pendingAppRole);
        await getMember.roles.add(appliedAppRole);
    }
}