const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, ChannelType } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant')
        .addRoleOption(option => option
            .setName('min_rank')
            .setDescription('Minimum rank you want to recruit'))
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('The channel you want to mention')),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const parentCategory = "1038643441002889346";
        let getChannel = interaction.client.channels.cache.get("1039259788640530473");
        let getUser = interaction.member.displayName;



        /*

        function lfgEmbed(voiceChannel) {
            voiceChannel = voiceChannel.toString().replace(/[^0-9]/g, "");
            const lfgPost = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, url: 'https://dmlc.store', iconURL: interaction.user.displayAvatarURL() })
            .setTitle(`Title: ${voiceChannel}`)
            .setDescription(`[Voice channel](https://discordapp.com/channels/${guild}/${voiceChannel})`);

            return lfgPost;
        }

        const lfgPost = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, url: 'https://dmlc.store', iconURL: interaction.user.displayAvatarURL() })
            .setTitle("Title");

        interaction.reply({ content: `Voice channel created.`, ephemeral: true, components: [] });
        await wait(1000);
        const newChannel = interaction.guild.channels.create(`${getUser}'s squad`, { 
            type: 'GUILD_VOICE',
            parent: parentCategory,
            userLimit: 5
         })
            .then(id => {
                interaction.editReply({ content: `Your voice channel: ${id}`, ephemeral: true, components: [], embeds: [lfgEmbed(id)] })
            })
            .catch(console.error);

        */
    }
}