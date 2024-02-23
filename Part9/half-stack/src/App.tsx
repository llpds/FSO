interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => <h1>{name}</h1>

interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts : Course[];
}

const Content = ({ courseParts }:ContentProps) => <ul> 
  {courseParts.map(c=> <li key={c.name}>{c.name} {c.exerciseCount}</li>)}
</ul>

interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => <p> Number of exercises {totalExercises} </p>

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
