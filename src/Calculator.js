import React, { Component } from 'react';
import './stylesheet.css';
import divide from './keypad_pictures/division_button.png';
import remove from './keypad_pictures/delete_button.png';
import neg from './keypad_pictures/negative_button.png';

const Keypad = (props) => {

  const handleDigit = (num) => {
    props.newDigit(num.target.value);
  };

  return (
    <div class='keypad-container'>
      <div className="keypad">
        <div className="row">
          <button className='btn other-btn make-gray' value='clear-all' onClick={() => props.onClick('clearAll')}>AC</button>
          <button className='btn other-btn make-gray' value='clear' onClick={() => props.onClick('clear')}>C</button>
          <button className='btn other-btn make-gray' value='backspace' onClick={() => props.onClick('delete')}>
            <img src={remove} alt="delete"/>
          </button>
          <button className='btn other-btn make-orange' value='/' onClick={() => props.onClick('/')}>
            <img src={divide} alt="divide"/>
          </button>
        </div>
        <div className="row">
          <button className='btn num-btn make-other' value='7' onClick={() => props.onClick('7')}>7</button>
          <button className='btn num-btn make-other' value='8' onClick={() => props.onClick('8')}>8</button>
          <button className='btn num-btn make-other' value='9' onClick={() => props.onClick('9')}>9</button>
          <button className='btn other-btn make-orange' value='*' onClick={() => props.onClick('*')}>x</button>
        </div>
        <div className="row">
          <button className='btn num-btn make-other' value='4' onClick={() => props.onClick('4')}>4</button>
          <button className='btn num-btn make-other' value='5' onClick={() => props.onClick('5')}>5</button>
          <button className='btn num-btn make-other' value='6' onClick={() => props.onClick('6')}>6</button>
          <button className='btn other-btn make-orange' value='-' onClick={() => props.onClick('-')}>-</button>
        </div>
        <div className="row">
          <button className='btn num-btn make-other' value='1' onClick={() => props.onClick('1')}>1</button>
          <button className='btn num-btn make-other' value='2' onClick={() => props.onClick('2')}>2</button>
          <button className='btn num-btn make-other' value='3' onClick={() => props.onClick('3')}>3</button>
          <button className='btn other-btn make-orange' value='+' onClick={() => props.onClick('+')}>+</button>
        </div>
        <div className="row">
          <button className='btn other-btn make-other' value='+-'>
            <img src={neg} alt="negative"/>
          </button>
          <button className='btn num-btn make-other' value='0' onClick={() => props.onClick('0')}>0</button>
          <button className='btn other-btn make-other' value='.' onClick={() => props.onClick('.')}>.</button>
          <button className='btn other-btn make-orange' value='=' onClick={() => props.onClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
}


//unfinishedExpression={currExpression}
//result={result}
const Display = (props) => {
  if(props.result === '')
    return (
      <div class='toDisplay'>
        {props.unfinishedExpression}
      </div>
    );
  return (
    <div class='toDisplay'>
      {props.result}
    </div>
  );
}

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: [],
      input: '',
      history: [],
      showHistory: false,
      result: '',
      resultGiven: false
    };
  }

  pushToExpression(i) {
    this.setState ({
      expression: this.state.expression.push(i)
    });
  }

  handleClick(i) {
    switch(i) {
      case 'clearAll':
        this.clearAll();
        break;

      case 'clear':
        this.clear();
        break;

      case 'delete':
        this.remove();
        break;

      case '/':
        this.divide();
        break;

      case '*':
        this.multiply();
        break;

      case '+':
        this.add();
        break;

      case '-':
        this.subtract();
        break;

      case '=':
        this.equals();
        break;

      case '.':
        this.newDecimal();
        break;

      case '+-':
        break;

      default:
        this.newDigit(i);
    }
  }

  newDigit(digit) {
    if(isNaN(digit)) {
      throw Error('The input must be numeric');
    }

    if(this.state.resultGiven === true) {
      this.setState ({
        result: '',
        resultGiven: false
      })
    }

    let newInput = this.state.input;
    newInput += digit;

    this.setState ({
      input: newInput
    });
  }

  newDecimal() {
    let temp = '';

    if(this.state.input === '') {
      temp = '0.';
    } else {
      temp += '.';
    }

    this.setState ({
      input: this.state.input + temp
    });
  }

  clear() {
    this.setState ({
      input: '',
      expression: [],
      result: ''
    });
  }

  clearAll() {
    this.setState ({
      input: '',
      expression: [],
      result: '',
      history: []
    });
  }

  remove() {
    if (this.state.input === '') {
      return;
    }

    this.setState ({
      input: this.state.input.substring(0, this.state.input.length - 1)
    });
  }

  add() {
    let toPush = this.state.expression;

    if (this.state.input === '') {
      return;
    }

    if(this.state.resultGiven === true) {
      toPush.push(this.state.input);

      this.setState ({
        //expression: toPush,
        result: '',
        resultGiven: false
      });
    } else {
      toPush.push(this.state.input);
    }

    toPush.push('+');

    this.setState ({
      expression: toPush,
      input: ''
    });
  }

  subtract() {
    if (this.state.input === '') {
      return;
    }

    let toPush = this.state.expression;
    toPush.push(this.state.input);

    if(this.state.resultGiven === true) {
      this.setState ({
        //expression: toPush,
        result: '',
        resultGiven: false
      })
    }

    //let toPush = this.state.expression;
    //toPush.push(this.state.input);
    toPush.push('-');

    this.setState ({
      expression: toPush,
      input: ''
    });
  }

  divide() {
    if (this.state.input === '') {
      return;
    }

    let toPush = this.state.expression;
    toPush.push(this.state.input);

    if(this.state.resultGiven === true) {
      this.setState ({
        //expression: toPush,
        result: '',
        resultGiven: false
      })
    }

    //let toPush = this.state.expression;
    //toPush.push(this.state.input);
    toPush.push('/');

    this.setState ({
      expression: toPush,
      input: ''
    });
  }

  multiply() {
    if (this.state.input === '') {
      return;
    }

    let toPush = this.state.expression;
    toPush.push(this.state.input);

    if(this.state.resultGiven === true) {

      this.setState ({
        //expression: toPush,
        result: '',
        resultGiven: false
      })
    }

    //let toPush = this.state.expression;
    //toPush.push(this.state.input);
    toPush.push('*');

    this.setState ({
      expression: toPush,
      input: ''
    });
  }

  equals() {
    if (this.state.input === '') {
      return;
    }

    let temp = this.state.expression;
    temp.push(this.state.input);

    let toEvaluate = temp.join(' ');
    let tempHistory = this.state.history;
    //window.alert(typeof toEvaluate);
    let newHistory = tempHistory.concat(toEvaluate);
    //(newHistory);

    this.setState ({
      result: eval(toEvaluate),
      input: eval(toEvaluate).toString(),
      expression: [],
      history: newHistory,
      resultGiven: true
    });
  }

  render() {
    let expression = this.state.expression;
    let input = this.state.input;
    let result = this.state.result;
    let currExpression = expression.join(' ') + ' ' + input;

    return (
      <div class='calculator_container'>
        <div className='header'></div>
        <div className='display'>
          <Display
            unfinishedExpression={input}
            result={result}
          />
        </div>
        <div className='num-pad'>
          <Keypad
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}
