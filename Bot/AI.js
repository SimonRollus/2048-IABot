function displayMatrix(array2d) {
    var textDisplay = "";
    for (var r = 0; r < array2d.length; r++) {
        for (var c = 0; c < array2d[r].length; c++) {
            textDisplay += "  ";
            textDisplay += array2d[r][c];
        }  
        textDisplay += "\r";
    }
    return textDisplay;
}

function Brain(delayAction) {
    this.result = {pattern: [], score: 0};
    this.delayAction = delayAction;
    
    this.action = function() {
        while (!Game.over){
            decision = this.think();
            this.result.pattern.push(decision);
            this.result.score = Game.score;
            this.movement(decision); 
            sleep(delayAction);
        }
        alert(displayMatrix(this.capture()));
    }

    this.think = function () {
        var decision = Math.floor(Math.random() * 4);
        return decision;
    };
    
    this.movement = function (direction) {
        switch (direction) {
            case 0:
                fireKeyboardEvent("keydown", 37); //LEFT
            break;
            case 1:
                fireKeyboardEvent("keydown", 38);  //UP  
            break;
            case 2:
                fireKeyboardEvent("keydown", 39); //RIGHT
            break;
            case 3:
            break;
                fireKeyboardEvent("keydown", 40); // DOWN
            default:   
        }   
    };
    
    this.capture = function() {
        source = Game.grid.cells;
        data = [];
    
        for (var row in source) {
            temp = [];
            for (var column in source[row]) {
                if (source[column][row] === null){
                    temp.push(0);    
                }
                else {
                    temp.push(source[column][row].value)
                }
            }  
            data.push(temp)
        }
    
        return data;   
    };
         
}

function setupParents(numberOfParents) {
    parents = [];
    for(var i = 0; i < numberOfParents; i++) {
        parents.push(new Brain(0));  
    }
    return parents;
}

function bot() {
    console.log("Running");
    all_bots = setupParents(5);
    for (var bot in all_bots) {
        console.log("The bot " + bot + " is now playing");
        all_bots[bot].action();
        console.log(all_bots[bot].result);
        Game.restart();
    }
}

function fireKeyboardEvent(event, keycode) {
    var keyboardEvent = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if (keyboardEvent.initEvent) {
        keyboardEvent.initEvent(event, true, true);
    }

    keyboardEvent.keyCode = keycode;
    keyboardEvent.which = keycode;

    document.dispatchEvent?document.dispatchEvent(keyboardEvent) 
                           :document.fireEvent(event, keyboardEvent);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
