/* 
You are given a deck containing n cards. While holding the deck:
Take the top card off the deck and set it on the table.
Take the next card off the top and put it on the bottom of the deck in your hand.
Continue steps 1 and 2 until all cards are on the table. This is a round.
Pick up the deck from the table and repeat steps 1-3 until the deck is in the original order.
*/

/*jshint esversion: 6 */ 


/**
* Compare if both the arrays are same
* @param {array} array1
* @param {array} array2
* @returns {index}
*/
function compareArrays(array1, array2) {
    
    if(array1.length != array2.length) return false;

    var isMatch = true;

    for(var i =0; i< array1.length; i ++){
        if(array1[i] != array2[i]) {
            isMatch = false;
        }
    }
    return isMatch;
}


/**
* Set the item to the bottom of the Array
* @param {array} arrayValue
* @param item
* @returns {Null}
*/
function letsUnshift(arrayValue, item) { 
    for (var i = arrayValue.length - 1; i >=0; i--) {
        arrayValue[i +1] = arrayValue[i];
    }
    arrayValue[0] = item;
};


/**
* Set the item to the top of the Array
* @param {array} arrayValue
* @returns {Null}
*/
function popElement(arrayValue) { 
    var newArr = []
    for (var i = arrayValue.length - 2; i >=0; i--) {
        newArr[i] = arrayValue[i];
    }
    return newArr;
};



/**
* Rearranging the cards based on the logic below
* - First Card will be placed on the table
* - Second card will be placed below the deck
* - This operation continues till the cards in hand are empty
* - Then the cards on the table is returned
* @param {array} cards
* @returns {array}
*/
function reArrangeCards(cards){
        
    var localCards = Array.from(cards);
   
    if(localCards.length == 0){
        return [];
    }

    var cardsOnTable = [];
    var secondArray = [];
    while(localCards.length > 0){
        var topCard = localCards[localCards.length - 1];
        localCards = popElement(localCards);
        cardsOnTable[cardsOnTable.length]  = topCard;
        if(localCards.length > 0){
            var secondCard = localCards[localCards.length - 1];
            localCards = popElement(localCards);
            letsUnshift(secondArray, secondCard);
        }
    }
    
    var secArraySorted = reArrangeCards(secondArray);
    return cardsOnTable.concat(secArraySorted);
} 


/**
* Checks if the Cards are in OriginalState
* @param {array} cards
* @returns {index}
*/
function isOrignalState(cards) {

    var index = 0;
    var localCards = Array.from(cards);
    var newCards  = [];
    var isMatched = false;
    
    while(!isMatched){
        newCards = reArrangeCards(localCards);
        isMatched = compareArrays(cards, newCards);
        localCards = newCards;
        index++;
    }

    return index;
}


/**
* Calculates the Number of Iteration a Cards will take to reach its Original State
* @param {string} Card
* @returns {Null}
*/
function iterationCalculator(Card){

    var cardNum = parseInt(Card);
    
    var cardsDeck = Array.from(Array(cardNum).keys()).map(function(x) {return x+1;});

    var NumberOfIteration = isOrignalState(cardsDeck);
    console.log("No. of Cards:" + cardNum + ". Number of Iterations to reach the orginal state:"+ NumberOfIteration);
}


function main() {
    var readlineSync = require('readline-sync');
    var inputCardNumber = readlineSync.question("Enter the number of cards: ");

    // Validation
    if(isNaN(inputCardNumber)){
        console.log("Input should be a Number. Exiting the code.");
        process.exit(1);
    }

    iterationCalculator(inputCardNumber);
}

main();