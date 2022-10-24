import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
// import { createLogger } from '../utils/logger'
// import { TodoUpdate } from '../models/TodoUpdate'

const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')
const todosTable = process.env.TODOS_TABLE
const index = process.env.TODOS_CREATED_AT_INDEX
const docClient: DocumentClient = createDynamoDBClient()

// TODO: Implement the dataLayer logic
export async function createTodo(todo: TodoItem): Promise<TodoItem> {
  await docClient
    .put({
      TableName: todosTable,
      Item: todo
    })
    .promise()

  return todo as TodoItem
}
export async function getAllTodosByUserId(userId: string): Promise<TodoItem[]> {
  const result = await docClient
    .query({
      TableName: todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    .promise()
  return result.Items as TodoItem[]
}
export async function getTodoById(todoId: string): Promise<TodoItem> {
  const result = await docClient
    .query({
      TableName: todosTable,
      IndexName: index,
      KeyConditionExpression: 'todoId = :todoId',
      ExpressionAttributeValues: {
        ':todoId': todoId
      }
    })
    .promise()
  const items = result.Items
  if (items.length !== 0) return result.Items[0] as TodoItem

  return null
}
export async function updateTodo(todo: TodoItem): Promise<TodoItem> {
  const result = await docClient
    .update({
      TableName: todosTable,
      Key: {
        userId: todo.userId,
        todoId: todo.todoId
      },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': todo.attachmentUrl
      }
    })
    .promise()

  return result.Attributes as TodoItem
}
export async function updateTodoData(
  todo: TodoItem,
  updatedTodo
): Promise<TodoItem> {
  const result = await docClient
    .update({
      TableName: todosTable,
      Key: {
        userId: todo.userId,
        todoId: todo.todoId
      },
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
  return result.Attributes as TodoItem
}
export async function deleteTodo(todo: TodoItem): Promise<TodoItem> {
  const result = await docClient
    .delete({
      TableName: todosTable,
      Key: {
        userId: todo.userId,
        todoId: todo.todoId
      }
    })
    .promise()
  return result.Attributes as TodoItem
}
function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
