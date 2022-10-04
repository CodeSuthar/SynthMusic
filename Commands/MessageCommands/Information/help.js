const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    description: "to see the commands",
    usage: "!help and !help [command]",
    execute: async (message, args, SynthBot, prefix) => {
        
        let query = args.join(" ");
    
        if (query) {
            const command = SynthBot.commands.get(query)
            if (command) {
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${query} command information`,  iconURL: SynthBot.user.displayAvatarURL({ dynamic: true }) })
                .setColor("Random")
                .addFields(
                  { name: `\u200b`, value: `\`\`\`diff\n- [] = optional argument\n\n- <> = required argument\n\n- Do NOT type these when using commands!\`\`\`` },
                  { name: `Name:`, value: `\`\`\`${command.name}\`\`\`` },
                  { name: `Category:`, value: `\`\`\`${command.category}\`\`\``, inline: true },
                  { name: `Description:`, value: `\`\`\`${command.description}\`\`\``, inline: true },
                  { name: `Usage:`, value: `\`\`\`${command.usage}\`\`\``, inline: true },
                )
                return message.reply({ embeds: [embed] })
            } else {
              return message.reply({ content: `You Need To Give A Valid Command To Get Information.` })
            }
        }

        const home = SynthBot.emoji.home;
        const info = SynthBot.emoji.info;
        const music = SynthBot.emoji.queue;
        const config = SynthBot.emoji.gear;
        const owner = SynthBot.emoji.owner;
    
        const helpembed = new EmbedBuilder()
        .setTitle(`${SynthBot.user.username}'s Help Page`)
        .setColor("Random")
        .setDescription(`**Hey <@${message.author.id}> 👋, I'm <@${SynthBot.user.id}> , A cool 😎 and music bot with Awesome Features to enhance your mood with more easier way. Find out what I can do using the Dropdown Menu below.**`)
        .addFields(
            { name: "___Commands Categories are Listed Below___",  value: `${config} \`:\`   **Configuration**\n${info}  \`:\` **Information**\n${owner}  \`:\` **Owner-Only Command**\n${music}  \`:\` **Music**\n\n • *Select Category From Below Menu*`}
        )
        .setThumbnail(SynthBot.user.displayAvatarURL())
        .setFooter({ text: `Helping You Is My Pleasure <3`, iconURL: SynthBot.user.displayAvatarURL() })
        .setTimestamp()
    
        const menu = new SelectMenuBuilder()
        .setCustomId('menu')
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder(`Scroll The Help Menu!`)
        .addOptions([
            {
                label: "Home",
                description: "Home Page Of Help Menu",
                value: "Home",
                emoji: home
            },
            {
                label: "Configuration",
                description: "Shows Configuration Command To Change Configuration Of SynthMusic",
                value: "Config",
                emoji: config
            },
            {
                label: "Information",
                description: "Show Information Commands",
                value: "Info",
                emoji: info
            },
            {
                label: "Owner-Only",
                description: "Show Owner-Only Commands",
                value: "Owner",
                emoji: owner
            },
            {
                label: "Music",
                description: "Show Music Commands",
                value: "Music",
                emoji: music
            }
        ])
        
        const Ended = new SelectMenuBuilder()
        .setCustomId('menu')
        .setDisabled(true)
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder(`HelpMenu Has Been Expired!`)
        .addOptions([
            {
                label: "Can't Use It Lol",
                description: "Disabled",
                value: "disabled",
            },
        ])
        
        const row = new ActionRowBuilder()
        .addComponents(menu)
        
        const row2 = new ActionRowBuilder()
        .addComponents(Ended)
        
        const msg = await message.reply({ embeds: [helpembed], components: [row] });
        
        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            else return interaction.reply({
                content: `:x: **Only ${message.author.tag} can use this interaction!**`,
                ephemeral: true,
            });
        };
    
        const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 60000,
            idle: 60000 / 2,
        });
    
        collector.on("collect", (interaction) => {
            if (!interaction.deferred) interaction.deferUpdate();
            const selectedmenu = interaction.values[0];
            let _commands;
            let editEmbed = new EmbedBuilder().setColor("Random");

            if (selectedmenu === 'Home') {
                msg.edit({ embeds: [helpembed] })
            }
      
            if (selectedmenu === 'Config') {
                _commands = SynthBot.commands.filter((x) => x.category && x.category === "Configuration").map((x) => `\`${x.name}\``);
                editEmbed.setDescription(_commands.join(", ")).setTitle("Configuration Commands").setFooter({text: `Total ${_commands.length} Configuration Commands.`})
                msg.edit({ embeds: [editEmbed] })
            }

            if (selectedmenu === 'Info') {
                _commands = SynthBot.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
                editEmbed.setDescription(_commands.join(", ")).setTitle("Information Commands").setFooter({text: `Total ${_commands.length} Information Commands.`})
                msg.edit({ embeds: [editEmbed] })
            }

            if (selectedmenu === 'Owner') {
                _commands = SynthBot.commands.filter((x) => x.category && x.category === "Owner").map((x) => `\`${x.name}\``);
                editEmbed.setDescription(_commands.join(", ")).setTitle("Owner-Only Commands").setFooter({text: `Total ${_commands.length} Owner-Only Commands.`})
                msg.edit({ embeds: [editEmbed] })
            }

            if (selectedmenu === 'Music') {
                _commands = SynthBot.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
                editEmbed.setDescription(_commands.join(", ")).setTitle("Music Commands").setFooter({text: `Total ${_commands.length} Music Commands.`})
                msg.edit({ embeds: [editEmbed] })
            }
        })
    
        collector.on("end", () => {
            if (!msg) return;
            return msg.edit({ components: [row2] })
        })
    }  
};
