import axios from "axios";

export default async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }

  var currTime = new Date();
  var fiveMinutesBefore = new Date(currTime.getTime() - 300000);

  const startTime = fiveMinutesBefore.toISOString();

  var config = {
    method: "get",
    url: `${process.env.BaseUrl}/mentions?start_time=${startTime}`,
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
      "connector-id": process.env.ConnectorId,
      "connection-id": process.env.ConnectionId,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.meta.result_count > 0) {
        response.data.data.map((tweet) => {
          const id = tweet.id;
          var data = JSON.stringify({
            tweet_id: id,
          });
          axios.post(`${process.env.BaseUrl}/retweets`, data, {
            headers: {
              "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
              "content-type": "application/json",
              "connector-id": process.env.ConnectorId,
              "connection-id": process.env.ConnectionId,
            },
          });
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  context.log("JavaScript timer trigger function ran!", timeStamp);
}
