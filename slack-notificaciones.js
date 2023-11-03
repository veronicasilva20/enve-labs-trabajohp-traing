const axios = require("axios");

function notifySlack(error) {
  const message = {
    text: `*TEST* Error! The process has failed: ${error} ${error.stack}`,
  };
  axios
    .post(
      "https://hooks.slack.com/services/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",
      message
    )
    .then((response) => {
      console.log("Message sent to Slack successfully");
    })
    .catch((error) => {
      console.error("Error sending message to Slack:", error);
    });
}

module.exports = notifySlack;