import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { DatabaseError, AuthentificationError } from '../../errors';
import { TradingSystemType } from '../types';
import { TradingSystem } from '../../models';

const args = {
  fbSlug: { type: new GraphQLNonNull(GraphQLString) },
};

const resolve = (parent, { fbSlug }, context) => new Promise((res, rej) => {
  if (!context.userId) {
    throw new AuthentificationError()
  }

  TradingSystem.findOne({ fbSlug }).exec((err, tradingSystem) => {
    if (err) {
      rej(err);
      return;
    }
    if (!tradingSystem) {
      rej(new DatabaseError('None of the tradingSystem are linked to that fbSlug'));
      return;
    }
    res(tradingSystem);
  });
});

const query = {
  tradingSystemByFb: {
    type: TradingSystemType,
    args,
    resolve,
  },
};

export default query;
