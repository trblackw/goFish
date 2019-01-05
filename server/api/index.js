const apiKey = process.env.WOLFRAM_API_KEY;

const WolframAlphaAPI = require("wolfram-alpha-api");
const waApi = WolframAlphaAPI(apiKey);