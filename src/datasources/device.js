const { SQLDataSource } = require('datasource-sql');


class DeviceDatabase extends SQLDataSource {
  getDevices() {
    return this.knex
      .select('*')
      .from('devices');
  }
  getDeviceById(id) {
    return this.knex
      .select('*')
      .from('devices AS device')
      .leftJoin('devicezones AS mv', 'mv.deviceid', 'device.id')
      .leftJoin('zones AS zone', 'mv.zoneid', 'zone.id')
      .where('device.id', '=', id)
      .options({nestTables: true})
      .then(results => {
        return this.deviceReducer(results);
      });
  }
  getZoneById(id) {
    return this.knex
      .select('*')
      .from('zones AS zone')
      .leftJoin('devicezones AS mv', 'mv.zoneid', 'zone.id' )
      .leftJoin('devices AS device', 'mv.deviceid', 'device.id')
      .where('zone.id', '=', id)
      .options({nestTables: true})
      .then(results => {
        return this.zoneReducer(results);
      });
  }

deviceReducer(devices) {
    if(devices.length > 0) {
      const zones = devices.map(device => device.zone)
      return {
        ...devices[0].device,
        zones
      };
    }
    return null;
  }

  zoneReducer(zones) {
    if(zones.length > 0) {
      const devices = zones.map(zone => zone.device)
      return {
        ...zones[0].zone,
        devices
      };
    }
    return null;
  }
}
module.exports = DeviceDatabase;
