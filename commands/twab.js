const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, core_roles, genders, bungie_links, http_www, twab_channel_id, dev_channel_id } = require('../config.json');

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
        let postLink;

        const wait = require('util').promisify(setTimeout);

        let getGender;
        // Check for gender roles to address the user properly
        if (interaction.member.roles.cache.some(role => role.id === genders['male'])) {
            getGender = ", sir";
        } else if (interaction.member.roles.cache.some(role => role.id === genders['female'])) {
            getGender = ", ma'am";
        } else {
            getGender = "";
        }

        // Check for permissions to allow the user to run the command
        if (getAdmin || getFounder) {
            // Check if link includes valid Bungie links
            if (getLink.includes(bungie_links['short']) || getLink.includes(bungie_links['long'])) {
                // Check if link starts with https://www.
                if (getLink.startsWith(http_www['http_www'])) {
                    postLink = getLink;
                }
                // Check if link starts with https://
                else if (getLink.startsWith(http_www['http'])) {
                    postLink = getLink;
                }
                // Check if link starts with www.
                else if (getLink.startsWith(http_www['www'])) {
                    postLink = getLink.replace(http_www['www'], http_www['http_www']);
                }
                // Else run: if link does not start with either http_www, http or www
                else {
                    postLink = http_www['http_www'].concat(getLink);
                }
                await interaction.reply({ content: `twab: ${getLink} [1]`, ephemeral: true, components: [] });
                await wait(1000);
                await interaction.channel.send({ content: `@everyone ${postLink}`, ephemeral: false, components: [] });
            }
            // Else run: if link does not include valid Bungie links
            else {
                await interaction.reply({ content: `I'm terribly sorry${getGender}. But you need to provide me with a valid link to the twab.`, ephemeral: true, components: [] });
            }

        }
        // Else run: if user does not have permissions to use the command
        else {
            await interaction.reply({ content: `I'm terribly sorry${getGender}! But you don't have permissions to use this command.`, ephemeral: true, components: [] });
        }
    }
}