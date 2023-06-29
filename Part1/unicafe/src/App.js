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
  const all = Object.values(stat).reduce((a, b) => a + b)
  
  if(all === 0 ) return (<p>'No feedback given'</p>)
  
  const average = (stat.good - stat.bad)/all
  const positive = stat.good/all*100

  return (
    <table> 
      <caption>
        <h2>statistics</h2>
      </caption>
      <tbody>       
        <StatisticLine text = 'good' value = {stat.good} />     
        <StatisticLine text = 'neutral' value = {stat.neutral} />     
        <StatisticLine text = 'bad' value = {stat.bad} />     
        <StatisticLine text = 'all' value = {all} />     
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

  const incrGood = () => setGood(good + 1)
  const incrNeutral = () => setNeutral(neutral + 1)
  const incrBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback commands = {{incrGood, incrNeutral, incrBad}} />
      <Statistics stat = {{good,neutral,bad}} />
    </div>
  )
}

export default App