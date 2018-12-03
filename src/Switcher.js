import React from 'react'
import {Query, Mutation, withApollo, graphql, compose} from 'react-apollo'
import {getCurrentMarketplace, switchMarketplace} from './graphql'


class Switcher extends React.Component {
  render() {
    return (
      <div>

        <Mutation mutation={switchMarketplace}>
          {switchMarketplace => (
            <select onChange={e => {
              switchMarketplace({
                variables: {
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text
                }
              })
              console.log(e.target)
              console.log(e.target.selectedIndex)
            }}>
              <option key="1" value="1">DE</option>
              <option key="2" value="2">FR</option>
            </select>
          )}
        </Mutation>

        {/* You can uncomment this block for check global state change.
        But bettet place for check is NewGame such as it is different place */}
        {/*<Query query={getCurrentMarketplace}>
          {({data: {currentMarketplace}, client}) => (
            <div>Current selected: {currentMarketplace.name}</div>
          )}
        </Query>*/}

      </div>
    )
  }
}

export default Switcher