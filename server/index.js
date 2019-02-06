var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mockAirConditionerResponse = require('./mock_responses').mockAirConditionerResponse
var mockSwitchResponse = require('./mock_responses').mockSwitchResponse
var mockRefrigeratorResponse = require('./mock_responses').mockRefrigeratorResponse
var mockCoffeeMakerResponse = require('./mock_responses').mockCoffeeMakerResponse
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.get("/send-coffemaker-on", (req, res) => {
  client.publish('home/devices/coffemaker', JSON.stringify(mockCoffeeMakerResponse(true)));
  res.status(200).send(mockCoffeeMakerResponse(true));
});
app.get("/send-coffemaker-off", (req, res) => {
  client.publish('home/devices/coffemaker', JSON.stringify(mockCoffeeMakerResponse(false)));
  res.status(200).send(mockCoffeeMakerResponse(false));
});
app.get("/send-switch-on", (req, res) => {
  client.publish('home/devices/switch', JSON.stringify(mockSwitchResponse(true)));
  res.status(200).send(mockSwitchResponse(true));
});
app.get("/send-switch-off", (req, res) => {
  client.publish('home/devices/switch', JSON.stringify(mockSwitchResponse(false)));
  res.status(200).send(mockSwitchResponse(false));
});
app.get("/send-airconditioner-on", (req, res) => {
  client.publish('home/devices/airconditioner', JSON.stringify(mockAirConditionerResponse(true)));
  res.status(200).send(mockAirConditionerResponse(true));
});
app.get("/send-airconditioner-off", (req, res) => {
  client.publish('home/devices/airconditioner', JSON.stringify(mockAirConditionerResponse(false)));
  res.status(200).send(mockAirConditionerResponse(false));
});
app.get("/send-refrigerator", (req, res) => {
  client.publish('home/devices/refrigerator', JSON.stringify(mockRefrigeratorResponse()));
  res.status(200).send(mockRefrigeratorResponse());
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
