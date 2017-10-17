/*   Calvinball Rules:
                1. A player's score is equal to 500 if their score is not already a number. (this is implemented below).
                2. A player's score is reduced by 300 if they are crying. Otherwise it is increased by 50.
                3. A player's score is reduced by 77 if their last play was "Q"
                4. A player gets an extra 395 points if they are in a tree, unless their last play was a number.
                5. A player's score is doubled if they are holding the broom handle, but it is tripled if they have the broom brush. Otherwise the player's score is halved.
                6. A player's score is multiplied by 1.5 if they are carrying the ball but only if they are not in a tree. Disregard this rule if the player is crying.
                7. If the player's last play was a number (not a letter), the player's score is multiplied by that amount.
        */

//document selectors
var startingPlayerScores = document.querySelector('.startingPlayerScores');
var gameResults = document.querySelector('.gameResults');
var winnerDisplay = document.querySelector('.winnerDisplay');

// game scoring variables
var gameOfCalvinBall = [];

//base player object to contain each players values for processing and score keeping
var Player = function (score, last_play, broom, has_ball, is_in_tree, crying) {
    'use strict';
    this.score = score;
    this.last_play = last_play;
    this.broom = broom;
    this.has_ball = has_ball;
    this.is_in_tree = is_in_tree;
    this.crying = crying;
};

var playerOne = new Player(193, 'Q', 'handle', false, false, false);
/*
//Player One
var score = 193;
var last_play = "Q";
var broom = "handle";
var has_ball = false;
var is_in_tree = false;
var crying = false;
*/

var playerTwo = new Player(394, 'W', 'none', true, true, false);
/*
 //Player Two
 var score = 394;
 var last_play = "W";
 var broom = "none";
 var has_ball = true;
 var is_in_tree = true;
 var crying = false;
 */

var playerThree = new Player('f', 1.5, 'brush', true, false, true);
/*
//Player Three
var score = "f";
var last_play = 1.5;
var broom = "brush";
var has_ball = true;
var is_in_tree = false;
var crying = true;
*/

var playerFour = new Player('ZE', 3.64, 'brush', false, true, true);
//player 4
/*var score = 'E';
var last_play = "Q";
var broom = "brush";
var has_ball = false;
var is_in_tree = true;
var crying = true;
*/


//array containing the four player scores
gameOfCalvinBall = [
    playerOne,
    playerTwo,
    playerThree,
    playerFour
];

//begins the game and displayes the results
function getCalvinBallResults() {
    'use strict';
    var displayResults = processCalvinBallScores(gameOfCalvinBall);
    var output = [];
    var resultString = '';


    displayResults.forEach(function (element, index) {
        output.push('Player ' + (index + 1) + ': ' +
            element);
    });

    resultString = output.join('<br>');
    gameResults.innerHTML = "<h4>" + resultString + "</h4>";

    return;
}

//process calvin ball array containing all four scores
function processCalvinBallScores(calvinBallScoreArray) {
    'use strict';

    var winningScore = [];
    var theWinnerIs = '';

    calvinBallScoreArray.forEach(function (element) {
        winningScore.push(playCalvinBall(element));
    });

    var highScore = Math.max.apply(Math, winningScore);
    theWinnerIs += 'The high score was: ' + highScore.toString() + '<br>';
    

    for (var i = 0; i < winningScore.length; i++) {
        if (highScore === winningScore[i]) {
            if (i === 0) {
                theWinnerIs += 'The Winner is Player One with a score of ' + highScore.toString() + '<br>';    
            }

            if (i === 1) {
                theWinnerIs += 'The Winner is Player Two with a score of ' + highScore.toString() + '<br>';    
            }

            if (i === 2) {
                theWinnerIs += 'The Winner is Player Three with a score of ' + highScore.toString() + '<br>';    
            }


            if (i === 3) {
                theWinnerIs += 'The Winner is Player Four with a score of ' + highScore.toString() + '<br>';    
            }


        }
    }
    winnerDisplay.innerHTML = "<h3>" + theWinnerIs + "</h3>";
    return (winningScore);
}

