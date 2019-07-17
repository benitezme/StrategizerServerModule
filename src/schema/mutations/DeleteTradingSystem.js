import { GraphQLNonNull, GraphQLString } from 'graphql';
import { TradingSystemType } from '../types';
import { TradingSystem } from '../../models';
import { AuthentificationError } from '../../errors';

const args = {
  fbSlug: { type: new GraphQLNonNull(GraphQLString) }
};

const resolve = (parent, { fbSlug }, context) => new Promise((res, rej) => {

  TradingSystem.findOne({ fbSlug }).exec((err, tradingSystem) => {
    if (err) {
      rej(err);
      return;
    }
    if (!tradingSystem) {
      rej(err);
      return;
    }
    tradingSystem.delete((error) => {
      if (error) {
        rej(error);
        return;
      }
      res(tradingSystem);
    });
  });
});

const mutation = {
  deleteTradingSystem: {
    type: TradingSystemType,
    args,
    resolve,
  },
};

export default mutation;
