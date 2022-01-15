const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Ways you can help support the community')
        .setDefaultPermission(true),

    async execute(interaction) {
        let getGender;
        // Check for gender roles to address user properly
        if (interaction.member.roles.cache.some(role => role.id === genders['male'])) {
            getGender = ", sir";
        } else if (interaction.member.roles.cache.some(role => role.id === genders['female'])) {
            getGender = ", ma'am";
        } else {
            getGender = "";
        }
        await interaction.reply({ content: `Hello there${getGender}! I've sent you a private message with further details on this.`, ephemeral: true, components: [] });

        // Send DM to user
        await interaction.user.send({ content: `Hello${getGender}! At this moment the best way to support our community is through boosts.\nKeep an eye on future updates if you wish to show your support through different avenues.\n\nThank you!`, components: [] });
    }
}