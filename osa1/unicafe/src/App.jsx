import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({stats}) => {
  if (stats.all === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good}/>
          <StatisticLine text="neutral" value={stats.neutral}/>
          <StatisticLine text="bad" value={stats.bad}/>
          <StatisticLine text="all" value={stats.all}/>
          <StatisticLine text="average" value={stats.average.toFixed(1)}/>
          <StatisticLine text="positive" value={stats.positive.toFixed(1) + '%'}/> 
        </tbody>  
      </table> 
    </div>
    )
  }

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good*1+neutral*0+bad*-1)/all
  const positive = good/all*100

  const stats = {good, neutral, bad, all, average, positive}

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)    
    setAll(updatedBad + good + neutral)
  }

  return (
    <div>
      <h1> give feedback </h1>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
      <h1> statistics </h1>
        <Statistics stats={stats}/>
    </div>
  )
}

export default App