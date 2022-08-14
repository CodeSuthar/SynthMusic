const { EmbedBuilder, Collection } = require("discord.js");
const dbprefix = require("../../Database/prefix.js");

module.exports = {
    name: "messageCreate",
    run: async (SynthBot, message) => {
        if (!message.guild || !message.channel || !message.id || message.author.bot) return;
        let prefix = SynthBot.runfix;
        const channel = message?.channel;
        const ress =  await dbprefix.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;
        const mentionedtheSynthBot = new RegExp(`^<@!?${SynthBot.user.id}>( |)$`);
        if (message.content.match(mentionedtheSynthBot)) {
            const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**Hey It's Me Yuvi, A Opensource Music Bot, Try Me Using Prefix \`${prefix}\`**`);
            message.channel.send({embeds: [embed]})
        }
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${SynthBot.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [ matchedPrefix ] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        let command = SynthBot.commands.get(cmd);
        if (!command) command = SynthBot.commands.get(SynthBot.aliases.get(cmd));
    
        if (command) {
            if (onCoolDown(message, command)) {
                return message.reply({
                    embeds: [new EmbedBuilder().setColor("RED").setFooter({ text: "You Are On Cooldown" }).setTitle(`❌ Please wait ${onCoolDown(message, command)} more Second(s) before reusing the \`${command.name}\` command.`).setTimestamp()]
                });
            };

            try {
                if (command.owner && !SynthBot.config.OwnerId.includes(message.author.id)) {
                    return message.reply({ content: `Im, Not A Fool Bot, Only Owner Can Use This Commands` })
                }
                command.execute(message, args, SynthBot, prefix);
            } catch (e) {
                console.log(e);
                const embed = new EmbedBuilder()
                .setDescription("There Was An Error Executing The Command, Sorry For The Inconvenience \`<3\`");
                return message.reply({ embeds: [embed] });
            }
        }
    }
};

function onCoolDown(message, command) {
    if (!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if (!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
    const client = message.client;
    if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now(); //get the current time
    const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
    const cooldownAmount = (command.cooldown || 1.5) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
    if (timestamps.has(message.member.id)) { //if the user is on cooldown
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) { //if he is still on cooldonw
        const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            //return true
            return timeLeft
        }
    } else {
        //if he is not on cooldown, set it to the cooldown
        timestamps.set(message.member.id, now); 
        //set a timeout function with the cooldown, so it gets deleted later on again
        setTimeout(() => timestamps.delete(message.member.id), cooldownAmount); 
        //return false aka not on cooldown
        return false;
    }
}
//Cooldown By Tomato