// Part 1: Number Facts

let API_URL = 'http://numbersapi.com';

// 1)
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

let favoriteNum = 6;
let ourFirstPromise = axios.get(`${API_URL}/${favoriteNum}?json`)
    .then(res => console.log(res.data.text))
    .catch(err => console.log("rejected", err));

// 2)
// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let multipleNums = [8,16,24,32];
let ourSecondPromise = axios.get(`${API_URL}/1,2,3`)
    .then(res => console.log(res.data))
    .catch(err => console.log("rejected", err));

// 3)
// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)

    thirdPromiseArr = [];

    let ourThirdPromise = axios.get(`${API_URL}/${favoriteNum}/`)
        .then(f1 => {
            console.log(`The first fact is: ${f1.data}`);
            thirdPromiseArr.push(f1.data);
            return axios.get(`${API_URL}/${favoriteNum}/`);
        })
        .then(f2 => {
            console.log(`The second fact is: ${f2.data}`);
            thirdPromiseArr.push(f2.data);
            return axios.get(`${API_URL}/${favoriteNum}/`);
        })
        .then(f3 => {
            console.log(`The third fact is: ${f3.data}`);
            thirdPromiseArr.push(f3.data);
            return axios.get(`${API_URL}/${favoriteNum}/`);
        })
        .then(f4 => {
            console.log(`The four fact is: ${f4.data}`);
            thirdPromiseArr.push(f4.data);
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        });

// Part 2: Deck of Cards

let DECK_API_URL = 'https://deckofcardsapi.com/api/deck';

// 1)
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    
let firstCard = axios.get(`${DECK_API_URL}/new/draw`)
    .then(res => {
        let { suit, value } = res.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })
    .catch(err => console.log("rejected", err));

// 2)
// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
    
let secondCard = axios.get(`${DECK_API_URL}/new/draw/`)
    .then(res => {
        let firstCard = res.data.cards[0];
        let deckId = res.data.deck_id;
        console.log(`The ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`);
        return axios.get(`${DECK_API_URL}/${deckId}/draw/`);
    })
    .then(res => {
        let secondCard = res.data.cards[0]; 
        console.log(`The ${secondCard.value} of ${secondCard.suit}`); 
    })
    .catch(err => console.log("rejected", err));

// 3)
// Once you have both cards, console.log the values and suits of both cards.
    
// please see above - I printed both cards to the console.

// 4)
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

function cardGame() {
  let $btn = $('button');
  let $cardArea = $('#card-area');

  let deckData = axios.get(`${DECK_API_URL}/new/shuffle/`)
    .then(data => {
      deckId = data.data.deck_id;
      $btn.show();
    })

  $btn.on('click', function() {
    axios.get(`${DECK_API_URL}/${deckId}/draw/`)
      .then(data => {
        let cardSrc = data.data.cards[0].image;
        $cardArea.append(
          $('<img>', {
            src: cardSrc
          })
        );
        if (data.data.remaining === 0) $btn.remove();
      })
  })
}


cardGame();

