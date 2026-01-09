const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({partInfo}) => {
  return (
    <p>
      {partInfo.name} {partInfo.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map ((part, index) => (
          <li key={index}>
            <Part
            partInfo={part} 
          />
          </li>
      ))}
    </ul>
  )
}

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {
    

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      }
    ]
  };
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts} 
      />
      <Total total={total} />
    </div>  

  )
}

export default App