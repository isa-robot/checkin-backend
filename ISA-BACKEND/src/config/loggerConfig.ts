import { Configuration } from "log4js";

export default {
  appenders: {
    cheese: {
      type: "log4js-node-mongodb",
      connectionString: process.env.LOG_HOST,
    },
  },
  categories: { default: { appenders: ["cheese"], level: "error" } },
} as Configuration;
