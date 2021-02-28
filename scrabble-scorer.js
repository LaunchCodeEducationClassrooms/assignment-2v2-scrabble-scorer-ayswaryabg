// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for ( pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
  console.log("Let's play some Scrabble!\n");
    word = input.question("Enter a word to score: ");
};

let simpleScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
    letterPoints++;
  }
  return letterPoints;
  };/*{
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScore1
};*/
let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i])){
      letterPoints = letterPoints + 3;
    } else {
      letterPoints = letterPoints + 1;
    }
  }
  return letterPoints;
  };/*{
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScore1
};*/
let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
    let points = word[i];
    letterPoints += newPointStructure[points];
  }
  return letterPoints;
  };  /*{
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScore1
};*/

const scoringAlgorithms =  [({ name: 'Simple Score', description: 'Each letter is worth 1 point', scoringFunction: simpleScore}),
({ name: 'Bonus Vowels', description: 'Vowels are 3pts, consonants are 1pt', scoringFunction: vowelBonusScore}),
({name: 'Scrabble', description: 'Traditional Scoring Algorithm', scoringFunction: scrabbleScore})
];

function scorerPrompt() {
  console.log("\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system");
  let num = input.question("\nEnter 0, 1, or 2: ");
  while(num > 2 || num < 0){
    num = input.question("\nInvalid Input! Please enter a valid input:");
  }
  console.log("\nAlgorithm Name:" , scoringAlgorithms[num].name);
  console.log(`\nScore for '${word}':` , scoringAlgorithms[num].scoringFunction(word));
};

function transform(oldPointStructure) {
  const fasterScore = {};
  for(let item in oldPointStructure){
    for (let i in oldPointStructure[item])
    fasterScore[oldPointStructure[item][i].toLowerCase()] = Number(item);
  }
  return fasterScore;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;
//console.log(newPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

