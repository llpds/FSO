const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>{props.datPart.name} {props.datPart.exercises}</p>
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
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content data = {parts} />
      <Total data= {parts} />
    </div>
  )
}

export default App