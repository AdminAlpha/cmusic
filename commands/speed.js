const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { reset } = require('./config/filter.js');

module.exports = { 
    config: {
        name: "speed",
        description: "Sets the speed of the song.",
        category: "filters",
		accessableby: "Member",
		usage: '<speed>',
        aliases: []
	},
	
	run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
		if (!channel) return message.channel.send("You need to be in a voice channel to use this filter.");

		if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
			player.setFilter('filters', reset);
			const msg = await message.channel.send(`Reseting **Speed**. This may take a few seconds...`);
			const embed = new MessageEmbed()
				.setAuthor('Turned off: Speed', 'https://cdn.discordapp.com/emojis/758423099178745876.gif')
				.setColor('#000001');
			await delay(5000);
			return msg.edit('', embed);
		}

		if (isNaN(args[0])) return message.channel.send('Amount must be a real number.');
		if (args[0] < 0) return message.channel.send('Speed must be greater than 0.');
		if (args[0] > 10) return message.channel.send('Speed must be less than 10.');

		player.setFilter('filters', {
			timescale: { speed: args[0] },
		});
		const msg = await message.channel.send(`Setting **Speed** to **${args[0]}x**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor(`Speed set to: ${args[0]}x`, 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
			.setColor('#000001');
		await delay(5000);
		return msg.edit('', embed);
	}
};