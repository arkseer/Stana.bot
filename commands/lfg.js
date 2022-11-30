const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, ChannelType } = require('discord.js');
const { guild } = require('../config.json');
const { lfg, lfg: { game: { valorant } }, lfg: { game: { valorant: { modes } } }, lfg: { game: { valorant: { ranks } } } } = require('../scripts/lfg.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create an LFG post')
        .addSubcommand(subcommand => subcommand
            .setName(valorant.name)
            .setDescription(`Create an LFG post for ${valorant.label}`)
            .addStringOption(option => option
                .setName('mode')
                .setDescription('Select the game mode you will be playing')
                .setRequired(true)
                .addChoice(modes.ranked.label, modes.ranked.name)
                .addChoice(modes.unrated.label, modes.unrated.name)
                .addChoice(modes.custom.label, modes.custom.name)
                .addChoice(modes.faceit.label, modes.faceit.name)
                .addChoice(modes.other.label, modes.other.name))
            .addIntegerOption(option => option
                .setName('players')
                .setDescription(`Select the number of people you are trying to recruit (# between ${valorant.players.min} - ${valorant.players.max})`)
                .setMinValue(valorant.players.min)
                .setMaxValue(valorant.players.max)
                .setRequired(true))
            .addStringOption(option => option
                .setName('min-rank')
                .setDescription('Select the minimum rank you are trying to recruit')
                .setRequired(true)
                .addChoice(ranks.any.label, ranks.any.name)
                .addChoice(ranks.iron.label, ranks.iron.name)
                .addChoice(ranks.bronze.label, ranks.bronze.name)
                .addChoice(ranks.silver.label, ranks.silver.name)
                .addChoice(ranks.gold.label, ranks.gold.name)
                .addChoice(ranks.platinum.label, ranks.platinum.name)
                .addChoice(ranks.diamond.label, ranks.diamond.name)
                .addChoice(ranks.ascendant.label, ranks.ascendant.name)
                .addChoice(ranks.immortal.label, ranks.immortal.name)
                .addChoice(ranks.radiant.label, ranks.radiant.name))
            .addStringOption(option => option
                .setName('max-rank')
                .setDescription('Select the maximum rank you are trying to recruit')
                .setRequired(true)
                .addChoice(ranks.any.label, ranks.any.name)
                .addChoice(ranks.iron.label, ranks.iron.name)
                .addChoice(ranks.bronze.label, ranks.bronze.name)
                .addChoice(ranks.silver.label, ranks.silver.name)
                .addChoice(ranks.gold.label, ranks.gold.name)
                .addChoice(ranks.platinum.label, ranks.platinum.name)
                .addChoice(ranks.diamond.label, ranks.diamond.name)
                .addChoice(ranks.ascendant.label, ranks.ascendant.name)
                .addChoice(ranks.immortal.label, ranks.immortal.name)
                .addChoice(ranks.radiant.label, ranks.radiant.name))
        ),
        
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

        function lfgEmbed(game, mode, voice, currPlayers, reqPlayers, min_rank, max_rank) {
            
            const lfgPost = new MessageEmbed()
                .setAuthor({ name: `${getUser}'s squad`, url: `https://dmlc.store`, iconURL: interaction.user.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`** **`)
                .setImage('https://i.imgur.com/VrdLQAT.png')
                .addFields(
                    { name: 'Game', value: `— ${game}`, inline: true },
                    { name: 'Game mode', value: `— ${mode}`, inline: true },
                    { name: 'Voice channel', value: `— <#${voice}>`, inline: true },
                    { name: 'Players required', value: `— ${currPlayers}/${reqPlayers}`, inline: true },
                    { name: 'Minimum rank', value: `— ${min_rank}`, inline: true },
                    { name: 'Maximum rank', value: `— ${max_rank}`, inline: true },
                );

            return lfgPost;
        }

        if (getVoice) {
            console.log(`[Debugging] ${getUser} is connected to ${getVoice.name}`);
            if (getVoice.parentId === parentCategory) {
                console.log(`[Debugging] User is connected to LFG voice channel`);
                if (!getVoice.name.includes(getUser)) return

                console.log(`[Debugging] Testing if above if statement works`);
                if (interaction.options.getSubcommand() === valorant.name) {
                    let maxPlayers;

                    // Determining amount of max players based on game mode
                    if (modes.ranked) maxPlayers = modes.ranked.max_players;
                    if (modes.unrated) maxPlayers = modes.unrated.max_players;
                    if (modes.custom) maxPlayers = modes.custom.max_players;
                    if (modes.faceit) maxPlayers = modes.faceit.max_players;
                    if (modes.other) maxPlayers = modes.other.max_players;

                    if (lfgPlayers < valorant.players.min || lfgPlayers > maxPlayers) {
                        interaction.reply({ content: `${getUser}, you have to recruit at least 1 player, but no more than ${maxPlayers}.`, ephemeral: true, components: [] });
                    } else {
                        interaction.reply({ ephemeral: true, components: [], embeds: [lfgEmbed(1, 2, 3, 4, 5, "any", "any")] });
                    }
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