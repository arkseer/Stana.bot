const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, urls, urlNames } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('merch')
        .setDescription('Receive details about our merch store'),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        function merchEmbed() {
            const merchPost = new MessageEmbed()
                .setAuthor({ name: interaction.member.displayName, url: urls['merch'], iconURL: interaction.user.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`Description goes here`)
                .setImage('https://i.imgur.com/y0bAZc3.png');

            return merchPost;
        }

        const merchBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(urlNames.merch)
                    .setStyle('LINK')
                    .setURL(urls.merch),
            );

        let _merchEmbed = merchEmbed();

        await interaction.reply({ content: `it works`, ephemeral: true, components: [merchBtn], embeds: [_merchEmbed] });
    }
}