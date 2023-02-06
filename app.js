const { Client, GatewayIntentBits } = require('discord.js');
const ffmpeg = require("ffmpeg");
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
require('dotenv/config');
const player = createAudioPlayer();
var isready = true;






const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('ready', () => {
    console.log('The bot is ready');
});

client.on('messageCreate', message => {
    if (isready == true && message.content === '/shockem') {

        isready = false;


        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: false
        })



        connection = getVoiceConnection(message.channel.guild.id);
        connection.subscribe(player);
        const resource = createAudioResource('./audiofile.mp3', { inlineVolume: true });
        
        //resource.volume.setVolumeDecibels(30);
        resource.volume.setVolume(0.5);
        player.play(resource);
        message.reply('WRONG');
        
        
        setTimeout(() => connection.destroy(), 1_400);
        isready == false;
        setTimeout(() => isready = true, 1_450);
    }


});




client.login(process.env.TOKEN);