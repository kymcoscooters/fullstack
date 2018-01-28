import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: Math.floor(Math.random()*6),
      points: [0,0,0,0,0,0]
    }
  }

  render() {
    const next = () => {
      this.setState({selected: Math.floor(Math.random()*6)})
    }

    const vote = () => {
      const copy = this.state.points
      copy[this.state.selected] += 1
      this.setState({points: copy})
    }

    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.points[this.state.selected]} votes</p>
        <button onClick={vote}>vote</button>
        <button onClick={next}>next anecdote</button>
        <h3>anecdote with most votes:</h3>
        <p>{this.props.anecdotes[this.state.points.indexOf(Math.max(...this.state.points))]}</p>
        <p>has {this.state.points[this.state.points.indexOf(Math.max(...this.state.points))]} votes</p>
      </div>
    )
  }

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
