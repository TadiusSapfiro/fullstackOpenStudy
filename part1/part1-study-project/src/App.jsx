const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}

const App = () => {
  const name = "Katya"
  const age = 23
  return (
    <>
      <h1>Greetings</h1>
      <Hello name = "Volodymyr" age = "28"/>
      <Hello name = {name} age = {age + 6}/>
    </>
  )
}

export default App