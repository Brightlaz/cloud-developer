import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo, getTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const todo = await getTodo(getUserId(event), todoId)

    if (!todo) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Todo ${todoId} is not found` })
      }
    }

    await updateTodo(getUserId(event), todoId, updatedTodo)

    return {
      statusCode: 203,
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
