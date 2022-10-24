// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils'
import { createTodo } from '../dataLayer/todosAcess'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
export async function todoBuilder(
  todoRequest: CreateTodoRequest,
  event: APIGatewayProxyEvent
) {
  const todoId = uuid.v4()
  const todo: TodoItem = {
    todoId: todoId,
    userId: getUserId(event),
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: '',
    ...todoRequest
  }
  await createTodo(todo)
  return todo as TodoItem
}
