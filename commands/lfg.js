const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant'),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const parentCategory = "1038643441002889346";
        let getChannel = interaction.client.channels.cache.get("1039259788640530473");
        let getUser = interaction.member.displayName;

        interaction.reply({ content: `Voice channel created.`, ephemeral: true, components: [] });
        await wait(1000);
        const newChannel = interaction.guild.channels.create(`${getUser}'s squad`, { 
            type: 'GUILD_VOICE',
            parent: parentCategory,
            userLimit: 5
         })
            .then(id => interaction.editReply({ content: `Your voice channel: ${id}`, ephemeral: true, components: [] }))
            .catch(console.error);
            
        //console.log(getChannel);
        //console.log(newChannel);
        //interaction.editReply({ content: `Your voice channel: ${newChannel} <#${newChannel}>`, ephemeral: true, components: [] });
        //interaction.editReply({ content: `` })
    }
}