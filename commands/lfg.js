const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, ChannelType } = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post for Valorant')
        .addStringOption(option => option
            .setName('game')
            .setDescription('Select the game you want to create the LFG post for')
            .setRequired(true)
            .addChoice('Valorant', 'lfg_game_valorant'))
        .addIntegerOption(option => option
            .setName('players')
            .setDescription('Select the number of people you are trying to recruit (# between 1-9)')
            .setMinValue(1)
            .setMaxValue(9)
            .setRequired(true))
        .addStringOption(option => option
            .setName('mode')
            .setDescription('Select the game mode you will be playing')
            .setRequired(true)
            .addChoice('Ranked', 'lfg_va_ranked')
            .addChoice('Unrated', 'lfg_va_unrated')
            .addChoice('Custom', 'lfg_va_custom')
            .addChoice('Faceit', 'lfg_va_faceit')
            .addChoice('Other', 'lfg_va_other')),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const parentCategory = "1038643441002889346";
        let getChannel = interaction.client.channels.cache.get("1039259788640530473");
        let getMember = interaction.member;
        let getUser = interaction.member.displayName;
        let getVoice = getMember.voice.channel;

        let lfgGame = interaction.options.getString('game');
        let lfgPlayers = interaction.options.getInteger('players');
        let lfgMode = interaction.options.getString('mode');

        if (getVoice) {
            console.log(`[Debugging] ${getUser} is connected to ${getVoice.name}`);
            if (getVoice.parentId === parentCategory) {
                console.log(`[Debugging] User is connected to LFG voice channel`);
                if (!getVoice.name.includes(getUser)) return

                console.log(`[Debugging] Testing if above if statement works`);
                if (lfgPlayers < 1 || lfgPlayers > 9) {
                    interaction.reply({ content: `You have to recruit at least 1 player, but no more than 9.`, ephemeral: true, components: [] });
                }
                //interaction.reply({ content: `Game: ${lfgGame}\nPlayers: ${lfgPlayers}\nGame mode: ${lfgMode}`, ephemeral: true, components: [] });
            } else {
                console.log(`[Debugging] User is not connected to LFG voice channel`);
            }
        } else {
            console.log(`[Debugging] ${getUser} is not connected to any voice channels`);
        }


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