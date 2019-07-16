import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={props.handleGood} text={'good'}/>
        <Button handleClick={props.handleNeutral} text={'neutral'}/>
        <Button handleClick={props.handleBad} text={'bad'}/>
    </div>
)

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    let total = props.good + props.neutral + props.bad
    let average = (props.good - props.bad) / total              
    let positive = props.good / total * 100 + '%'
    if(total === 0){
        return(
            <div>
                <h1>Statistics</h1>
                No feedback given
            </div>
        )
    }
    return(
    <div>
        <h1>statistics</h1>
        <table>
            <tbody>
                <Statistic text="good" value={props.good}/>
                <Statistic text="neutral" value={props.neutral}/>
                <Statistic text="bad" value={props.bad}/>
                <Statistic text="all" value={total}/>
                <Statistic text="average" value={average}/>
                <Statistic text="positive" value={positive}/>
            </tbody>
        </table>
    </div>
    )
}

const Statistic = (props) => {
    return(
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback handleGood={() => setGood(good+1)}
      handleNeutral={() => setNeutral(neutral+1)}
      handleBad={() => setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)