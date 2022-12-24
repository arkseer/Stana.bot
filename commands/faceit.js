const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, roles } = require('../config.json');

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

        let getFaceitCH = interaction.client.channels.cache.get('1056127232277495818');

        function faceitEmbed() {
            const faceitPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`some description here`)
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

        await interaction.reply({ ephemeral: true, components: [faceitBtn], embeds: [_faceitEmbed] });
    }
}