const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { bass } = require('./config/filter.js')

module.exports = { 
    config: {
        name: "bass",
        description: "Turning on bass filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Bass**. This may take a few seconds...");

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to play music.");

        player.setFilter('filters', bass);

        const bassed = new MessageEmbed()
            .setAuthor("Turned on: Bass", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit('', bassed);
            console.log(chalk.magenta(`  [Command]: Bass used by ${message.author.tag} from ${message.guild.name}`));
   }
};