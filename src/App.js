import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: "asd1", name: "Arnell", age: 28},
      {id: "asdfd2", name: "Kellys", age: 28},
      {id: "asd312", name: "Kevin", age: 20}
    ],
    otherPropertie: "Holiiii",
    showPersons: false
  }

  /*Methods*/
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {id: "asd1", name: newName, age: 23 },
        {id: "asdfd2", name: "Kellys", age: 22 },
        {id: "asd312", name: "Kevin", age: 23 }
      ]
    })
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons; No hacer esto, se esta mutando
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //Modo ES6
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }
  /*End Methods*/

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    }

    let personsHtml = null;
    if (this.state.showPersons) {
      personsHtml = (
        <div className="PersonsContainer">
          {
            this.state.persons.map((person, index) => {
              return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}//Se agrega este ID porque React necesita reconocer elementos únicos para solo renderizar los elementos necesarios y no todos.
                changed={(event) => this.changeNameHandler(event, person.id)}
              />
            })
          }
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App! :D</h1>

        <button 
        style={style} 
        onClick={this.togglePersonsHandler} >Toggle Persons</button>
        <br/><br/>
        <button 
        style={style} 
        onClick={this.switchNameHandler.bind(this, "Jojoto Con Queso!!!")} >Actualizar los nombres</button>

        {personsHtml}
      </div>
    );
  }
}

export default App;