//process calvin ball scores for each player
function playCalvinBall(player) {
    'use strict';
    var gameScore = null;

    try {

        //check score
        if (player.score !== null) {
            gameScore = updateScore(player.score);
        } else {
            return;
        }


        if (!isNaN(gameScore)) {
            //process crying
            gameScore = processCrying(gameScore, player.crying);

            //process last_play
            gameScore = processLast_play(gameScore, player.last_play);

            //process is_in_tree
            gameScore = processIs_in_tree(gameScore, player.is_in_tree, player.last_play);


            //process broom
            gameScore = processBroom(gameScore, player.broom);

            //process has_ball
            gameScore = processHas_ball(gameScore, player.has_ball, player.is_in_tree, player.crying);




        }
    } catch (err) {
        console.log('There was a problem and now you have to find it with this clue: ' + err);
    }

    return (gameScore);
}

//score is equal to 500 if their score is not already a number.
function updateScore(score) {
    'use strict';

    if (isNaN(score)) {
        score = 500;
    }
    return (score);
}

//score is reduced by 77 if their last play was "Q"
//If the player's last play was a number (not a letter), the player's score is multiplied by that amount.
function processLast_play(score, last_playValue) {
    'use strict';
    if (last_playValue === 'Q') {
        score -= 77;
    }

    if (typeof (last_playValue) === 'number') {
        score = (score * last_playValue);
    }


    return (score);
}

//score is doubled if they are holding the broom handle, but it is tripled if they have the broom brush. Otherwise the player's score is halved.
function processBroom(score, broomValue) {
    'use strict';
    if (broomValue === 'handle') {
        score *= 2;
    }

    if (broomValue === 'brush') {
        score *= 3;
    }

    if (broomValue !== 'handle' && broomValue !== 'brush') {
        score *= 0.5;
    }

    return (score);

}

//A player's score is multiplied by 1.5 if they are carrying the ball but only if they are not in a tree. Disregard this rule if the player is crying.
function processHas_ball(score, has_ballValue, is_in_treeValue, cryingValue) {
    'use strict';
    if (has_ballValue === true && (is_in_treeValue === false && cryingValue === false)) {
        score *= 1.5;
    }

    return (score);

}

//gets an extra 395 points if they are in a tree, unless their last play was a number.
function processIs_in_tree(score, is_in_treeValue, last_playValue) {
    'use strict';
    if (is_in_treeValue === true && (typeof (last_playValue) === 'number')) {
        score += 395;
    }
    return (score);
}

//score is reduced by 300 if they are crying. Otherwise it is increased by 50.
function processCrying(score, cryingValue) {
    'use strict';
    if (cryingValue) {
        score -= 300;
    } else {
        score += 50;
    }

    return (score);
}


//timers for index page changes
//change starting scores display
setTimeout(function () {
    startingPlayerScores.innerHTML = buildStartingValuesDisplay(gameOfCalvinBall);
}, 2200);

//display game results
setTimeout(function () {
    getCalvinBallResults();
}, 4200);

//build string to display the four players starting values
function buildStartingValuesDisplay(displayScoresArray) {
    'use strict';
    var displayScores = '';

    displayScoresArray.forEach(function (element, index) {
        displayScores += '<strong>Player ' + (index + 1).toString() +
            '</strong> -  Score: ' + element.score.toString() +
            ' ~  Last Play:' + element.last_play + '\n' +
            ' ~  Broom: ' + element.broom +
            ' ~  Has Ball: ' + element.has_ball +
            ' ~  Is In Tree: ' + element.is_in_tree +
            ' ~  Crying:  ' + element.crying + '<br>';
    });

    return (displayScores);
}



// ===================    Testing Section ==========================================
function assertEqual(actual, expected, testName) {
    'use strict';
    if (actual === expected) {
        console.log(`Passed [${testName}].`);
        return;
    }

    console.log(`FAILED [${testName}] expected ${expected} but got ${actual} instead.\n`);
    return;
}

function assertCalvinBallArrayEqual(actual, expected, testName) {
    'use strict';
    actual = JSON.stringify(actual);
    expected = JSON.stringify(expected);

    if (actual === expected) {
        console.log(`Passed [${testName}].`);
        return;
    }

    console.log(`FAILED [${testName}] expected ${expected} but got ${actual} instead.\n`);
    return;


}

