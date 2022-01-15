const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Ways you can help support the community')
        .setDefaultPermission(true),

    async execute(interaction) {
        await interaction.reply({ content: `Hello there!`, ephemeral: true, components: [] });

        // Send DM to user
        await interaction.user.send({ content: `Hello there!`, components: [] });
    }
}