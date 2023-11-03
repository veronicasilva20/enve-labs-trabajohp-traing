require('dotenv').config();
const axios = require("axios");
// const sendErrorToSlack = require("./slack-notificaciones");
const crypto = require("crypto");
const querystring = require("querystring");

function base64urlEncode(data) {
  return Buffer.from(data)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const apiKey = process.env.HP_API_KEY;
const secretKey = process.env.HP_SECRET_KEY;
const accountId = process.env.HP_ACCOUNT_ID;
const siteId = process.env.HP_SITE_ID;

async function request(arguments) {
  const unixEpoch = Math.floor(Date.now() / 1000);
  const encodedApiKey = base64urlEncode(apiKey);
  const signatureKey = `${encodedApiKey}|${accountId}|${unixEpoch}`;
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(signatureKey)
    .digest();
  const authToken = `${encodedApiKey}.${base64urlEncode(hash)}`;

  const queryString = querystring.stringify({
    method: "getReport",
    currency: "USD",
    locale: "en_US",
    epoch: unixEpoch,
  });

  const url = process.env.HP_URL + queryString;

  const headers = {
    "Content-Type": "application/json",
    "x-hp-api-siteid": siteId,
    Authorization: authToken,
  };


  try {
    const response = await axios.post(url, arguments, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    // sendErrorToSlack(error);
    sendErrorToSlack("Notify error TEST " + error);
  }
}

module.exports = { request };
