import axios from "axios";

export default async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const startTime = yesterday.toISOString();

  var config = {
    method: "get",
    url: `https://bmoe.azure-api.net/api/twitter/users/1554513760907173889/mentions?start_time=${startTime}`,
    headers: {
      "Ocp-Apim-Subscription-Key": "ebf8deddbcc54e62ac2348c8bd8589f5",
      "connector-id": "bmoe-twitter",
      "connection-id": "bmoe-twitter",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  context.log("JavaScript timer trigger function ran!", timeStamp);
}
