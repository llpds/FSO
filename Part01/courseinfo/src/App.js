const Header = ({name}) => (
    <h1>{name}</h1>
)

const Part = ({datPart}) => (
    <p>{datPart.name} {datPart.exercises}</p>
)

const Content = ({data}) => (
  <div>
    <Part datPart = {data[0]} />
    <Part datPart = {data[1]} />
    <Part datPart = {data[2]} />
  </div>
)

const Total = ({data}) => {
  const sum = data[0].exercises + data[1].exercises + data[2].exercises
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header name = {course.name} />
      <Content data = {course.parts} />
      <Total data= {course.parts} />
    </div>
  )
}

export default App