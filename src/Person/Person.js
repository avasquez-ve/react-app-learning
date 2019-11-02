import React from 'react';
import './Person.css'
import Radium from 'radium';

const Person = (props) => {
    let {click, name, age, changed} = props;
    const mediaStyles = {
        "@media (min-width: 500px)": {
            width: "450px"
        }
    }

    return(
        <div className="Person" style={mediaStyles}>
            <p onClick={click}>Hola, me llamo {name} y tengo {age} años de edad :)</p>
            <input type="text" onChange={changed} value={name} />
        </div>
    )
}

export default Radium(Person);



/* 
import React, {Component} from 'react';
import './Person.css'

class Person extends Component {
    render(){
        let {click, name, age, changed} = this.props;

        return(
            <div className="Person">
                <p onClick={click}>Hola, me llamo {name} y tengo {age} años de edad :)</p>
                <input type="text" onChange={changed} value={name} />
            </div>
        )
    }
}

export default Person; */