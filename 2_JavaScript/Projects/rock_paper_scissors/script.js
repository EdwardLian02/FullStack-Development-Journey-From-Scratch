


    


    let cartQty = 0;

    let score = JSON.parse(localStorage.getItem('score')) ||{
            win: 0, 
            lose: 0, 
            tie: 0,
        };;
     console.log( score);

       //score display dom
        let scoreDisplayEl = document.querySelector('.js-score-display');
        let moveDisplayEl = document.querySelector('.js-move');
        let resultDisplayEl = document.querySelector('.js-result');
            updateScore();
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

        return computerMove
    }

    function playGame(playerMove) {
    
        let computerMove = pickComputerMove();
        let result = '';

        if (playerMove == 'Rock') {
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
        updateScore( result, playerMove, computerMove)

    }

    function updateScore( result, playerMove, computerMove){
            scoreDisplayEl.innerHTML = 
                `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;
    }

    function resetScore(){
        score = {
            win: 0, 
            lose: 0, 
            tie: 0,
        }

        // localStorage.setItem('score', JSON.stringify(score));
        localStorage.removeItem('score');
        updateScore();
    }


    function storeScore(result){
        switch(result){
            case 'Win': score.win += 1;
                        break;
            case 'Lose': score.lose +=1;
                        break;
            case 'Tie': score.tie += 1;
                        break;
            default: break;
        }

          localStorage.setItem('score', JSON.stringify(score));

    }


