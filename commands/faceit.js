const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, roles, faceit } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faceit')
        .setDescription('Use to join our Faceit hub')
        .addSubcommand(subcommand => subcommand
            .setName('join')
            .setDescription('Use to join our Faceit hub')
        ),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        let getBot = await interaction.guild.members.fetch(bot);
        let getMember = await interaction.member;
        let getGuild = await interaction.guild;

        let getFaceitCH = interaction.client.channels.cache.get(faceit.channel);

        let hasRole = getMember.roles.cache.some(role => role.id === roles.activity.faceit.id);

        function faceitEmbed() {
            const faceitPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`**${getMember.displayName}** has applied to join the Faceit Hub.`)
                .addField(`Applicant name`, `<@${interaction.user.id}>`, false)
                .setImage('https://i.imgur.com/y0bAZc3.png');

            return faceitPost;
        }

        const faceitBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('faceit_approve')
                    .setLabel('Approve')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('faceit_deny')
                    .setLabel('Deny')
                    .setStyle('DANGER'),
            );

        let _faceitEmbed = faceitEmbed();

        await interaction.reply({ content: `Your application was sent to our admins, please be patient while they get back to you.`, ephemeral: true, components: [], embeds: [] });
        await getFaceitCH.send({ ephemeral: false, components: [faceitBtn], embeds: [_faceitEmbed] });
    }
}