function testCalvinBall() {
    'use strict';

    console.log(processCalvinBallScores(gameOfCalvinBall));

    //testing assert statements section

    //test crying
    assertEqual(processCrying(450, true), 150, 'Test processing crying - Test:A'); // pass
    assertEqual(processCrying(450, false), 150, 'Test processing crying - Test:B'); // fail
    assertEqual(processCrying(250, true), 50, 'Test processing crying - Test:C'); // fail
    assertEqual(processCrying(450, false), 500, 'Test processing crying - Test:D'); // pass

    //test is_in_tree
    assertEqual(processIs_in_tree(250, true, 3), 645, 'Test processing is_in_tree - Test:E'); // pass
    assertEqual(processCrying(250, false, 'G'), 157, 'Test processing is_in_tree - Test:F'); // fail
    assertEqual(processCrying(250, true, 'W'), 250, 'Test processing is_in_tree - Test:G'); // fail

    //test has_ball
    assertEqual(processHas_ball(250, true, false, false), 375, 'Test processing has_ball - Test:H'); // pass
    assertEqual(processHas_ball(250, false, false, false), 375, 'Test processing has_ball - Test:I'); // fail
    assertEqual(processHas_ball(250, true, true, false), 645, 'Test processing has_ball - Test:J'); // fail
    assertEqual(processHas_ball(250, true, false, true), 159, 'Test processing has_ball - Test:K'); // fail

    //testing broom
    assertEqual(processBroom(284, 'handle'), 568, 'Test processing broom - Test:L'); // pass    
    assertEqual(processBroom(284, 'handle'), 400, 'Test processing broom - Test:M'); // fail    
    assertEqual(processBroom(284, 'brush'), 852, 'Test processing broom - Test:N'); // pass    
    assertEqual(processBroom(284, 'brush'), 568, 'Test processing broom - Test:O'); // fail    
    assertEqual(processBroom(284, 'Skiing'), 142, 'Test processing broom - Test:P'); // pass    
    assertEqual(processBroom(284, 'Skiing'), 568, 'Test processing broom - Test:Q'); // fail    

    //test last_play
    assertEqual(processLast_play(277, 'Q'), 200, 'Test processing last_play - Test:R'); // pass    
    assertEqual(processLast_play(277, 'T'), 300, 'Test processing last_play - Test:S'); // fail    
    assertEqual(processLast_play(150, 1.5), 225, 'Test processing last_play - Test:T'); // pass
    assertEqual(processLast_play(150, 1.5), 400, 'Test processing last_play - Test:U'); // fail    

    // test updateScore
    assertEqual(updateScore('W'), 500, 'Test processing score - Test:U'); // pass
    assertEqual(updateScore('W'), 400, 'Test processing score - Test:V'); // fail    
    assertEqual(updateScore(399), 399, 'Test processing score - Test:W'); // pass
    assertEqual(updateScore(119), 500, 'Test processing score - Test:X'); // fail  
    assertEqual(updateScore('@'), 500, 'Test processing score - Test:Y'); // pass
    assertEqual(updateScore('$'), 399, 'Test processing score - Test:Z'); // fail  

    //test player one
    console.log('Player One Score: ' + playCalvinBall(playerOne));
    assertEqual(playCalvinBall(playerOne), 332, 'Test playCalvinBall function - Test: 01 - Player1'); // pass
    assertEqual(playCalvinBall(playerOne), 155, 'Test playCalvinBall function - Test: 02 - Player1'); // fail

    //test player two
    console.log('Player Two Score: ' + playCalvinBall(playerTwo));
    assertEqual(playCalvinBall(playerTwo), 222, 'Test playCalvinBall function - Test: 03 - Player2'); // pass
    assertEqual(playCalvinBall(playerTwo), 422, 'Test playCalvinBall function - Test: 04 - Player2'); // fail

    //test player three
    console.log('Player Three Score: ' + playCalvinBall(playerThree));
    assertEqual(playCalvinBall(playerThree), 900, 'Test playCalvinBall function - Test: 05 - Player3'); // pass
    assertEqual(playCalvinBall(playerThree), 3456, 'Test playCalvinBall function - Test: 06 - Player3'); // fail

    //test player four
    console.log('Player Four Score: ' + playCalvinBall(playerFour));
    assertEqual(playCalvinBall(playerFour), 3369, 'Test playCalvinBall function - Test: 07 - Player4'); // pass
    assertEqual(playCalvinBall(playerFour), 8521, 'Test playCalvinBall function - Test: 08 - Player4'); // fail

    assertCalvinBallArrayEqual(processCalvinBallScores(gameOfCalvinBall), [332, 222, 900, 3369], 'Test processing game scores - Test A'); // pass

    assertCalvinBallArrayEqual(processCalvinBallScores(gameOfCalvinBall), [282, 247, 1950, 5555], 'Test processing game scores - Test B'); // fail

}

//uncomment the function call below to run tests.
//testCalvinBall();
