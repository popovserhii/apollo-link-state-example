import gql from 'graphql-tag'

export default gql`
  mutation switchMarketplace($id: Int!, $name: String!) {
    switchMarketplace(id: $id, name: $name) @client {
      id
      name
    }
  }
`
