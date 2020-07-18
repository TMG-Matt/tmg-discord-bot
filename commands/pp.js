const Discord = require('discord.js')

module.exports = {
    name: 'pp',
    description: 'Tells your pp size',
    execute (message) {
        let user
        let ppSize
        let size
        let ppIllust = ''
        if (message.mentions.users.first() === undefined) {
            user = message.author
        } else {
            user = message.mentions.users.first()
        }
        ppSize = Math.floor(Math.random() * 14 + 1)
        for (i = 0; i < ppSize; i++) {
            ppIllust = ppIllust.concat('=')
        }
        if (ppSize < 5) {
            size = 'small'
        } else if (ppSize < 8) {
            size = 'medium'
        } else if (ppSize < 12) {
            size = 'big'
        } else {
            size = 'huge'
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s pp`)
            .setDescription(`${user.username}'s pp is ${ppSize} inches long.\nHe has a ${size} pp.`)
            .addField('His PP', `\`\`\`\n8${ppIllust}D - - -\`\`\``)
            .setTimestamp()
            .setFooter('Gay Bot by PandaJ#1674', 'https://i.imgur.com/fPN9Sxv.png')
            
        message.channel.send(embed)
    }
}