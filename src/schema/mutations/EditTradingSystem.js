import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { TradingSystemType } from '../types';
import { TradingSystem } from '../../models';
import { TradingSystemInputType } from '../types/input';

const args = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  tradingSystem: { type: new GraphQLNonNull(TradingSystemInputType) },
};

const resolve = (parent, { id: _id, tradingSystem: editedTradingSystem }) => new Promise((res, rej) => {
  TradingSystem.findOne({ _id }).exec((err, tradingSystem) => {
    if (err) {
      rej(err);
      return;
    }
    tradingSystem.history.push({
      updatedAt: tradingSystem.updatedAt,
      strategies: tradingSystem.strategies,
    });
    tradingSystem.strategies = editedTradingSystem.strategies;
    tradingSystem.save((error) => {
      if (error) {
        rej(error);
        return;
      }
      res(tradingSystem);
    });
  });
});

const mutation = {
  editTradingSystem: {
    type: TradingSystemType,
    args,
    resolve,
  },
};

export default mutation;