  // Refernces taken from https://www.youtube.com/watch?v=G8J13lmApkQ&t=1715s and udacity classes

    // Create the cards  two of each card because we need a match
    const iconsList = ['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'];
        const icons = shuffle(iconsList);

        const cardsCont = document.querySelector(".deck");
        let openedCard = [] ;
        let matchedCard = [];

     //Initialize the game 

    function startGame(){  
    startTimer();
    for ( let i = 0 ; i < icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="fa ${icons[i]}"></i>`;
    cardsCont.appendChild(card);

    // Add click event to each card

    click(card);
    }
    }

    //Card click event

    function click(card) {
    card.addEventListener("click", function(){

        const currentCard = this;
        const previousCard = openedCard[0];

    // Condition if there is already an opened card 

    if (openedCard.length === 1){
        card.classList.add ("open" , "show", "disabled");
        openedCard.push(this);

     // Comparing two opened cards
        compare(currentCard,previousCard);
    }
    
    // DOnt have any already opened card
    else
    {
        card.classList.add ('open' , 'show', "disabled");
        openedCard.push(this);  
    }
    });
    }
    
    //Check if the game is over and message for game completion

    function isOver(){
        if (matchedCard.length === icons.length){
        alert("GAME OVER! YOU Won! Do You Want to Play Again? Your Stars are " +  countStars  +  ". Your moves are "   +  movesCont.innerHTML  + 
                ". Your timing in seconds is "    +  timer.innerHTML );

     // Clearing the timer after gave over message

    clearInterval(timing); 
    }
    }


    // Count the number of moves

    let movesCont = document.querySelector(".moves");
    let move = 0;

    function addMove(){
        move ++;
        movesCont.innerHTML = move; 

    //Set the rating

        starRate();

    }

    // compare the two cards function

    function compare(currentCard,previousCard){
        if (currentCard.innerHTML === previousCard.innerHTML){
            currentCard.classList.add("match" , "disabled");
            previousCard.classList.add("match" , "disabled");
            matchedCard.push(currentCard,matchedCard);
            openedCard = [];
        
    // Check  for gameover
            isOver();
        
        }else{
        
            // Wait for cards to open up
            setTimeout (function(){
                currentCard.classList.remove("open" , "show" , "disabled");
            previousCard.classList.remove("open" , "show" , "disabled");
            openedCard = [];},500); 
        }
        addMove();
    }

    // Timer that resets with restart/play again buttons


    const timer = document.querySelector('.timer');
    let timing; 
    let second = 0; 

    function startTimer() {
        timing = window.setInterval(function () {
            timer.innerHTML = second + " secs";
                second++;
            }, 1000);
    }

    // Reset the timer

    function resetTimer() {
        clearInterval(timing);
    }

    // Star rating

    const starCont = document.querySelector(".stars");
    starCont.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    let countStars = 3 ;
        function starRate(){
            if ( move < 20 ){
            starCont.innerHTML = ` <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
            countStars = 2 ;
            }
            else {
                starCont.innerHTML = `<li><i class="fa fa-star"></i></li>`;
                countStars = 1 ;
            }
            
        }


    // restart button functionality

    const restartBtn = document.querySelector('.restart');
        restartBtn.addEventListener('click',function(){
        // Delete all cards
        cardsCont.innerHTML = "";
        //again start game
        startGame();
        //Set matched array to 0 and reset the move to 0 , rating to three stars and timer to 0;
        matchedCard = [];
        move = 0;
        movesCont.innerHTML = move;
        starCont.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        resetTimer();
        second = 0;

    });

    // Start the game 

    startGame()

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

