import {
  GraphQLObjectType,
} from 'graphql';

import CreateTradingSystemMutation from './CreateTradingSystem';
import EditTradingSystemMutation from './EditTradingSystem';
import AuthorizeStrategyMutation from './AuthorizeStrategy';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: Object.assign(
    CreateTradingSystemMutation,
    EditTradingSystemMutation,
    AuthorizeStrategyMutation
  ),
});

export default Mutation;
