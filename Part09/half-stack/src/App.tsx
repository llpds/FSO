interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => <h1>{name}</h1>

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartSpecial extends CoursePartBaseDescription{
  requirements: string[],
  kind: "special"
}

interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartSpecial| CoursePartBackground;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part : CoursePart;
}

const Part = ({ part }:PartProps) => {
  switch (part.kind){
    case "basic":
      return (<p >
                 <b>{part.name} {part.exerciseCount}</b> <br />
                 <i>{part.description}</i>
        </p>
      );
    case "group":
      return(<p>
                <b>{part.name} {part.exerciseCount}</b> <br /> 
                <i>project exercises{part.groupProjectCount}</i>
        </p>
      );
    case "background":
      return (<p>
                  <b>{part.name} {part.exerciseCount}</b> <br />
                  <i>{part.description}</i> <br />
                  Additional material: {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (<p>
                  <b>{part.name} {part.exerciseCount}</b> <br />
                  <i>{part.description}</i> <br /> 
                  required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
}      


interface ContentProps {
  courseParts : CoursePart[];
}

const Content = ({ courseParts }:ContentProps) => <div> 
  {courseParts.map(p => <Part key={p.name} part = {p} />)}
</div>

interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => <p> Number of exercises {totalExercises} </p>

const App = () => {
  const courseName = "Half Stack application development";


  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts = {courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App
