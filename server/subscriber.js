var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
    client.subscribe('home/devices/#')
})
client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context)
})