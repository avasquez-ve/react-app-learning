import React, { Component } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
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
    //Se copia la persona segun el indice
    const person = {
      ...this.state.persons[personIndex]
    }
    //Se cambia el nombre con el escrito en el input
    person.name = event.target.value;

    //Se copia el state
    const persons = [...this.state.persons]
    //Se reemplaza la persona del indice con el nuevo valor
    persons[personIndex] = person;

    //Se actualiza el state con la nueva persona
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
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black"
      }
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

      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "white"
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push("red");
    }
    if(this.state.persons.length <= 1){
      classes.push("bold");
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App! :D</h1>
          <p className={classes.join(" ")}>This is really working!</p>
          <button 
          style={style} 
          onClick={this.togglePersonsHandler} >Toggle Persons</button>

          <br/><br/>

          {/* <button 
          style={style} 
          onClick={this.switchNameHandler.bind(this, "Jojoto Con Queso!!!")} >Actualizar los nombres</button> */}

          {personsHtml}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
