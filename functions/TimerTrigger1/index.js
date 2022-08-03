import axios from "axios";

export default async function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }

  var currTime = new Date();
  var fiveMinutesBefore = new Date(currTime.getTime() - 300000);

  const startTime = fiveMinutesBefore.toISOString();

  var getMentionsConfig = {
    method: "get",
    url: `${process.env.BaseUrl}/users/${process.env.TwitterUserId}/mentions?start_time=${startTime}`,
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
      "connector-id": process.env.ConnectorId,
      "connection-id": process.env.ConnectionId,
    },
  };

  axios(getMentionsConfig)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.meta.result_count > 0) {
        response.data.data.map((tweet) => {
          const id = tweet.id;

          var data = JSON.stringify({
            tweet_id: id,
          });
          axios.post(
            `${process.env.BaseUrl}/users/${process.env.TwitterUserId}/retweets`,
            data,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
                "content-type": "application/json",
                "connector-id": process.env.ConnectorId,
                "connection-id": process.env.ConnectionId,
              },
            }
          );

          var getUserConfig = {
            method: "get",
            url: `${process.env.BaseUrl}/tweets/${id}?expansions=author_id`,
            headers: {
              "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
              "connector-id": process.env.ConnectorId,
              "connection-id": process.env.ConnectionId,
            },
          };
          axios(getUserConfig)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              const userName = response.data.includes.users[0].name;
              var data = JSON.stringify({
                text: `Thanks for a great summer, ${userName}! We hope to see you again next year.`,
                reply: {
                  in_reply_to_tweet_id: id,
                },
              });

              var replyConfig = {
                method: "post",
                url: `${process.env.BaseUrl}/tweets`,
                headers: {
                  "Ocp-Apim-Subscription-Key": process.env.SubscriptionKey,
                  "connector-id": process.env.ConnectorId,
                  "connection-id": process.env.ConnectionId,
                  "Content-Type": "application/json",
                },
                data: data,
              };
              axios(replyConfig).catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  context.log("JavaScript timer trigger function ran!", timeStamp);
}
