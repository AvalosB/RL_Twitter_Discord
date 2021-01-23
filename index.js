require('dotenv').config()
const Twit = require('twit')
const Discord = require('discord.js')
const client = new Discord.Client()

const followList = ["RocketLeague", "RLEsports", "Rizzo_TV", "amustycow","Lethamyr_RL", "SunlessKhan", "Brian29896712"]
const follows = {
    RocketLeague: {userID: "2732818747", screenName: "RocketLeague"},
    RLEsports: {userID: "703370607119839232", screenName: "RLEsports"},
    Rizzo: {userID: "268116836", screenName: "Rizzo_TV"},
    Musty: {userID: "898790672131608576", screenName: "amustycow"},
    Leth: {userID: "749018943424266241", screenName: "Lethamyr_RL"},
    Sunless: {userID: "844584603067301890", screenName: "SunlessKhan"},
    itemShop: {userID: "1224718674759766022", screenName: "RL_Item_Shop"},
    me: {userID: "1352091963227578376", screenName: "Brian29896712"}
}

var T = new Twit({
    consumer_key: process.env.T_CONSUMER,
    consumer_secret: process.env.T_SECRET,
    access_token: process.env.T_ACCESS,
    access_token_secret: process.env.T_ACCESS_SECRET,
    timeout_ms: 60*1000,
    strictSSL: true,
})


client.login(process.env.DISCORD_TOKEN);
client.once('ready', () => {
    console.log("Ready")
    var stream = T.stream('statuses/filter', { 
        follow: [follows.RocketLeague.userID, follows.RLEsports.userID, follows.Rizzo.userID, follows.Musty.userID, follows.Leth.userID, follows.Sunless.userID, follows.me.userID]})

    stream.on('tweet', function (tweet){
        var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
        if(followList.includes(tweet.user.screen_name)){
            try {
                let channel = client.channels.fetch(process.env.DISCORD_CHANNEL_ID).then(channel => {
                channel.send(url)
                }).catch(err => {
                console.log(err)
                })
            } catch (error) {
                    console.error(error);
            }
        }
    })
})