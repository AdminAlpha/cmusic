const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { superbass } = require('./config/filter.js');

module.exports = { 
    config: {
        name: "superbass",
        description: "Turning on bassboost filter",
        category: "filters",
        usage: "<-10 - 10>",
        accessableby: "Member",
        aliases: ["bb"]
    },

    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

		if (!args[0]) {
			player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.65 })));
			const msg1 = await message.channel.send(`Turning on **Bassboost**. This may take a few seconds...`);
			const embed = new MessageEmbed()
				.setAuthor('Turned on: Bassboost', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
                .setColor('#000001');
                
			await delay(1000);
            msg1.edit('', embed);
            return console.log(chalk.magenta(`  [Command]: BassBoost used by ${message.author.tag} from ${message.guild.name}`));
        }
        
        if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
			player.setFilter('filters', client.filters.reset);
			const msg3 = await message.channel.send(`Turning off **Bassboost**. This may take a few seconds...`);
			const embed = new Discord.MessageEmbed()
				.setDescription('Turned off: **Bassboost**', 'https://cdn.discordapp.com/emojis/758423099178745876.gif')
				.setColor(client.colors.main);
			await delay(5000);
            msg3.edit('', embed);
            return console.log(chalk.magenta(`  [Command]: BassBoost used by ${message.author.tag} from ${message.guild.name}`));
		}

		if (isNaN(args[0])) return message.channel.send('Amount must be a real number.');

		if (args[0] > 10 || args[0] < -10) {
			player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: args[0] / 10 })));
		}
		else player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: args[0] / 10 })));

		const msg2 = await message.channel.send(`Setting **Bassboost** to **${args[0]}dB**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor(`Bassboost set to: ${args[0]}`, 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');
            
		await delay(5000);
        msg2.edit('', embed);
        return console.log(chalk.magenta(`  [Command]: BassBoost used by ${message.author.tag} from ${message.guild.name}`));
	}
};