const Header = ({ name }) => <h1> {name} </h1>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => 
  <>
    {parts.map( part =>
      <Part part = {part} key = {part.id} />
    )}   
  </>

const Total = ({total}) => <p>total of {total} exercises</p>

const Course = ({course}) => (
  <div>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total total = {course.parts.reduce((sum, val) => sum + val.exercises, 0)} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return (
    <div>
      <Course course = {course} />
    </div>
  )
}

export default App