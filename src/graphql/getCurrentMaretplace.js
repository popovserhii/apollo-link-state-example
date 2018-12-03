import gql from 'graphql-tag'

export default gql`
  query {
    currentMarketplace @client {
      id
      name
    }
  }
`
