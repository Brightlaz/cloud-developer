import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getTodoById, updateTodo } from '../../helpers/todosAcess'
import { getUploadUrl } from '../../helpers/attachmentUtils'

const bucketName = process.env.ATTACHMENT_S3_BUCKET
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const todo = await getTodoById(todoId)
    todo.attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

    await updateTodo(todo)

    const url = await getUploadUrl(todoId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)

// import 'source-map-support/register'

// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

// import { createAttachmentPresignedUrl } from '../../helpers/attachmentUtils'
// import { getUserId } from '../utils'

// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const todoId = event.pathParameters.todoId
//     // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
//     const presignedUrl = await createAttachmentPresignedUrl(
//       getUserId(event),
//       todoId
//     )

//     return {
//       statusCode: 205,
//       body: JSON.stringify({ presignedUrl })
//     }
//   }
// )

// handler.use(httpErrorHandler()).use(
//   cors({
//     credentials: true
//   })
// )
