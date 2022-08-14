const { EmbedBuilder } = require('discord.js');
const { post } = require('node-superfetch');

module.exports = {
    name: 'leave',
    category: 'Owner',
    aliases: ['lv'],
    description: 'Leave server',
    owner: true,
    execute: async (message, args, SynthBot, prefix) => {
   

        let guild = SynthBot.guilds.cache.get(args[0]);
        if (!guild) return message.reply({ content: 'Could not find the Guild to Leave' });

        guild.leave().then((g) => {
            message.channel.send({
                content: `Left \`${g.name} | ${g.id}\``,
            });
        })
        .catch((e) => {
            message.reply(`${e.message ? e.message : e}`, {
                code: 'js',
            });
        });
    },
};