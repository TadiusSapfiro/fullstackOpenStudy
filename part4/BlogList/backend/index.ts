import { PORT } from './utils/config'
import app from './app'
import logger from './utils/logger'

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})