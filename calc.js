var calculation = "0";
var screen = "";
var unicornCounter = 0;
var buttonValues = ["C", "CE", "<-", "/", 
					"7","8", "9", "*",
					"4", "5", "6", "-",
					"1", "2", "3", "+",
					"RGB", "0", ".", "=",
					"(", ")"];


function calculate() {
	var lastChar = calculation.charAt(calculation.length-1);	
	if (!isNaN(lastChar) || lastChar == "." || lastChar == ")") {		
		calculation = eval(calculation) + "";
		updateScreen();
	}
}

function deleteCalculation() {
	calculation = "0";
	updateScreen();
}

function deleteLastEntry() {	
	if (!isNaN(calculation.charAt(calculation.length-1))) {			
			for (var i = calculation.length - 1; i >= 0; i--) {
				calculation = calculation.slice(0, -1);				
				if (isNaN(calculation.charAt(calculation.length-1)) && calculation.charAt(calculation.length-1) != ".") {
					break;
				}				
			}			
		}
	calculation = calculation.slice(0, -1);
	if (calculation == "") {
		calculation = "0";
	}		
	updateScreen();
}

function backspace() {
	calculation = calculation.slice(0, -1);
	if (calculation == "") {
		calculation = "0";
	}
	updateScreen();
}

function addChar(char) {

	var lastChar = calculation.charAt(calculation.length-1);

	if (char == "(") {
		if (isNaN(lastChar) && lastChar != ")" && lastChar != "(" && lastChar != ".") {
			calculation += char;	
			updateScreen();
			return;
		}
		if (calculation == "0") {
			calculation = char;	
			updateScreen();
			return;
		}
		return;
	}

	if (char == ")") {
		if (calculation != "0" && !isNaN(lastChar)) {
			calculation += char;	
			updateScreen();
			return;
		}
		return;
	}

	
	if (isNaN(lastChar) && isNaN(char)) {		
		if (lastChar == ")" && char != ".") {			
			calculation += char;	
			updateScreen();
		}		
		return;
	}
	
	if (calculation == "0") {
		if (char == ".") {
			calculation += char;	
			updateScreen();
			return;
		}
		calculation = char;	
		updateScreen();
		return;	
	}
	calculation += char;	
	updateScreen();
}

function updateScreen() {
	screen.value = calculation;
}

function randomRGB() {
	return "rgb(" + Math.floor((Math.random() * 200) + 0) + "," +
			Math.floor((Math.random() * 200) + 0) + "," +
			Math.floor((Math.random() * 200) + 0) + ")";
}

function colorshow() {
	var body = document.getElementsByTagName("body");
	var calc = document.getElementById("container");
	var btn = document.getElementsByTagName("button");
	var h1 = document.getElementById("h1");

	unicornCounter++;
	if (unicornCounter == 4) {
		unicornCounter = 0;
		body[0].style.background = "white";
		calc.style.background = "#f2f2f2";
		h1.style.color = "black";
		for (var i = 0; i < btn.length; i++) {
			btn[i].style.background = "#e6e6e6";
			btn[i].style.color = "black";			
		}
		unleashTheBeast();
		return;
	}

	body[0].style.background = randomRGB();		
	calc.style.background = randomRGB();
	h1.style.color = randomRGB();
	for (var i = 0; i < btn.length; i++) {
		btn[i].style.background = randomRGB();
		btn[i].style.color = randomRGB();
	}	
}

function unleashTheBeast() {
	var elem = document.getElementById("animation"); 
	var h1 = document.getElementById("h1");
	h1.innerHTML = "Unicorn Calculator";
 	elem.style.top = "50%";
 	var pos = 0;
 	var opaque = 0;
 	var id = setInterval(frame, 10);
 	var isHidden = true;
 	var isMoving = true;
 	var direction = 1;

  	function frame() {
  		trot(elem, direction, pos, opaque);
  		direction++;
  		if (isHidden) {
  			opaque += 0.05;  			
  			if (elem.style.opacity >= 0.7) {
  				isHidden = false;  				
  			}
  		}
  		else if (isMoving) {
  			pos += 10;  			
  			if (pos >= window.innerWidth-700) {
  				isMoving = false;
  			}  			
  		}

  		else {
  			opaque -= 0.3;  			
  			if (opaque <= 0) {  				
  				elem.style.opacity = opaque;
  				clearInterval(id);
  				h1.innerHTML = "Corny Calculator";
  				pos = 0;
  				direction = 1;
  			}  				
  		}
 	}
 }

 function trot(elem, direction, pos, opaque) {
 	
 	if (direction % 2 == 0) {
 		elem.style = "opacity:" + opaque + "; left:" + pos + "px; -webkit-transform: rotate(10deg); -moz-transform: rotate(10deg); -o-transform: rotate(10deg); -ms-transform: rotate(10deg); transform: rotate(10deg);"
 		return;
 	}
 	elem.style = "opacity:" + opaque + "; left:" + pos + "px; -webkit-transform: rotate(-10deg); -moz-transform: rotate(-10deg); -o-transform: rotate(-10deg); -ms-transform: rotate(-10deg); transform: rotate(-10deg);" 	
 }


function userInput(val) {
	
	if (val == "C") {
		deleteCalculation();
		return;
	}

	if (val == "CE") {
		deleteLastEntry();
		return;
	}
		
	if (val == "<-") {		
		backspace()
		return;		
	}

	if (val == "RGB") {
		colorshow();
		return;
	}

	if (val == "=") {
		calculate();
		return;
	}

	addChar(val);
}


document.addEventListener("DOMContentLoaded", function(event) {    
    screen = document.getElementById("screen");
    updateScreen();
    createButtons();
});

function createButtons() {
	var buttonDiv = document.getElementById("buttons");
	var buttonsPerRow = 4;
	var row;
	var rowNumber = 1;

	for (var i = 0; i <= buttonValues.length - 1; i++) {

		if (i==0 || i%4 == 0) {
			row = document.createElement("div");
			row.setAttribute("id", "row"+rowNumber);
			rowNumber++;
			buttonDiv.appendChild(row);
		}

		var btn = document.createElement("button");
		btn.appendChild(document.createTextNode(buttonValues[i]));
		btn.setAttribute("id", buttonValues[i]);
		btn.setAttribute("onClick", "userInput(this.id)");		
		row.appendChild(btn);
	}
}