import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}> {text}</button>
)


const Feedback = ({commands}) => (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={commands.incrGood} text = 'good' />
      <Button handleClick={commands.incrNeutral} text = 'neutral' />
      <Button handleClick={commands.incrBad} text = 'bad' />
    </div>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
)

const Statistics = ({stat}) => {
  
  if(stat.all === 0 ) return (<p>'No feedback given'</p>)
  
  const average = (stat.good - stat.bad)/stat.all
  const positive = stat.good/stat.all*100

  return (
    <table> 
      <caption>
        <h2>statistics</h2>
      </caption>
      <tbody>       
        <StatisticLine text = 'good' value = {stat.good} />     
        <StatisticLine text = 'neutral' value = {stat.neutral} />     
        <StatisticLine text = 'bad' value = {stat.bad} />     
        <StatisticLine text = 'all' value = {stat.all} />     
        <StatisticLine text = 'average' value = {average} />     
        <StatisticLine text = 'positive' value = {positive} />
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrGood = () => {
    const updGood = good + 1
    setGood(updGood)
    setAll (updGood + neutral + bad)
  }
  const incrNeutral = () => {
    const updNeutral = neutral + 1
    setNeutral(updNeutral)
    setAll (good + updNeutral + bad)
  }
  const incrBad = () => {
    const updBad = bad + 1
    setBad(updBad)
    setAll (good + neutral + updBad)
  }

  return (
    <div>
      <Feedback commands = {{incrGood, incrNeutral, incrBad}} />
      <Statistics stat = {{good,neutral,bad, all}} />
    </div>
  )
}

export default App