import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

const table = process.env.TODOS_TABLE
const docClient = new XAWS.DynamoDB.DocumentClient()

async function createTodo(todoItem: TodoItem) {
  await docClient
    .put({
      TableName: table,
      Item: todoItem
    })
    .promise()
}

async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
) {
  await docClient
    .update({
      TableName: table,
      Key: { userId, todoId },
      UpdateExpression:
        'set #todoName = :todoName, dueDate = :dueDate, done = :done', // Use an alias as name is reserved
      ExpressionAttributeNames: { '#todoName': 'name' },
      ExpressionAttributeValues: {
        ':todoName': updatedTodo.name,
        ':dueDate': updatedTodo.dueDate,
        ':done': updatedTodo.done
      }
    })
    .promise()
}

async function deleteTodo(userId: string, todoId: string) {
  await docClient
    .delete({
      TableName: table,
      Key: { userId, todoId }
    })
    .promise()
}

async function getTodo(userId: string, todoId: string) {
  const result = await docClient
    .get({
      TableName: table,
      Key: { userId, todoId }
    })
    .promise()
  logger.info('Items: ' + JSON.stringify(result))
  return result.Item
}

async function getTodosForUser(userId: string) {
  const result = await docClient
    .query({
      TableName: table,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    .promise()
  return result.Items
}

async function addTodoImageUrl(userId: string, todoId: string) {
  await docClient
    .update({
      TableName: table,
      Key: { userId, todoId },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': `https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/${todoId}`
      }
    })
    .promise()
}

export {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getTodosForUser,
  addTodoImageUrl
}
