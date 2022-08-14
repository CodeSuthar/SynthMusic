const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require("quick.db")

module.exports = async (SynthBot) => {
    SynthBot.manager.on("trackStart", async (queue, track) => {
        const queuedata = queue.metadata;
        const Guild = SynthBot.guilds.cache.get(queuedata.guild)
        if (!Guild) return;
        const Channel = Guild.channels.cache.get(queuedata.channel)
        if (!Channel) return;

        const MusicPlaying = new EmbedBuilder()
        .setAuthor({ name: "Now Playing", iconURL: "https://c.tenor.com/B-pEg3SWo7kAAAAi/disk.gif" })
        .setDescription(`**Now Playing** - *[${track.title}](${track.url})* - \`${track.duration}\``)
        .setFooter({ text: `Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
        .setColor("Random")

        const But1 = new ButtonBuilder().setCustomId("volumedown").setEmoji("🔉").setStyle("Primary");

        const But2 = new ButtonBuilder().setCustomId("stop").setEmoji("⏹️").setStyle("Secondary");

        const But3 = new ButtonBuilder().setCustomId("pause").setEmoji("⏸️").setStyle("Primary");

        const But4 = new ButtonBuilder().setCustomId("skip").setEmoji("⏭️").setStyle("Secondary");

        const But5 = new ButtonBuilder().setCustomId("volumeup").setEmoji("🔊").setStyle("Primary");

        const row = new ActionRowBuilder().addComponents(But1, But2, But3, But4, But5)

        let id;

        const msg = Channel.send({ embeds: [MusicPlaying], components: [row] }).then((msg) => {
            id = msg.id
            db.set(`np_${Guild.id}`, msg.id)
        })
        const collector = Channel.createMessageComponentCollector({
            filter: (interaction) => {
                if (queue && queue.connection.channel.id === interaction.member.voice.channelId) {
                    return true;
                } else {
                    interaction.reply({ content: `You are not connected to <#${queue.connection.channel.id}> to use this buttons.`, ephemeral: true });
                    return false;
                };
            },
            time: track.durationMS,
        });

        collector.on("collect", async (interaction) => {

            if (interaction.customId === "volumedown") {
            let amount = Number(queue.volume) - 10;

                if (amount === -10 || amount < 0) {
                    const embed = new EmbedBuilder()
                    .setDescription(`Player Volume Limit Is Between 0 And 100!`)
                    .setColor("Random")
                    interaction.reply({ embeds: [embed], ephemeral: true }) 
                } else {     
                    let embed;
                              
                    if (amount === 0) {
                        embed = new EmbedBuilder()
                        .setDescription("Player Have Been Muted Sucessfully")
                    } else {
                        embed = new EmbedBuilder()
                        .setDescription(`${SynthBot.emoji.volumedown} Player Volme Has Been Set To ${amount}`)
                    }
          
                    await queue.setVolume(amount);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } else {
                if (interaction.customId === "volumeup") {
                    let amount = Number(queue.volume) + 10;

                    if (amount === 110 || amount > 100) {
                        const embed = new EmbedBuilder()
                        .setDescription(`Player Volume Limit Is Between 0 And 100!`)
                        .setColor("Random")
                        interaction.reply({ embeds: [embed], ephemeral: true }) 
                    } else {
                        await queue.setVolume(amount);
                        interaction.reply({ embeds: [new EmbedBuilder().setColor("Random").setDescription(`${SynthBot.emoji.volumeup} Set the volume to: **${amount}**`)], ephemeral: true });
                    }
                } else {
                    if (interaction.customId === "stop") {
                        if (!queue.nowPlaying()) {
                            const embed = new EmbedBuilder()
                            .setDescription(`There's No Player Playing In The Guild`)
                            .setColor("Random")
                            interaction.reply({ embeds: [embed], ephemeral: true })  
                        } else {
                            const embedend = new EmbedBuilder()
                            .setTitle("Seems... Like Track Has Been Ended")
                            .setDescription(`*[${track.title}](${track.url})* - Track Has Been **Ended**`)
                            .setFooter({ text: `Track Was Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
                            .setColor("Random")

                            const But1 = new ButtonBuilder()
                            .setCustomId("volumedown")
                            .setEmoji("🔉")
                            .setStyle("Primary")
                            .setDisabled(true)
            
                            const But2 = new ButtonBuilder()
                            .setCustomId("stop")
                            .setEmoji("⏹️")
                            .setStyle("Secondary")
                            .setDisabled(true)
            
                            const But3 = new ButtonBuilder()
                            .setCustomId("pause")
                            .setEmoji("⏸️")
                            .setStyle("Primary")
                            .setDisabled(true)
            
                            const But4 = new ButtonBuilder()
                            .setCustomId("skip")
                            .setEmoji("⏭️")
                            .setStyle("Secondary")
                            .setDisabled(true)
                
                            const But5 = new ButtonBuilder()
                            .setCustomId("volumeup")
                            .setEmoji("🔊")
                            .setStyle("Primary")
                            .setDisabled(true)
                
                            const row = new ActionRowBuilder().addComponents(But1, But2, But3, But4, But5);
      
                            await Channel.messages.edit(id, {
                                embeds: [embedend],
                                components: [row]
                            })
                
                            if (queue.tracks.length) queue.clear(); //there is a bug if we stop the queue it will delete the queue and we can't use leave cmd after that because the queue has been destroyed
                            if (queue.playing) queue.skip(); //so clearing the queue than skipping it will work like stop 
                            interaction.reply({ embeds: [new EmbedBuilder().setColor("Random").setTimestamp().setDescription(`The Player Has Been Stopped`)], ephemeral: true });
                            collector.stop()
                        }    
                    } else {
                        if (interaction.customId === "pause") {
                            let Action;
                            if (!queue.connection.paused) {
                                queue.setPaused(true);
                                Action = `**Paused**`
                            } else {
                                queue.setPaused(false);
                                Action = `**Resumed**`
                            }
        
                            interaction.reply({ embeds: [new EmbedBuilder().setColor("Random").setTimestamp().setDescription(`The Player Has Been ${Action}`)], ephemeral: true });
                        } else {
                            if (interaction.customId === "skip") {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: "Skipped The Track" })
                                .setDescription(`Skipped - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
                                .setColor("Random")
                                interaction.reply({ embeds: [embed], ephemeral: true })
                                queue.skip();
                            }
                        }
                    }
                }
            }
        })
    });
}