const { ErelaClient, Utils } = require("erela.js");
const { Collection, MessageEmbed } = require("discord.js");
const figlet = require('figlet');
const chalk = require('chalk');
const { nodes, prefix } = require("../../config.json");

module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setActivity("Music", {
    type: "LISTENING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};

