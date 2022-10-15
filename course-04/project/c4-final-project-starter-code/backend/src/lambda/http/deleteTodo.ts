import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo, getTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const todo = await getTodo(getUserId(event), todoId)

    if (!todo) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Todo ${todoId} is not found` })
      }
    }

    await deleteTodo(getUserId(event), todoId)

    return {
      statusCode: 204,
      body: JSON.stringify({
        message: `Todo ${todoId} was updated successfully`
      })
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
