const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is online!`);
        setInterval(function () {
            client.user.setActivity(config.status[Math.floor(Math.random() * config.status.length)], { type: 'STREAMING', url: config.urls['twitch'] });
        }, 5 * 1000);
    },
};