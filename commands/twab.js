const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, core_roles, genders, bungie_links } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twab')
        .setDescription('Posts the weekly twab in the specific text channel')
        .setDefaultPermission(true)
        .addStringOption(option => option
                .setName('twab_link')
                .setDescription('Requires bung.ie/<link> or bungie.net/<link>')
                .setRequired(true)),
    async execute(interaction, client) {
        let getFounder = interaction.member.roles.cache.some(role => role.id === core_roles['founder']);
        let getAdmin = interaction.member.roles.cache.some(role => role.id === core_roles['admin']);

        let getLink = interaction.options.getString('twab_link');

        let getGender;
        if (interaction.member.roles.cache.some(role => role.id === genders['male'])) {
            getGender = ", sir";
        } else if (interaction.member.roles.cache.some(role => role.id === genders['female'])) {
            getGender = ", ma'am";
        } else {
            getGender = "";
        }

        if (getAdmin || getFounder) {
            if (getLink.includes(bungie_links['short']) || getLink.includes(bungie_links['long'])) {
                await interaction.reply({ content: `twab: ${getLink}`, ephemeral: true, components: [] });
            } else {
                await interaction.reply({ content: `I'm terribly sorry${getGender}. But you need to provide me with a valid link to the twab.`, ephemeral: true, components: [] });
            }
            
        } else {
            await interaction.reply({ content: `I'm terribly sorry${getGender}! But you don't have permissions to use this command.`, ephemeral: true, components: [] });
        }
    }
}