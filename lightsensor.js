'use strict';

let Service, Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-lightsensor-analog', 'LightSensorAnalog', LightSensorAnalog);
};

class LightSensorAnalog
{
  constructor(log, config) {
    this.log = log;
    this.name = config.name;

    this.service = new Service.LightSensor(this.name);

    this.service
      .getCharacteristic(Characteristic.CurrentAmbientLightLevel)
      .on('get', this.getCurrentAmbientLightLevel.bind(this));
  }

  getCurrentAmbientLightLevel(cb) {
    // TODO: read sensor value
    cb(null, 42.0);
  }

  getServices() {
    return [this.service]
  }
}

