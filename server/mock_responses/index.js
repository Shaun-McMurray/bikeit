function mockCoffeeMakerResponse(done) {

  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
    return data = {
        "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
        "payload": {
          "agentUserId": "1836.15267389",
          "devices": [
            {
              "id": "123",
              "type": "action.devices.types.COFFEE_MAKER",
              "traits": [
                "action.devices.traits.TemperatureControl",
                "action.devices.traits.OnOff"
              ],
              "name": {
                "defaultNames": [
                  "AAA Smart Coffee Maker"
                ],
                "name": "Coffee Maker",
                "nicknames": [
                  "my brewer"
                ]
              },
              "willReportState": true,
              "attributes": {
                "temperatureRange": {
                  "minThresholdCelsius": 0,
                  "maxThresholdCelsius": 100
                },
                "temperatureUnitForUX": "F"
              },
              "deviceInfo": {
                "manufacturer": "Smart Coffee Maker Manufacturers",
                "model": "F600G",
                "hwVersion": "3.2",
                "swVersion": "11.4"
              },
              "customData": {
                "time": seconds,
                "heat": 74,
                "turnedOn": done,
              }
            }
          ]
        }
      }
}

function mockAirConditionerResponse(turned_on) {
  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
    return data = {
        "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
        "payload": {
          "agentUserId": "1836.15267389",
          "devices": [
            {
              "id": "123",
              "type": "action.devices.types.AC_UNIT",
              "traits": [
                "action.devices.traits.OnOff",
                "action.devices.traits.TemperatureSetting"
              ],
              "name": {
                "defaultNames": [
                  "Sirius Cybernetics Corporation 33321"
                ],
                "name": "AC Unit",
                "nicknames": [
                  "living room AC"
                ]
              },
              "willReportState": true,
              "attributes": {
                "availableThermostatModes": "off,heat,cool,on,fan-only,purifier,eco,dry",
                "thermostatTemperatureUnit": "F"
              },
              "deviceInfo": {
                "manufacturer": "Sirius Cybernetics Corporation",
                "model": "492134",
                "hwVersion": "3.2",
                "swVersion": "11.4"
              },
              "customData": {
                "time": seconds,
                "heat": 74,
                "turnedOn": turned_on
              }
            }
          ]
        }
      }
}

function mockSwitchResponse(turned_on) {
  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
    return data = {
        "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
        "payload": {
          "agentUserId": "1836.15267389",
          "devices": [
            {
              "id": "123",
              "type": "action.devices.types.SWITCH",
              "traits": [
                "action.devices.traits.OnOff"
              ],
              "name": {
                "defaultNames": [
                  "Smart Switch"
                ],
                "name": "switch",
                "nicknames": []
              },
              "willReportState": false,
              "deviceInfo": {
                "manufacturer": "AAA",
                "model": "442",
                "hwVersion": "3.2",
                "swVersion": "11.4"
              },
              "customData": {
                "time": seconds,
                "heat": 10,
                "turnedOn": turned_on
              }
            }
          ]
        }
      }
}

function mockRefrigeratorResponse() {
  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
    return data = {
        "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
        "payload": {
          "agentUserId": "1836.15267389",
          "devices": [
            {
              "id": "123",
              "type": "action.devices.types.REFRIGERATOR",
              "traits": [
                "action.devices.traits.Toggles"
              ],
              "name": {
                "defaultNames": [
                  "Sirius Cybernetics Refrigerator 2331"
                ],
                "name": "Refrigerator",
                "nicknames": [
                  "upstairs refrigerator"
                ]
              },
              "willReportState": false,
              "attributes": {
                "availableToggles": [
                  {
                    "name": "cool",
                    "name_values": [
                      {
                        "name_synonym": [
                          "supercool",
                          "super cooling"
                        ],
                        "lang": "en"
                      }
                    ]
                  },
                  {
                    "name": "quiet",
                    "name_values": [
                      {
                        "name_synonym": [
                          "silent"
                        ],
                        "lang": "en"
                      }
                    ]
                  }
                ]
              },
              "deviceInfo": {
                "manufacturer": "AAA",
                "model": "2331B",
                "hwVersion": "11.2",
                "swVersion": "11.4"
              },
              "customData": {
                "time": seconds,
                "fooValue": 74,
                "barValue": true,
                "bazValue": "lambtwirl"
              }
            }
          ]
        }
      }
}

module.exports = { mockCoffeeMakerResponse, mockAirConditionerResponse, mockSwitchResponse, mockRefrigeratorResponse }