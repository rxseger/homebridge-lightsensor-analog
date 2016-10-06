# homebridge-lightsensor-analog

Analog light sensor service for [Homebridge](https://github.com/nfarina/homebridge)

Reads from an analog-to-digital SPI chip using [mcp-spi-adc](https://www.npmjs.com/package/mcp-spi-adc),
and represents the value as an ambient light sensor light level.

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-lightsensor-analog`
3.	Update your configuration file - see below for an example

Connect an MCP SPI ADC chip to your computer, and a photodiode or other analog light sensor
to one of the channels of the ADC.

## Configuration
* `accessory`: "LightSensorAnalog"
* `name`: descriptive name
* `chip`: one of: MCP3002, MCP3004, MCP3008, MCP3202, MCP3204, MCP3208, or [MCP3304](https://github.com/fivdi/mcp-spi-adc/pull/1)
* `channel`: channel number of ADC chip to read from
* `options`: options for [mcp-spi-adc](https://www.npmjs.com/package/mcp-spi-adc)
* `scale`: value to multiply the raw 0.0 - 1.0 analog value with
* `offset`: value to add to the raw 0.0 - 1.0 analog value

Homebridge expects a value in [lux](https://en.wikipedia.org/wiki/Lux), you can adjust `scale` and `offset`
to calibrate the analog sensor value (currently only linearly) empirically.

Example configuration:

```json
    "accessories": [
        {
            "accessory": "LightSensorAnalog",
            "name": "Kitchen",
            "chip": "MCP3304",
            "channel": 7,
            "options": {
              "speedHz": 20000
            },
            "scale": 500,
            "offset": 0
        }
    ]
```

## See also

* [10der/homebridge-LightSensor](https://github.com/10der/homebridge-LightSensor): currently blank (in progress?), created 2016/09/17
* [lagunacomputer/homebridge-CurrentAmbientLightLevel](https://github.com/lagunacomputer/homebridge-CurrentAmbientLightLevel]: HTTP for sensors
* [lucavb/homebridge-bh1750](https://github.com/lucavb/homebridge-bh1750): plugin for I2C-based [bh1750](https://www.npmjs.com/package/bh1750) digital light sensor

## License

MIT

