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
  TradingSystem.findOne({ fbSlug }).exec((err, tradingSystem) => {
    if (err) {
      rej(err);
      return;
    }
    if (!tradingSystem) {
      rej(new DatabaseError('None of the tradingSystem are linked to that fbSlug'));
      return;
    }
    if(tradingSystem.access_token === context.access_token)
      res(tradingSystem);
    else
      rej(new AuthentificationError());
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
