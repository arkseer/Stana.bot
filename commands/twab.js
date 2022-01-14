const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, core_roles, genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twab')
        .setDescription('Posts the weekly twab in the specific text channel')
        .setDefaultPermission(true)
        .addStringOption(option => option
                .setName('link')
                .setDescription('Requires bung.ie/<link> or bungie.net/<link>')
                .setRequired(true)),
    async execute(interaction, client) {
        let getFounder = interaction.member.roles.cache.some(role => role.id === core_roles['founder']);
        let getAdmin = interaction.member.roles.cache.some(role => role.id === core_roles['admin']);

        let getGender;
        if (interaction.member.roles.cache.some(role => role.id === genders['male'])) {
            getGender = ", sir";
        } else if (interaction.member.roles.cache.some(role => role.id === genders['female'])) {
            getGender = ", ma'am";
        } else {
            getGender = "";
        }

        if (getAdmin || getFounder) {
            await interaction.reply({ content: `twab`, ephemeral: true, components: [] });
        } else {
            await interaction.reply({ content: `I'm sorry${getGender}! But you don't have permissions to use this command.`, ephemeral: true, components: [] });
        }
    }
}