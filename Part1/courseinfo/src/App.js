const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Part = (props) => (
  <div>
    <p>{props.datPart.name} {props.datPart.exercises}</p>
  </div>
)

const Content = (props) => (
  <div>
    <Part datPart = {props.data[0]} />
    <Part datPart = {props.data[1]} />
    <Part datPart = {props.data[2]} />
  </div>
)

const Total = (props) => {
  const sum = props.data[0].exercises + props.data[1].exercises + props.data[2].exercises
  return (
  <div>
    <p>Number of exercises {sum}</p>
  </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const data = [
    part1,
    part2,
    part3,
  ]

  return (
    <div>
      <Header course = {course} />
      <Content data = {data} />
      <Total data= {data} />
    </div>
  )
}

export default App