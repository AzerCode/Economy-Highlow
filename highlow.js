const config = require("../../configs/config.json")
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "highlow",
    aliases: ["hl"],
    permissions: [],
    cooldown: 10,
    guildOnly: true,
    description: "Play a highlow game!",
    async execute(client, message, args, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle('HIGH-LOW GAME')
        .setColor(config.embedColor)
        .setDescription(`A random number between 1-100 has been generated.\nYour number was **${randomNumber}**\nType \`higher\` or \`lower\`.`)
        .setFooter('Is the number generated higher lower?');
        message.channel.send(embed);
        let authorID = message.author.id;
        const filter = response => {
            return response.author.id  === authorID;
        }  

        message.channel.awaitMessages(filter, { max: 1 })
        .then(async collected => {
            const response = collected.first();


            if (response.content === 'higher') {
                const randomCoins = Math.floor(Math.random() * 2000) + 1;
                const randomNumber2 = Math.floor(Math.random() * 100) + 1;

                const embed_lose = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber2}\``)
                .addField(`━━━YOU LOST━━━`,'\u200b', false)
                .setColor(0xff0000);

                const embed_win = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber2}\``)
                .addField(`━━━YOU WON━━━`, `Profit: **₿${randomCoins}**`, false)
                .setColor('GREEN');

                const embed_draw = newDiscord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber2}\``)
                .addField(`━━━━DRAW━━━━`, `Profit: **0**`, false)
                .setColor("ORANGE");

                if (randomNumber2 < randomNumber) return message.reply(embed_lose)
                if (randomNumber2 === randomNumber) return message.reply(embed_draw)
                if (randomNumber2 > randomNumber) return message.reply(embed_win)
                .then(await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc: {
                        coins: randomCoins,
                      },
                    }
                  ));
            }
            
            if (response.content === 'lower') {
                const randomCoins2 = Math.floor(Math.random() * 2000) + 1;
                const randomNumber3 = Math.floor(Math.random() * 100) + 1;

                const embed_lose2 = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber3}\``)
                .addField('\u200b', `━━━**YOU LOST**━━━`, false)
                .setColor(0xff0000);

                const embed_win3 = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber3}\``)
                .addField(`━━━YOU WON━━━`, `Profit: **₿${randomCoins2}**`, false)
                .setColor('GREEN');

                const embed_draw2 = newDiscord.MessageEmbed()
                .setAuthor(`${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`HIGH-LOW RESULT`)
                .setDescription(`The generated number was - \`${randomNumber2}\``)
                .addField(`━━━━DRAW━━━━`, `Profit: **0**`, false)
                .setColor("ORANGE");

                if (randomNumber3 > randomNumber) return message.reply(embed_lose2)
                if (randomNumber3 === randomNumber) return message.reply(embed_draw2)
                if (randomNumber3 < randomNumber) return message.reply(embed_win3)
                .then(await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc: {
                        coins: randomCoins2,
                      },
                    }
                  ));
            } else return message.reply('what the heck you should reply in `higher` or `lower` lol')
        })
    }
}
