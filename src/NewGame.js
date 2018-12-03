import React  from 'react'
import { Query, graphql, compose } from 'react-apollo'
import TeamCard from './teamCard'
import { Error, Success } from './Alerts'
import Switcher from './Switcher'


import {
  resetCurrentGame,
  getCurrentGame,
  updateGame,
  createGame, getCurrentMarketplace
} from './graphql'

class NewGame extends React.Component {
  state = {
    created: false,
    error: false
  }

  createGame = async () => {
    const { createGame, currentGame, resetCurrentGame } = this.props
    try {
      await createGame({
        variables: {
          ...currentGame
        }
      })
      await resetCurrentGame()
      this.setState({ created: true })
    } catch (err) {
      this.setState({ error: true })
    }
  }

  render () {
    const { currentGame, updateGame } = this.props
    const { created, error } = this.state

    console.log(currentGame)

    return (
      <div className="pa4 flex flex-column items-center">
        {created && <Success />}
        {error && <Error />}

        <Switcher />

        <Query query={getCurrentMarketplace}>
          {({data: {currentMarketplace}, client}) => (
            <div>Current selected (out): {currentMarketplace.name}</div>
          )}
        </Query>

        <div className="flex justify-center">
          <TeamCard
            name={currentGame.teamAName}
            goals={currentGame.teamAScore}
            onGoal={() =>
              updateGame({
                variables: {
                  index: 'teamAScore',
                  value: parseInt(currentGame.teamAScore, 10) + 1
                }
              })
            }
          />
          <TeamCard
            name={currentGame.teamBName}
            goals={currentGame.teamBScore}
            onGoal={() =>
              updateGame({
                variables: {
                  index: 'teamBScore',
                  value: parseInt(currentGame.teamBScore, 10) + 1
                }
              })
            }
          />
        </div>
        <button
          onClick={this.createGame}
          className="f6 link dim br3 ph3 pv2 mb2 dib white bg-blue no-outline"
        >
          Game Finished
        </button>
      </div>
    )
  }
}

export default compose(
  //graphql(createGame, { name: 'createGame' }),
  //graphql(resetCurrentGame, { name: 'resetCurrentGame' }),

  graphql(updateGame, {name: 'updateGame'}),
  graphql(getCurrentGame, {
    props: ({ data: { currentGame, loading } }) => ({
      currentGame,
      loading
    })
  })
)(NewGame)
