import {
  GraphQLObjectType,
} from 'graphql';

import CreateTradingSystemMutation from './CreateTradingSystem';
import EditTradingSystemMutation from './EditTradingSystem';
import DeleteTradingSystemMutation from './DeleteTradingSystem';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: Object.assign(
    CreateTradingSystemMutation,
    EditTradingSystemMutation,
    DeleteTradingSystemMutation
  ),
});

export default Mutation;
