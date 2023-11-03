const axios = require('axios');
require('dotenv').config();
const db = require('./knex');
// const notifySlack = require('./slack-notificaciones');



axios.post(
    'https://googleads.googleapis.com/v13/customers/1033527239/googleAds:search', 
    JSON.stringify({
        "query": "SELECT conversion_action.name, conversion_action.id, conversion_action.type FROM conversion_action"
    }), 
    {
    headers: {
        'Content-Type': 'application/json',
        'developer-token': process.env.developertoken,
        'login-customer-id': process.env.logincustomerid,
        'Authorization': process.env.Authorization
    }
    })

  .then(function (response) {
    const conversions = response.data.results;
    console.log(conversions);

    console.log(response);

    // console.log(JSON.stringify(response.data));

return db.transaction((trx) => {
      const insertPromises = conversions.map((conversion) => {
        return db('conversion_actions').insert({
          resourceName: conversion.resourceName,
          type: conversion.type,
          id: conversion.id,
          name: conversion.name,
        });
      });

      return Promise.all(insertPromises)
        .then(trx.commit)
        .catch(trx.rollback);
    });
  })
  .then(() => {
    console.log('Registros insertados con éxito.');
  })

  .catch((error) => {
    console.error('Error al insertar registros:', error);
    // notifySlack(error);
  })

  .finally(() => {db.destroy();
  })

  .catch((error) => {
    console.error('Error al hacer la solicitud a Google Ads:', error);
  });





    // for (let i = 0; i < conversions.length; i++) {

    //   const conversion = conversions[i].conversionAction;

    //   db.query('INSERT INTO conversion_actions (resourceName, type, id, name) VALUES ("' + conversion.resourceName + '", "' + conversion.type + '", "' + conversion.id + '", "' + conversion.name + '")', (error, results) => {

    //     if (error) {
    //       console.error('Error al insertar');
    //     } 
    //     else {
    //       console.log('Insertado');
    //     }

    //   });

    // }

    // db.end((error) => {
    //   if (error) {
    //     console.error('Error al cerrar la conexión a base de datos');
    //   } 
    //   else {
    //     console.log('Conexión a base de datos cerrada.');
    //   }
    // });


 