
let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    tie: 0,
};
console.log(score);

//score display dom
let scoreDisplayEl = document.querySelector('.js-score-display');
let autoPlayButtonEl = document.querySelector('.auto-play-button');
let moveDisplayEl = document.querySelector('.js-move');
let resultDisplayEl = document.querySelector('.js-result');
let resetMessageEl = document.getElementById('js-reset-message');
updateScore();

//EVENT Listener
document.querySelector('.rock-button').addEventListener('click',() => playGame('Rock'));
document.querySelector('.paper-button').addEventListener('click',() => playGame('Paper'));
document.querySelector('.scissors-button').addEventListener('click',() => playGame('Scissors'));

document.body.addEventListener('keydown', (event) =>{
    console.log(event.key);
    if(event.key === 'r'){
        console.log("HI ROCK")
        playGame('Rock');
    } else if(event.key === 'p'){
        playGame('Paper');
    } else if(event.key === 's'){
        playGame('Scissors');
    }
})







//Functions
function pickComputerMove() {
    const minNum = 1;
    const maxNum = 3;
    let computerMove = '';


    let rdmNum = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    computerMove = '';
    if (rdmNum === 1) {
        computerMove = 'Rock';
    } else if (rdmNum === 2) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    return computerMove;
}

function playGame(playerMove) {

    let computerMove = pickComputerMove();
    let result = '';

    if (playerMove == 'Rock') {
        console.log(playerMove + " " + 'Rock')
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'Lose';

        } else {
            result = 'Win';
        }
    } else if (playerMove == 'Paper') {
        if (computerMove === 'Rock') {
            result = 'Win';
        } else if (computerMove === 'Paper') {
            result = 'Tie';
        } else {
            result = 'Lose';
        }

    } else if (playerMove == 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'Lose';
        } else if (computerMove === 'Paper') {
            result = 'Win';
        } else {
            result = 'Tie';
        }
    } else {
        return 'Invalid move';
    }


    storeScore(result);
    resultDisplayEl.innerHTML = `${result}`;

    moveDisplayEl.innerHTML = `
        <div>You</div>
        <img src="resources/${playerMove}.png" alt="" width="50px">
        <img src="resources/${computerMove}.png" alt="" width="50px">
        <div>Computer</div>
        `;
    updateScore(result, playerMove, computerMove)

}

function updateScore(result, playerMove, computerMove) {
    scoreDisplayEl.innerHTML =
        `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

function resetScore() {
    score = {
        win: 0,
        lose: 0,
        tie: 0,
    }

    // localStorage.setItem('score', JSON.stringify(score));
    localStorage.removeItem('score');
    updateScore();
}


function storeScore(result) {
    switch (result) {
        case 'Win': score.win += 1;
            break;
        case 'Lose': score.lose += 1;
            break;
        case 'Tie': score.tie += 1;
            break;
        default: break;
    }

    localStorage.setItem('score', JSON.stringify(score));

}

let isAutoPlayOn = false;

let intervalId;
function autoPlay() {
    if(isAutoPlayOn){
        stopAutoPlay();
        return;
    }

        resetMessageEl.innerHTML = `
            <p>Are you sure you want to AutoPlay the game? </p> 
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
        `


    document.querySelector('.yes-btn').addEventListener('click', startAutoPlay);

    document.querySelector('.no-btn').addEventListener('click', () => {
        resetMessageEl.innerHTML = '';
    });

    
   


}

function startAutoPlay() {
    isAutoPlayOn = true;

    autoPlayButtonEl.innerHTML = 'Stop';

    resetMessageEl.innerHTML = '';

    intervalId = setInterval(() => {
        playGame(pickComputerMove());
    }, 1000);
}

function stopAutoPlay() {
    isAutoPlayOn = false;

    autoPlayButtonEl.innerHTML = 'Auto Play';

    clearInterval(intervalId);
}

document.querySelector('.auto-play-button').addEventListener('click', () => {
   autoPlay();
});






//   if(!isAutoPlayOn){
        
//         resetMessageEl.innerHTML = `
//             <p>Are you sure you want to to reset the score? </p> 
//             <button onClick="autoPlay();">Yes</button>
//             <button>No</button>
//         `
//     } else {
//          resetMessageEl.innerHTML = '';
//          autoPlay();
//     }