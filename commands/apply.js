const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, bot } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply')
        .setDescription('Apply to different programmes the community has to offer'),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getBot = await interaction.guild.members.fetch(bot);

        function applyEmbed() {
            const embedDescription = `Hello there **${interaction.member.displayName}**,\n\nCurrently we have 3 programmes available for our members to join:\n\u2800› Content creators\n\u2800› Editors\n\u2800› Designers\n\nIf any of these sparks your interest, please proceed.`;

            const applyPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(embedDescription)
                .setImage('https://i.imgur.com/tGSh027.png');

            return applyPost;
        }

        const applyBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('apply_cc')
                    .setLabel('Content creator')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('apply_editor')
                    .setLabel('Editor')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('apply_designer')
                    .setLabel('Designer')
                    .setStyle('SECONDARY'),
            );

        let _applyEmbed = applyEmbed();

        await interaction.reply({ ephemeral: true, components: [applyBtn], embeds: [_applyEmbed] });
    }

}