require("dotenv").config();
const appid = process.env.WOLFRAM_APP_ID;
const WolframAlphaAPI = require("wolfram-alpha-api");
const waApi = WolframAlphaAPI(appid);

module.exports = waApi;

