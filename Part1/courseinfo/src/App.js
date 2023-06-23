const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Part = (props) => (
  <div>
    <p>{props.datPart.pt} {props.datPart.ex}</p>
  </div>
)

const Content = (props) => (
  <div>
    <Part datPart = {props.data[0]} />
    <Part datPart = {props.data[1]} />
    <Part datPart = {props.data[2]} />
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of exercises {props.data[0].ex + props.data[1].ex + props.data[2].ex}</p>
  </div>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const data = [
    {pt: part1, ex: exercises1},
    {pt: part2, ex: exercises2},
    {pt: part3, ex: exercises3},
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