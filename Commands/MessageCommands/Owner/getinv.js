module.exports = {
    name: 'getinv',
    category: 'Owner',
    description: 'Get The Invite Link Of A Server',
    owner: true,
    execute: async (message, args, SynthBot, prefix) => {
        let guild = null;

        if (!args[0]) return message.channel.send("Enter Guild Name or Guild ID of where you want Invite Link.")

        if(args[0]){
            let fetched = SynthBot.guilds.cache.find(g => g.name === args.join(" "));
            let found = SynthBot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("That's the Invalid Guild Name");
        }
        if(guild){
            let text;
            guild.channels.cache.forEach(c => {
              if (c.type === "GUILD_TEXT" && !text) text = c;
            });
            let invite = await text.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - I'm not in that Server.`);
        }
    }

}