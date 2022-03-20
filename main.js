const axios = require('axios');
const Discord = require('discord.js');
const MessageCreateAction = require('discord.js/src/client/actions/MessageCreate');
const { ExplicitContentFilterLevels } = require('discord.js/src/util/Constants');
const { customUrlToFullInfo, customUrlTosteamID64, steamID64ToCustomUrl } = require('steamid-resolver');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '!'

var server_ip = '167.114.101.98'
var server_port = 28016
var server_pass = '9ZQZ26q8sUyj63bf'

var WebSocket = require('ws')
//var ws = new WebSocket('ws://'+server_ip+':'+server_port+'/'+server_pass+'/');
var ws = new WebSocket('ws://'+server_ip+':'+server_port+'/'+server_pass);
//const url = 'wss://rcon.io/'
//const wss = new WebSocket.Server({ port: 8080 })
//const connection = new WebSocket(url)

client.once('ready', () => {
	console.log('RustWhitelist is online!');
});

ws.onopen = () => {
	console.log('WebSocket connection successful.');
}

ws.onerror = error => {
	console.log(new Date(), "WebSocket Error:", error);
}

/*ws.on('open', function open() {
	console.log('WebSocket successfully connected');
	SendMsg('find *', 1);
});*/

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'ping') {
		message.channel.send('Pong!');
	} if(command === 'wl') {
		let steam64;
		if (isValidHttpUrl(args) === false) {
			steam64 = args;
			console.log('input was a SteamID64');
		} else {
			//steam64 = getSteamIdFromUrl(args);
			console.log('input was a Steam URL, resolved to a SteamID64');
			message.channel.send('This bot does not currently support URLs. Please use your SteamID64 from **https://steamid.io/lookup/' + args + '**');
		}
		if (steam64) {
			sendRconCommand("oxide.grant user " + steam64 + " whitelist.allow");
			message.channel.send(`Whitelisted user with SteamID64: **${steam64}**`);
		}
		
	}
	
});

function sendRconCommand(msg)
{
	let cmd = String(msg)
	var packet =
	{
		Identifier: 6969,
		Message: cmd,
		Name: "Gaymer Boys"
	}
	ws.send(JSON.stringify(packet));
	console.log(packet);
}

function isValidHttpUrl(string) {
	let url;
	
	try {
	  url = new URL(string);
	} catch (_) {
	  return false;  
	}
  
	return url.protocol === "http:" || url.protocol === "https:";
}

client.login('xxxx'); // put your own token here
