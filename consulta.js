
const hp = require('./hotelplanner');



const params = {
  "reportType": "individual",
  "startDate": "2023-10-15T00:00:00.000-05:00",
  "EndDate": "2023-10-15T23:59:59.999-05:00",
  "ShowNewReservations": false,
  "ShowService": false,
  "ShowOther": false, 
  "returnType":"json"
};

async function hotelplanner() {
  try {
    const data = await hp.request(params);
    console.log(JSON.stringify(data));
  } 
  catch (error) {
    console.log(error);
  }
}
    
hotelplanner();