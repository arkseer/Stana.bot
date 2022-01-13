const { guild, core_roles, genders, roles_channel_id } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await client.guilds.cache.get(guild);
                let getMember = await getGuild.members.fetch(userId);
                let getGender;

                // Check for gender roles to address the user properly
                if (getMember.roles.cache.some(role => role.id === genders['male'])) {
                    getGender = ", sir";
                } else if (getMember.roles.cache.some(role => role.id === genders['female'])) {
                    getGender = ", ma'am";
                } else {
                    getGender = "";
                }

                // Handle community default role
                if (interaction.customId === 'user_agreement_btn') {
                    await interaction.reply({ content: `Great stuff${getGender}!\n\nPlease drop by <#${roles_channel_id}> and pick up any additional roles you may need to access other sections of the server.`, ephemeral: true, components: [] });

                    // Add default role to user
                    let getRole = getGuild.roles.cache.find(role => role.id === core_roles['c_members']);
                    await getMember.roles.add(getRole);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}