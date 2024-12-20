//import { Request } from 'express';
//import AWS from 'aws-sdk';
//
//const getExamples = async(req: Request) => {
//  try {
//    const dynamodb = new AWS.DynamoDB.DocumentClient();
//
//    const result = await dynamodb.scan({
//      TableName: 'ExampleTable'
//    }).promise();
//  
//    const examples = result.Items;
//  
//    return {
//      status: 200,
//      body: {
//        examples
//      }
//    }
//  } catch (error) {
//    console.log(error);
//  }
//}
//
//module.exports = {
//  getExamples
//}