const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
      calculator.waitingForSecondOperand = false;
      return
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }

  function hideCalculator (e) {
    const notes = document.getElementsByClassName('all-tools')
    let numNotes = 0
    if(notes !== null) {
        numNotes = notes.length
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            note.style.display = 'none'
        }
    }
}

function makeCalculator () {

    // Implementation inspired by
    // https://jsfiddle.net/ayoisaiah/c2htznqg/5/
    const calcDiv = document.createElement('div')
    calcDiv.className = "all-tools"
    calcDiv.id = "item_calc"
    const mydiv = document.createElement("div")
    mydiv.id = "mydiv_calc"
    mydiv.className = "all-tools"
    mydiv.style.cursor = 'move'
    const calcStr = '<div class="calculator" id="calculator">'

                    +        '<input type="text" class="calculator-screen" value="" disabled />'
                            
                    +        '<div class="calculator-keys">'
                            
                    +            '<button type="button" class="operator" value="+">+</button>'
                    +            '<button type="button" class="operator" value="-">-</button>'
                    +            '<button type="button" class="operator" value="*">&times;</button>'
                    +            '<button type="button" class="operator" value="/">&divide;</button>'
                            
                    +            '<button type="button" value="7">7</button>'
                    +            '<button type="button" value="8">8</button>'
                    +            '<button type="button" value="9">9</button>'
                            
                            
                    +            '<button type="button" value="4">4</button>'
                    +            '<button type="button" value="5">5</button>'
                    +            '<button type="button" value="6">6</button>'
                            
                            
                    +            '<button type="button" value="1">1</button>'
                    +            '<button type="button" value="2">2</button>'
                    +            '<button type="button" value="3">3</button>'
                            
                            
                    +            '<button type="button" value="0">0</button>'
                    +            '<button type="button" class="decimal" value=".">.</button>'
                    +            '<button type="button" class="all-clear" value="all-clear">AC</button>'
                            
                    +            '<button type="button" class="equal-sign operator" value="=">=</button>'
                        
                    +        '</div>'
                    +    '</div>'

    //calcDiv.innerHTML = calcStr
    mydiv.innerHTML = calcStr

    let calcCont
    if (document.getElementById('calc_container') === null) {
      calcCont = document.createElement('div')
      calcCont.className = 'calc_container'
      calcCont.id = 'calc_container'
    } else {
      calcCont = document.getElementById('calc_container')
    }

    // calcCont.appendChild(calcDiv)
    dragElement(mydiv)
    calcCont.appendChild(mydiv)
    document.querySelector('body').appendChild(calcCont)

    updateDisplay();

    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', event => {
      const { target } = event;
      const { value } = target;
      if (!target.matches('button')) {
        return;
      }
    
      switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          handleOperator(value);
          break;
        case '.':
          inputDecimal(value);
          break;
        case 'all-clear':
          resetCalculator();
          break;
        default:
          if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
          }
      }
    
      updateDisplay();
    });
                
}

  function displayCalculator () {
    if (document.querySelector('#board_calc') === null) {
        const buttonBlock = document.createElement('div')
        buttonBlock.id = 'board_calc'
        buttonBlock.className = 'all-tools'
        /* const buttonStr = '<div id="board" class="all-tools">'
        + '<a onclick="newSticky()" class="button" id="add_new">New Note</a>'
        + '<a onclick="hideSticky()" class="button" id="hide_notes">Hide Notes</a>'
        + '<a onclick="showSticky()" class="button" id="show_notes">Show Notes</a>'
        + '</div>' */

        const buttonStr = '<a onclick="hideCalculator()" class="button" id="hide_calc">Hide Calculator</a>'
        buttonBlock.innerHTML = buttonStr
        document.querySelector('body').prepend(buttonBlock)
    }

    if (document.querySelector('#calculator') === null) {
        makeCalculator()
    }

    // document.getElementById('item_calc').style.display = 'block'
    document.getElementById('mydiv_calc').style.display = 'block'
    document.getElementById('board_calc').style.display = 'block'
    document.getElementById("tab-code").style.display = 'block'

    document.getElementById('js-tab-para').innerHTML = '<code><pre>' +
                                    'const calc = { \n' +
                                      '\t\ttool_name: "calculator", \n'+
                                      '\t\tclass_name: "tool", \n' +
                                      '\t\tinner_text: "Calculator", \n' +
                                      '\t\tdisplay_fcn: displayCalculator \n' +
                                  '} \n' +

                                    'const sticky_notes =  { \n' +
                                          '\t\ttool_name: "sticky_notes", \n' +
                                          '\t\tclass_name: "tool", \n' +
                                          '\t\tinner_text: "Sticky Notes", \n' +
                                          '\t\tdisplay_fcn: displayStickyButtons \n' +
                                      '} \n' +

                                    'const paletteTools = [] \n' +
                                    'paletteTools.push(calc) \n' +
                                    'paletteTools.push(sticky_notes) \n' +
                                    'const paletteMaker = new PaletteMaker(paletteTools) \n' +
                                    'paletteMaker.makePaletteBase() \n'
                                    '\t\t</pre></code>'

    document.getElementById('html-tab-para').innerText =  '<div class="calculator" id="calculator"> \n'

    +        '<input type="text" class="calculator-screen" value="" disabled /> \n'
            
    +        '<div class="calculator-keys"> \n'
            
    +            '<button type="button" class="operator" value="+">+</button> \n'
    +            '<button type="button" class="operator" value="-">-</button> \n'
    +            '<button type="button" class="operator" value="*">&times;</button> \n'
    +            '<button type="button" class="operator" value="/">&divide;</button> \n'
            
    +            '<button type="button" value="7">7</button> \n'
    +            '<button type="button" value="8">8</button> \n'
    +            '<button type="button" value="9">9</button> \n'
            
            
    +            '<button type="button" value="4">4</button> \n'
    +            '<button type="button" value="5">5</button> \n'
    +            '<button type="button" value="6">6</button> \n'
            
            
    +            '<button type="button" value="1">1</button> \n'
    +            '<button type="button" value="2">2</button> \n'
    +            '<button type="button" value="3">3</button> \n'
            
            
    +            '<button type="button" value="0">0</button> \n'
    +            '<button type="button" class="decimal" value=".">.</button> \n'
    +            '<button type="button" class="all-clear" value="all-clear">AC</button> \n'
            
    +            '<button type="button" class="equal-sign operator" value="=">=</button> \n'
        
    +        '</div> \n'
    +    '</div> \n'




    document.getElementById('css-tab-para').innerHTML = '<code><pre>.calculator { \n' +
      'border: 10px solid #337cac; \n' +
      'border-radius: 5px; \n' +
      'position: absolute; \n' +
      'top: 50%; \n' +
      'left: 50%; \n' +
      'transform: translate(-50%, -50%); \n' +
      'width: 500px; \n' +
    '} \n\n' +
    
    '.calculator-screen { \n' +
      'font-size: 62.5%; \n' +
      'box-sizing: border-box; \n' +
      'width: 100%; \n' +
      'font-size: 5rem; \n' +
      'height: 80px; \n' +
      'border: none; \n' +
      'background-color: #252525; \n' +
      'color: #fff; \n' +
      'text-align: right; \n' +
      'padding-right: 20px; \n' +
      'padding-left: 10px; \n' +
      'cursor: move; \n' +
    '} \n\n' +
    
    '.calculator .calculator-keys button { \n' +
      'height: 60px; \n' +
      'background-color: #fff; \n' +
      'border-radius: 3px; \n' +
      'border: 1px solid #c4c4c4; \n' +
      'background-color: transparent; \n' +
      'font-size: 2rem; \n' +
      'color: #333; \n' +
      'background-image: linear-gradient(to bottom,transparent,transparent 50%,rgba(0,0,0,.04)); \n' +
      'box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 0 rgba(255,255,255,.45), inset 0 -1px 0 0 rgba(255,255,255,.15), 0 1px 0 0 rgba(255,255,255,.15); \n' +
      'text-shadow: 0 1px rgba(255,255,255,.4); \n' +
    '}</pre></code>'

}
