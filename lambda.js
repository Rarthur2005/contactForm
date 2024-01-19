const REGION = "eu-north-1";
let deCodeURLVal =  (str) => {
  return  decodeURIComponent((str + '').replace(/\+/g, '%20'));
}
let validate =  (name, email, message) => {
  if(!(name != null && email != null && message != null))return false;
  if (name.trim() == "") return false;
  if (name.length > 32) return false;
  if (email.trim() == "") return false;
  if (email.length < 5) return false;
  if (email.length > 64) return false;
  if (message.trim() == "") return false;
  if (message.length < 10) return false;
  if (message.length > 256) return false;
  return true;
}

import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const ddbClient = new DynamoDBClient({ region: REGION });
export { ddbClient };

import {randomUUID} from 'crypto';

export const handler = async (event) => {
  const body = atob(event.body);
  var p; { // decodes event into parameters 
    let output = {};

    let params = body.split("&");
    params.forEach((keyAndValue) => {
      let keyValueArray = keyAndValue.split("=");
      let key = keyValueArray[0];
      let value = keyValueArray[1];
      output[key] = deCodeURLVal(value);
    });
    p = output;

  }

  var responseType = "e" // e for error s for success
  if (validate(p.name, p.email, p.message, )) {
    responseType = "s";
    const message = { // discord embed written using discord embed API
      "content": null,
      "embeds": [{
        "title": "New Message",
        "description": p.message,
        "color": 1967135,
        "footer": {
          "text": p.name + "\n" + p.email
        }
      }],
      "attachments": []
    }
    console.log(JSON.stringify(message));
    fetch("PRIVATE", { // sends discord message via webhooks
      method: "POST",
      headers: { "Accept": "application/json", "Content-type": "application/json" },
      body: JSON.stringify(message),

    });
    

  }
  const response = {
    statusCode: 301,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Location": 'https://contact-form-lambda.roryarthur.repl.co/?t=' + responseType,
    },
    body: JSON.stringify(body),
  }
  return response;
};
