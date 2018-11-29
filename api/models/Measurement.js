/**
 * Measurement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    deviceid: { type: 'string', columnType:'varchar(100)', required: true },
    category: { type: 'string', columnType:'varchar(50)', required: true},
    value: {type: 'number'},
    type: {type: 'string', columnType: 'varchar(30)'},
    units: {type: 'string', columnType:'varchar(30)'},
    measuredon: {type: 'ref', columnType: 'timestamp'},
    starttime: {type:'ref', columnType: 'timestamp'},
    endtime: {type: 'ref', columnType: 'timestamp'},
    userid: {type: 'ref', columnType: 'bigint'},
    createdon: {type: 'ref', columnType: 'timestamp', defaultsTo: new Date()}



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

