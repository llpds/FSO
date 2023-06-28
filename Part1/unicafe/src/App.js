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

const Statistics = ({stat}) => {
  const all = Object.values(stat).reduce((a, b) => a + b)
  
  if(all === 0 ) return (<p>'no data yet'</p>)
  
  const average = (stat.good - stat.bad)/all
  const positive = stat.good/all*100

  return (
    <div>
      <h2>statistics</h2>      
      <div>good {stat.good}</div>
      <div>neutral {stat.neutral}</div>
      <div>bad {stat.bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>

    </div>
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