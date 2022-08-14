const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    name: "search",
    category: "Music",
    description: "plays music from query",
    usage: "search <query>",
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {

        let queue = SynthBot.manager.getQueue(message.guild.id);
        
        if (!message.member.voice.channelId) {
            const embed = new EmbedBuilder()
            .setDescription("You Are Not Connected To A Voice Channed!")
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }
    
        if (queue && queue.connection.channel.id !== message.member.voice.channelId) {
            const embed = new EmbedBuilder()
            .setDescription(`I'm Already Connected To <#${queue.connection.channel.id}> Voice Channel, I Can't Betray <#${queue.connection.channel.id}>!`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }
    
        if (!queue) {
            const vc = message.member.voice.channel;
            queue = await SynthBot.manager.createQueue(message.guildId, {
                leaveOnEnd: false,
                leaveOnStop: false,
                initialVolume: 80,
                bufferingTimeout: 200,
                metadata: {
                    guild: message.guild.id,
                    channel: message.channel.id
                }
            })
            if (!queue.connection) queue.connect(vc)
        }
    
        const searchquery = args.join(" ");
    
        if (!searchquery) {
            const embed = new EmbedBuilder()
            .setDescription(`You Need To Provide Me Song Query, To Search The Track!`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }
    
        const song = await SynthBot.manager.search(searchquery, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        
        await message.reply({ embeds: [new EmbedBuilder().setColor("Random").setDescription(`Searching for **${searchquery}**`)]}).then((msg) =>{
    
            if (!song || !song.tracks.length) return message.reply({ content: 'No results were found!' });
            
            try {
                const searched = new EmbedBuilder()       
                .setDescription("Select the track you want to add to the queue by the menu below.")
                .setColor("Random");
    
                const menu = new SelectMenuBuilder()
                .setCustomId('menu')
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder(`Click here to choose a track`)
                .addOptions([
                    {
                        label: `${song.tracks[0].title}`,
                        value: "search_one"
                    },
                    {
                        label: `${song.tracks[1].title}`,
                        value: "search_two"
                    },
                    {
                        label: `${song.tracks[2].title}`,
                        value: "search_three"
                    },
                    {
                        label: `${song.tracks[3].title}`,
                        value: "search_four"
                    },
                    {
                        label: `${song.tracks[4].title}`,
                        value: "search_five",
                    }
                ])
        
                const menu2 = new SelectMenuBuilder()
                .setCustomId('menu2')
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder(`Interaction disabled`)
                .setDisabled(true)
                .addOptions([
                    {
                        label: `Interaction disabled`,
                        description: `Interaction disabled`,
                        value: "Interaction disabled"
                    }
                ])
        
                const row = new ActionRowBuilder()
                .addComponents(menu)
        
                const row2 = new ActionRowBuilder()
                .addComponents(menu2)
        
                msg.edit({embeds: [searched], components: [row] });
        
                const search = new EmbedBuilder()
                .setColor("Random");
                
                const collector = msg.createMessageComponentCollector({
                    filter: (interaction) => {
                        if (interaction.user.id === message.author.id) {
                            return true;
                        } else {
                            interaction.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this help menu, if you want to use it then you have to run the help command again.`});
                            return false;
                        };
                    },
                    max: 1,
                    time : 60000,
                    idle: 60000
                });
    
                collector.on("end", async () => {
                    if (msg) return msg.edit({ components: [row2] })
                })
        
                collector.on("collect", async (interaction) => {
                    const playlist = SynthBot.emoji.playlist;
                    if (!interaction.deferred) interaction.deferUpdate().catch(() => {})
                    const selected = interaction.values[0]
                    if (selected === "search_one") {
                        queue.addTrack(song.tracks[0]);
                        if (!queue.playing) queue.play();
          
                        if(msg) return msg.edit({embeds: [search.setDescription(`${playlist} Queued [${song.tracks[0].title}](${song.tracks[0].url})`)]})
                    }
                    if (selected === "search_two") {
                        queue.addTrack(song.tracks[1]);
                        if (!queue.playing) queue.play();
          
                        if (msg) return msg.edit({embeds: [search.setDescription(`${playlist} Queued [${song.tracks[1].title}](${song.tracks[1].url})`)]})
                    }
                    if (selected === "search_three") {
                        queue.addTrack(song.tracks[2]);
                        if (!queue.playing) queue.play();
        
                        if (msg) return msg.edit({embeds: [search.setDescription(`${playlist} Queued [${song.tracks[2].title}](${song.tracks[2].url})`)]})
                    }
                    if (selected === "search_four") {
                        queue.addTrack(song.tracks[3]);
                        if (!queue.playing) queue.play();
          
                        if (msg) return msg.edit({embeds: [search.setDescription(`${playlist} Queued [${song.tracks[3].title}](${song.tracks[3].url})`)]})
                    }
                    if (selected === "search_five") {
                        queue.addTrack(song.tracks[4]);
                        if (!queue.playing) queue.play();
        
                        if (msg) return msg.edit({embeds: [search.setDescription(`${playlist} Queued [${song.tracks[4].title}](${song.tracks[4].url})`)]})
                    }
                })  
            } catch (e) {
                console.log(e)
                return message.reply({ content: `Can't Load The Track` })
            }
        })
    }
}