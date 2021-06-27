module.exports = {
  Query: {
    devices:(_, {}, { dataSources }) =>
      dataSources.deviceDatabase.getDevices(),
    device: (_, { id }, { dataSources }) =>
      dataSources.deviceDatabase.getDeviceById(id),
    zone: (_, { id }, { dataSources }) =>
      dataSources.deviceDatabase.getZoneById(id),
  }
};