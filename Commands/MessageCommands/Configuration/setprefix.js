const { EmbedBuilder } = require("discord.js");
const db = require("../../../Database/prefix.js");

//SetPrefix By BrBlacky

module.exports = {
    name: "setprefix",
    category: "Configuration",
    description: "Set Custom Prefix",
    usage: "setprefix <prefix to set>",
    aliases: ["prefix"],
    execute: async (message, args, SynthBot, prefix) => {
    
        const data = await db.findOne({ Guild: message.guildId});
        const pre = await args.join(" ")
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply(`Hey Buddy, I need \`MANAGE_GUILD Or ADMINISTRATOR\` permissions to execute this command!`);
        if (!pre[0]) {
        const embed = new EmbedBuilder()
            .setDescription("Please give the prefix that you want to set!")
            .setColor("Random")
            return message.reply({ embeds: [embed] });
        }
    
        if (pre[0].length > 5) {
            const embed = new EmbedBuilder()
            .setDescription("You can not send prefix more than 5 characters")
            .setColor("Random")
            return message.reply({ embeds: [embed] });
        }
    
        if (data) {
            data.Prefix = pre;
            await data.save()
            const update = new EmbedBuilder()
            .setDescription(`Your prefix has been updated to **${pre}**`)
            .setColor("Random")
            .setTimestamp()
            return message.reply({embeds: [update]});
        } else {
            const newData = new db({
                Guild : message.guildId,
                Prefix : pre
            });
            await newData.save()
            const embed = new EmbedBuilder()
            .setDescription(`Custom prefix in this server is now set to **${pre}**`)
            .setColor("Random")
            .setTimestamp()
            return message.reply({embeds: [embed]});
        }
    }
};
