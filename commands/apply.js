const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, bot } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply')
        .setDescription('Apply to different programmes the community has to offer')
        .addSubcommand(subcommand => subcommand
            .setName('content creators')
            .setDescription('Apply to join our content creators programme')),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getBot = await interaction.guild.members.fetch(bot);

        function applyEmbed() {
            const applyPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription('Description goes here')
                .setImage('https://i.imgur.com/tGSh027.png');

            return applyPost;
        }

        let _applyEmbed = applyEmbed();

        await interaction.reply({ content: `it works`, ephemeral: true, components: [], embeds: [_applyEmbed] });
    }

}