const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, core_roles } = require('../config.json');

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
        //let userId = interaction.user.id;
        //let getGuild = await client.guilds.cache.get(guild);
        //let getMember = await getGuild.members.fetch(userId);

        let getAdmin = interaction.member.roles.cache.some(role => role.id === core_roles['founder']);

        if (getAdmin) {
            await interaction.reply({ content: `twab`, ephemeral: true, components: [] });
        } else {
            await interaction.reply({ content: `don't have permissions`, ephemeral: true, components: [] });
        }
    }
}