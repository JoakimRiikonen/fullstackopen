import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Anecdote = ({anecdote, votes}) => (
  <div>
    <div>
        {anecdote}
    </div>
      <div>
        has {votes} votes
      </div>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const randomAnecdote = () => {
      let num = Math.floor(Math.random() * anecdotes.length)
      setSelected(num)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  let indexOfMaxVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
        <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
        <div>
            <Button onClick={() => vote()} text="vote"/>
            <Button onClick={() => randomAnecdote()} text="next anecdote"/>
        </div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={props.anecdotes[indexOfMaxVotes]} votes={votes[indexOfMaxVotes]}/>
    </div>
  )
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
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)