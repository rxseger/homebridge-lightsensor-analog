'use strict';

const mcp_spi_adc = require('mcp-spi-adc');

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
    this.chip = config.chip;
    this.channel = config.channel;
    this.options = config.options || {};
    this.scale = config.scale || 1;
    this.offset = config.offset || 0;

    this.service = new Service.LightSensor(this.name);

    const constructor = { // TODO: better API to pass in name of chip
      MCP3002: mcp_spi_adc.openMcp3002,
      MCP3004: mcp_spi_adc.openMcp3004,
      MCP3008: mcp_spi_adc.openMcp3008,
      MCP3202: mcp_spi_adc.openMcp3202,
      MCP3204: mcp_spi_adc.openMcp3204,
      MCP3208: mcp_spi_adc.openMcp3208,
      MCP3304: mcp_spi_adc.openMcp3304,
    }[this.chip];
    if (!constructor) throw new Error(`unrecognized/invalid chip: ${this.type}`);

    this.adc = mcp_spi_adc.openMcp3304(this.channel, this.options, (err) => {
      if (err) throw err;
    });

    this.service
      .getCharacteristic(Characteristic.CurrentAmbientLightLevel)
      .on('get', this.getCurrentAmbientLightLevel.bind(this));
  }

  getCurrentAmbientLightLevel(cb) {
    this.adc.read((err, reading) => {
      if (err) return cb(err);

      const value = reading.value * this.scale + this.offset;

      console.log(`adc read ${value}`);
      cb(null, value);
    });
  }

  getServices() {
    return [this.service]
  }
}

