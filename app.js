require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const prefix = process.env.PREFIX
const badWords = ['Bitch', 'fuck', 'shit', 'damn', 'goddamn', 'goddamnit', 'dam', 'damm', 'dammit', 'goddammit', 'pussy', 'hoe', 'whore', 'hore', 'golly', 'gee', 'darn', 'darnit', 'goddarnit', 'gosh', 'goshdarnit', 'nigger', 'nigga', 'chink']

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('Client ready')
    const guilds = client.guilds.cache
    let initialMembers = 0
    guilds.forEach((guild) => {
        initialMembers += guild.memberCount
    })
    client.user.setActivity(`your every move`, {
            type: 'WATCHING'
        })
        .then(presence => console.log(`Watching ${presence.activities[0].name}`))
})

client.on('message', async message => {

    const checkInput = (input, words) => {
        return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
    }
       
    if (checkInput(message.content, badWords)) {
        message.reply('no swearing on my christian minecraft server')
    }

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (e) {
        console.error(e)
        message.reply('there was an error trying to execute that command!')
    }
})

client.login(process.env.TOKEN);