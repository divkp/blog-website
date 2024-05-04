
import axios from "axios";
import { API_NOTIFICATIONS } from "./noti";
import { API_CALLS } from "./noti";
import { getAccesstoken ,getType} from "./common-utils";
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    // "Content-Type": "application/json",
    "Accept": "application/json,form-data",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params){
         config.params=config.TYPE.params;
    }
    else if(config.TYPE.query){
      config.url=config.url+'/'+config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response && response.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: response?.data?.message || API_NOTIFICATIONS.responsefailure,
    };
  }
};

const processError = (error) => {
  if (error && error.response) {
    // console.log(
    //   "Error in response:",
    //   error.response.data || error.response.statusText
    // );
    return {
      msg: error.response?.data?.message || API_NOTIFICATIONS.responsefailure,
    };
  } else if (error && error.request) {
    // console.log("Error in request:", error.request);
    return {
      msg: API_NOTIFICATIONS.requestfailure,
    };
  } else if (error instanceof Error) {
    // console.log("Error:", error.message);
    return {
      msg: API_NOTIFICATIONS.networkerror,
    };
  } else {
    // console.log("Unknown error occurred:", error);
    return {
      msg: "Unknown error occurred",
    };
  }
};



const API = {};



for (const [key, value] of Object.entries(API_CALLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccesstoken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };

