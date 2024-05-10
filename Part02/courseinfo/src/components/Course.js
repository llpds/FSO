import Header from './courseComps/Header'
import Content from './courseComps/Content'
import Total from './courseComps/Total'




const Course = ({ course }) => (
  <div>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total total = {course.parts.reduce((sum, val) => sum + val.exercises, 0)} />
  </div>
)

export default Course