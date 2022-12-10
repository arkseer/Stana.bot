const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            try {
                const getBot = await interaction.guild.members.fetch(bot);
                // code goes here
                if (interaction.customId === 'apply_cc') {
                    function applyEmbed() {
                        const embedDescription = `description goes here`;
                        const applyPost = new MessageEmbed()
                            .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                            .setColor('cf889f')
                            .setDescription(embedDescription)
                            .setImage('https://i.imgur.com/tGSh027.png');
                        
                        return applyPost;
                    }
                    
                    await interaction.reply({ ephemeral: true, components: [], embeds: [applyEmbed()] });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}