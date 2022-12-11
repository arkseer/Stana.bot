const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, channels: { management }, roles: { applications }, dividers } = require('../config.json');

module.exports = {
    // Command format: /editor <linktree> <youtube> <other>
    data: new SlashCommandBuilder()
        .setName('editor')
        .setDescription('Submit details to support your Editor application')
        .addStringOption(option => option
            .setName('linktree')
            .setDescription('Enter your linktr.ee link (for social media platforms) (provide full url)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('youtube')
            .setDescription('Enter your youtube link with your edits (provide full url)')
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
        const getYoutube = interaction.options.getString('youtube');
        const getOther = interaction.options.getString('other');

        const getAppChannel = interaction.client.channels.cache.get(management.applications.id);

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function editorEmbed(linktreeURL, youtubeURL, otherURL) {
            platform = capitalizeFirst(platform);

            const embedDescription = `**EDITOR APPLICATION:**\n\u2800`;

            const editorPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('6d6085')
                .setDescription(embedDescription)
                .addField(`Applicant name`, `<@${interaction.user.id}>`, false)
                .addField(`Youtube URL`, `${youtubeURL}`, false)
                .addField(`Linktr.ee URL`, `${linktreeURL}`, false)
                .addField(`Other URL`, `${otherURL}`, false)
                .setImage('https://i.imgur.com/tGSh027.png');

            return editorPost;
        }

        const editorBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('editor_app_approve')
                    .setLabel('Approve')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('editor_app_deny')
                    .setLabel('Deny')
                    .setStyle('DANGER'),
            );

        let _editorEmbed = editorEmbed(getLinktree, getYoutube, getOther);

        await interaction.reply({ content: `Nicely done ${getDisplayName}, your application has been submitted and entered the last phase of the process.\nOur staff members will review your application and reach out to you with an expedient answer.\n\nThank you for your patience!`, ephemeral: true, components: [], embeds: [] });
        await wait(1000);
        await getAppChannel.send({ ephemeral: false, components: [editorBtn], embeds: [_editorEmbed] });
        await wait(1000);
        
        // Revoking / granting application roles
        let pendingAppRole = getGuild.roles.cache.find(role => role.id === applications.pending.editor.id);
        let appliedAppRole = getGuild.roles.cache.find(role => role.id === applications.applied.editor.id);
        
        await getMember.roles.remove(pendingAppRole);
        await getMember.roles.add(appliedAppRole);
    }
}