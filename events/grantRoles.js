const { guild, roles } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        if (interaction.isSelectMenu()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await client.guilds.cache.get(guild);
                let getMember = await getGuild.members.fetch(userId);
                
                // Handle ping roles
                if (interaction.customId === 'get_roles_pings') {
                    await interaction.reply({ content: `You have been granted the selected roles.`, ephemeral: true, components: [] });

                    // Remove all ping roles to prep the user when they re-select
                    for (let x in roles.pings) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === roles.pings[x]['id']);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add selected roles to user
                    for (let y of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === roles.pings[y]['id']);
                        await getMember.roles.add(getRoles);
                    }
                }
            } catch(error) {
                console.error(error);
            }
        }
    }
}