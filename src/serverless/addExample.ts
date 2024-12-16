import { Request } from 'express';
import { v4 } from 'uuid';
import AWS from 'aws-sdk';

const addExample = async(req: Request) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(req.body);
    const createdAt = new Date();
    const id = v4();

    const newExample = {
      id,
      title,
      description,
      createdAt
    }

    await dynamodb.put({
      TableName: 'ExampleTable',
      Item: newExample
    }).promise();

    return {
      status: 200,
      body: JSON.stringify(newExample)
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addExample
}