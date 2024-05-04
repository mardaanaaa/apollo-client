const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
    }
`;

const server = new ApolloServer({
	typeDefs,
	mocks: true,
});

server.listen().then(({ url }) => {
	console.log(`Server is running at ${url}`);
});