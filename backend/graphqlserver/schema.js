const { gql } = require('apollo-server-express');

const mangas = [
  {
    id: 1,
    title: 'Naruto',
    description: 'Ninja guy',
    completed: true
  },
  {
    id: 2,
    title: 'One Piece',
    description: 'Pirate guy',
    completed: false
  },
];

exports.typeDefs = gql`
  type Manga {
    id: Int!
    title: String
    description: String
    completed: Boolean
  }

  type Query {
    mangas: [Manga]
  }
`;

exports.resolvers = {
  Query: {
    mangas: () => mangas
  },
}; 