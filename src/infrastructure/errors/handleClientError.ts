import { Prisma } from '@prisma/client'
import { iGenericErrorMessage } from '../@types/common'

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: iGenericErrorMessage[] = []
  let message = 'Record not found!'
  const statusCode = 400

  if (error.code === 'P2025') {
    if (error.meta?.cause) {
      message = error.meta.cause as string
    }
    errors = [{ path: '', message }]
  } else if (error.code === 'P2003' && error.message.includes('delete()` invocation:')) {
    message = 'Delete failed'
    errors = [{ path: '', message }]
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  }
}

export default handleClientError
