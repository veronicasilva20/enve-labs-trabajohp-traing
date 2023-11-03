  const hp = require('./hotelplanner');
 

  async function getReportFromApi(apiArguments) {
    console.log(apiArguments);
  
    try {
      const response = await hp.request(apiArguments);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getIndividualReport() {
    const arguments = {
      reportType: 'individual',
      returnType: 'json',
      purchasedDateStart: '2023-11-02',
      purchasedDateEnd: '2023-11-03',
    };
    const res = await getReportFromApi(arguments);

   
  
    return res;
  }


  async function getOfflineCallsReport() {
    const arguments = {
      reportType: 'offlineCalls',
      returnType: 'json',
      purchasedDateStart: '2023-11-02',
      purchasedDateEnd: '2023-11-03',
    };
    const res = await getReportFromApi(arguments);

   
  
    return res;
  }

  async function getPaymentDetailsReport() {
    const arguments = {
      reportType: 'paymentDetails',
      returnType: 'json',
      paymentDate: "2023-11-02"
      
    };
    const res = await getReportFromApi(arguments);

   
  
    return res;
  }

  
  // getPaymentDetailsReport();
  // // getOfflineCallsReport();
   getIndividualReport();
  
  