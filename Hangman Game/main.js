let letters = "abcdefghijklmnopqrstuvwxyz"; // alphabetic letters
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
// loop in the lettersArray
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let textLetter = document.createTextNode(letter);
    span.appendChild(textLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
})


let words = {
    player:['messi','ronaldo','benzima','modric','lakazette','drogba','neymar','kante','ramos'],
    city:['New York','Paris','Istanbul','Dubay','Tokyo','Berlin','Casablanca','Vegas','Roma'],
    programming:['C','Matlab','JAVA','PHP','JvaScript','Python','mySQL','Go','R','Ruby','Paskal'],
    company:['Apple','Microsoft','IBM','Samsung','Nokia','Dell','Huawei','Google','Twitter','facebook']
};

let allKeys = Object.keys(words);
let randomKeysNumber = Math.floor(Math.random() * allKeys.length);
let randomKeysName = allKeys[randomKeysNumber];
let randomKeys = words[randomKeysName];
let randomValueNumber = Math.floor(Math.random() * randomKeys.length);
let randomValue = randomKeys[randomValueNumber];

// Set the name of random keys at the span 

document.querySelector(".game-info .catrgory span").textContent = randomKeysName;


let lettersGuess = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValue);

lettersAndSpace.forEach(letter => {

    let emptySpan = document.createElement("span");
    if(emptySpan == " "){
        emptySpan.className = "with-space";
    }
    lettersGuess.appendChild(emptySpan);
});


// Select guess-letters spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// Select the draw 
let theDraw = document.querySelector(".hangman-draw");
// Set wrong attempts
let wrongAttempts = 0;
// the word written by user 
let writtenWord = [];
// Handle clicking on letters
document.addEventListener("click", e => {
    if(e.target.className == "letter-box"){

        let theStatus = false;

        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let chosedWord = Array.from(randomValue.toLowerCase());

        chosedWord.forEach((wordLetter, wordIndex) => {
        
            if(theClickedLetter === wordLetter){
                theStatus = true;
                
                guessSpans.forEach((span , spanIndex) => {

                    if(spanIndex == wordIndex){

                        span.textContent = wordLetter;
                    }
                    writtenWord[spanIndex] = span.textContent;
                });
            }
            
        });

        if(theStatus !== true){
            wrongAttempts++;
            // Add clss wrong at the hungman-draw to dispaly the draw parts ordinaly
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            // play fail song 
            // document.getElementById("fail").play();

            // if wrong attempts = 8 that mean the draw is complete and the game will be finished
            if( wrongAttempts == 8){
                endGame(false);
                lettersContainer.classList.add('finished');
            } 
        }  else {
            // document.getElementById("success").play();
            let successCounter = 0;
            for(let i = 0; i < chosedWord.length; i++){
                if(chosedWord[i] === writtenWord[i]){
                    successCounter++;
                }
                // the loop compare avery element of chosen word with written word elements
                // if they are the same he increment the counter by 1
            }
            if(successCounter == chosedWord.length){
                endGame(true);
            }
        }
    }
});

function endGame(endState) {
    let textPopup; // the text will be in the popup, it depend of endState value
        // Add class overlay at the first div
        document.body.firstElementChild.className = "overlay";

        // creat popup div
        let popup = document.createElement("div");
        popup.classList.add("popup");

        if(endState == true){
            textPopup = document.createTextNode(`Congratulation you finish game with ${wrongAttempts} failed attempts`);
        } else {
            textPopup = document.createTextNode(`Sorry, Game over the word is: ${randomValue}`);
        }
        // creat the replay button
        let replayBtn = document.createElement("span");
        replayBtn.id = "replay";
        replayBtn.textContent = "Replay";
        // Append all elements on the page
        popup.appendChild(textPopup);
        popup.appendChild(replayBtn);
        document.body.appendChild(popup); 
}

// Replay game function
document.addEventListener("click", e => {

    // console.log(e.target);
    if(e.target == document.getElementById("replay")){

        window.location.reload();

    }
});