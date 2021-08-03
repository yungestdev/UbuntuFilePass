const util = require('minecraft-server-util')

bot.on("message", message => {
    if (message.content.startsWith("?check")) {
        server = message.content.split(' ')
        if (!server[1]) return message.channel.send("Inserisci un server.")
        
        util.status(server[1])
        .then((response) => {
            //Poi se riesco proverò a trovare un metodo per aggiugere l'immagine del server
            var embed = new Discord.MessageEmbed()
                .setTitle(server[1])
                .setDescription("Tutte le info su questo server")
                .addField("Host:", "```" + response["host"] + "```", true)
                .addField("Port:", "```" + response["port"] + "```", true)
                .addField("Version:", "```" + response["version"] + "```", true)
                .addField("Players Online","```" + response["onlinePlayers"] + "```", true)
                .addField("Max Players", "```" + response["maxPlayers"] + "```", true)
                .addField("Description of server", "```" + response["description"]["descriptionText"] + "```", true)
                
    
            message.channel.send(embed)
        })
        .catch((error) => {
            console.error(error);
            message.channel.send("Si è verificato un errore o server inesistente")
        })
    }
  });