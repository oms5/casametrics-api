module.exports = {

  friendlyName: 'Capture',
  description: 'Capture measurement.',
  inputs: {

  },
  
  exits: {
      badRequest: {
        description: 'No payload or deviceId found.',
        responseType: 'badRequest'
      },
      unauthorized: {
        description: '401',
        responseType: 'unauthorized'
      }
  },

  fn: async function (inputs, exits) {

    // TODO check API key 
    // deploy to azure service
    // TODO validate all inputs
    // Install forever
    // TODO handle errors and return values
    console.log('about to log request... %s', JSON.stringify(this.req.body));
    if (!this.req.headers['authorization'] || this.req.headers['authorization'] != process.env.API_KEY) {
      return exits.unauthorized();
    }

    if (!this.req.body) {
      console.log("no inputs");
      return exits.badRequest();
    }
    if (!this.req.body.deviceid) {
      return exits.badRequest("No deviceId found.");
    }

    if (!this.req.body.category) {
      return exits.badRequest("No category found.");
    }
    const measurement = await Measurement.create(this.req.body).fetch();
    console.log(measurement);
    
    return exits.success({...measurement});
  }
};
