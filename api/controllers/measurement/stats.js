const DAILY_STATS_QUERY = `
  select
    sum(value) as revolutions,
    sum(value) * 29 as inches,
    sum(value) * 29 *0.083333 as feet,
    (sum(value) * 29 *0.083333 )/5280 as miles
    , DATE(endtime - interval '5 hour') as sessiondate
  from measurement
  where deviceid = 'PI_213'
  group by deviceid
    , DATE(endtime - interval '5 hour')  -- group activity in middle of the early AM to day before
  order by sessiondate
`;
module.exports = {

  friendlyName: 'Stats',


  description: 'Stats measurement.',


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

    console.log('about to log request... %s', JSON.stringify(this.req.body));
    if (!this.req.headers['authorization'] || this.req.headers['authorization'] != process.env.API_KEY) {
      return exits.unauthorized();
    }

    const dailyStats = await sails.sendNativeQuery(DAILY_STATS_QUERY);
    console.log(dailyStats);
    sails.log(dailyStats);
    
    return exits.success({
      dailyActivity: dailyStats.rows
    });

  }
};
