import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

import {
  AuthentificationError,
  WrongArgumentsError
} from '../../errors'

import { TradingSystem } from '../../models'
import isUserAuthorized from '../../graphQLCalls/isUserAuthorized'
import crypto from 'crypto'
import { isDefined } from '../../utils'
import logger from '../../config/logger'

const args = {
  fbSlug: { type: new GraphQLNonNull(GraphQLString) },
  cloneId: { type: new GraphQLNonNull(GraphQLString) },
  release: { type: new GraphQLNonNull(GraphQLBoolean) }
}

const resolve = async (parent, { fbSlug, cloneId, release }, context) => {
  logger.debug('authorize -> Entering function.')

  if (!context.userId) {
    throw new AuthentificationError()
  }

  try {
    logger.debug('authorize -> checking clone authorization.')
    let authorized = await isUserAuthorized(context.authorization, cloneId, context.userId)
    if (!authorized) {
      throw new WrongArgumentsError('You are not eligible to authorize this strategy.')
    }

    logger.debug('authorize -> Retrieving user Trading System.')

    let tradingSystem = await TradingSystem.findOne({ fbSlug })

    if (isDefined(tradingSystem)) {
      logger.debug('authorize -> Trading System found.')

      if (!release) {
        if (tradingSystem.access_token === undefined || tradingSystem.access_token === '') {
          tradingSystem.access_token = crypto.randomBytes(64).toString('hex')
        }
      } else {
        tradingSystem.access_token = ''
      }
      await tradingSystem.save()

      logger.debug('authorize -> Assigned clon updated on the Trading System.')
      return tradingSystem.access_token
    } else {
      logger.warn('authorize -> Trading System not found.')
    }
  } catch (error) {
    logger.error('authorize -> Error assigning clon to Trading System. %s', error.stack)
    throw new WrongArgumentsError('Error assigning clon to Trading System. ' + error.message)
  }
}

const authorize = {
  authorizeStrategy: {
    type: GraphQLString,
    args,
    resolve
  }
}

export default authorize
