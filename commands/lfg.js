const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, ChannelType } = require('discord.js');
const { guild } = require('../config.json');
const { lfg, lfg: { game: { valorant } }, lfg: { game: { valorant: { modes } } } } = require('../scripts/lfg.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post')
        .addSubcommand(subcommand => subcommand
            .setName(valorant.name)
            .setDescription(`Create an LFG post for ${valorant.label}`)
            .addIntegerOption(option => option
                .setName('players')
                .setDescription(`Select the number of people you are trying to recruit (# between ${valorant.players.min} - ${valorant.players.max})`)
                .setMinValue(valorant.players.min)
                .setMaxValue(valorant.players.max)
                .setRequired(true))
            .addStringOption(option => option
                .setName('mode')
                .setDescription('Select the game mode you will be playing')
                .setRequired(true)
                .addChoice(modes.ranked.label, modes.ranked.name)
                .addChoice(modes.unrated.label, modes.unrated.name)
                .addChoice(modes.custom.label, modes.custom.name)
                .addChoice(modes.faceit.label, modes.faceit.name)
                .addChoice(modes.other.label, modes.other.name))),
        
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const parentCategory = "1038643441002889346";
        let getChannel = interaction.client.channels.cache.get("1039259788640530473");
        let getMember = interaction.member;
        let getUser = interaction.member.displayName;
        let getVoice = getMember.voice.channel;

        let lfgPlayers = interaction.options.getInteger('players');
        let lfgMode = interaction.options.getString('mode');

        console.log(`[Test] ${lfg.game.valorant.modes.label}: ${valorant.label}`);

        function lfgEmbed() {
            const lfgPost = new MessageEmbed()
                .setAuthor({ name: getUser, url: '', iconURL: interaction.user.displayAvatarURL() })
                .setColor('cf889f')
                .setTitle(`Title here: xxxx`)
                .setDescription(`Generic description goes here`)
                .addFields(
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                );

            return lfgPost;
        }

        if (getVoice) {
            console.log(`[Debugging] ${getUser} is connected to ${getVoice.name}`);
            if (getVoice.parentId === parentCategory) {
                console.log(`[Debugging] User is connected to LFG voice channel`);
                if (!getVoice.name.includes(getUser)) return

                console.log(`[Debugging] Testing if above if statement works`);
                if (lfgPlayers < valorant.players.min || lfgPlayers > valorant.players.max) {
                    interaction.reply({ content: `${getUser}, you have to recruit at least 1 player, but no more than 9.`, ephemeral: true, components: [] });
                } else {
                    interaction.reply({ ephemeral: true, components: [], embeds: [lfgEmbed()] });
                }
                //interaction.reply({ content: `Players: ${lfgPlayers}\nGame mode: ${lfgMode}`, ephemeral: true, components: [] });
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