import React from 'react'
import {Query, Mutation, withApollo, graphql, compose} from 'react-apollo'
import {getCurrentGame, getCurrentMarketplace, switchMarketplace, updateGame} from './graphql'


class Switcher extends React.Component {
  render() {
    const {currentMarketplace, switchMarketplace} = this.props
    return (
      <div>
        <select onChange={e => {
          switchMarketplace({
            variables: {
              id: e.target.value,
              name: e.target.options[e.target.selectedIndex].text
            }
          })
        }}>
          <option key="1" value="1">DE</option>
          <option key="2" value="2">FR</option>
        </select>

        <div>Current selected: {currentMarketplace.name}</div>

      </div>
    )
  }
}

export default compose(
  graphql(switchMarketplace, {name: 'switchMarketplace'}),
  graphql(getCurrentMarketplace, {
    props: ({data: {currentMarketplace, loading}}) => ({
      currentMarketplace,
      loading
    })
  })
)(Switcher)