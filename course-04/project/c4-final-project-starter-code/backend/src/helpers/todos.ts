import 'source-map-support/register'
import * as dbAccessor from '../helpers/todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic
const logger = createLogger('TodosBusinessLogic')

async function createTodo(userId: string, newTodo: CreateTodoRequest) {
  const todoItem: TodoItem = {
    ...newTodo,
    userId,
    done: false,
    todoId: uuid.v4(),
    attachmentUrl: '',
    createdAt: new Date().toDateString()
  }
  logger.info('Creating a todo item')
  await dbAccessor.createTodo(todoItem)
  return todoItem
}

async function updateTodo(
  userId: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
) {
  logger.info('Updating a todo item')
  await dbAccessor.updateTodo(userId, todoId, updatedTodo)
}

async function deleteTodo(userId: string, todoId: string) {
  logger.info('Deleting a todo item')
  await dbAccessor.deleteTodo(userId, todoId)
}

async function getTodo(userId: string, todoId: string) {
  logger.info('Getting a todo item')
  return await dbAccessor.getTodo(userId, todoId)
}

async function getTodosForUser(userId: string) {
  logger.info('Getting a todo user')
  return dbAccessor.getTodosForUser(userId)
}

export { createTodo, updateTodo, deleteTodo, getTodo, getTodosForUser }
