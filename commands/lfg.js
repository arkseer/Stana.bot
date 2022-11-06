const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant'),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        interaction.reply({ content: `Voice channel created.`, ephemeral: true, components: [] });
        await wait(1000);
        interaction.guild.channels.create(`new-voice-channel`, { 
            type: 'GUILD_VOICE',
            permissionOverwrites: [
                { id: interaction.member.id, allow: [Permissions.FLAGS.CONNECT]},
            ]
         })
            .then(console.log)
            .catch(console.error);
    }
}