// 4)	* Create a solution that will tell us what poker set
//we have. The solution is to deal us 5 cards
//from the standard 52 card deck. After that the solution
//is to tell us what is the best poker set. EXAM

const pokerDeck = require("./PokerDeck");
const fiveCards = [];

for (let i = 0; i < 5; i++) {
  let randomIndex = Math.floor(Math.random() * pokerDeck.length);
  let randomCard = pokerDeck.splice(randomIndex, 1)[0];
  fiveCards.push(randomCard);
}
const Card = function(suit, value) {
  this.suit = suit;
  this.value = value;
};

//-----------------------------modyfikacja kart i zamiana: A-> 14; K-> 13; Q-> 12; J->11
const modifiedCards = fiveCards.map(card => {
  if (typeof card.value === "string") {
    switch (card.value) {
      case "A":
        return new Card(card.suit, 14);
      case "K":
        return new Card(card.suit, 13);
      case "Q":
        return new Card(card.suit, 12);
      case "J":
        return new Card(card.suit, 11);
    }
  } else {
    return new Card(card.suit, card.value);
  }
});
console.log("Karty wylosowane", fiveCards);

//Karty do testowania zestawów, wszystkie zestawy są w Sets.js
// const testingCards = [
//   { suit: "hearts", value: 9 }, //Wysoka karta
//   { suit: "diamonds", value: 7 },
//   { suit: "clubs", value: 13 },
//   { suit: "spades", value: 10 },
//   { suit: "hearts", value: 8 }
// ];

//console.log("Karty zmodyfikowane", modifiedCards);

const showBestPokerSet = function(cards) {
  const sets = [];
  //funkcja która zwraca zestawy, z tym samym symbolem
  const checkSuit = function(suit) {
    const set = modifiedCards.filter(card => card.suit === suit);
    // const set = testingCards.filter(card => card.suit === suit); //TO ODBLOKUJ
    sets.push(set);
  };

  //sprawdzamy czy karty mają jednakowy kolor, aby wykryć "Poker Królewski" lub "Poker"
  const hearts = checkSuit("hearts");
  const diamonds = checkSuit("diamonds");
  const spades = checkSuit("spades");
  const clubs = checkSuit("clubs");

  const noGapSet = sets.filter(set => set.length > 0); //Wyrzucamy wolne przestrzenie ze znalezionych zestawów
  let sameSuit = noGapSet.filter(set => set.length === 5);
  sameSuit = sameSuit[0]; //Sprawdzamy czy wszystkie 5 kart jest w tym samym kolorze

  const decoded = function(cardsArray) {
    const decodedCards = cardsArray.map(card => {
      switch (card) {
        case 14:
          return "As";
        case 13:
          return "Król";
        case 12:
          return "Dama";
        case 11:
          return "Walet";
        default:
          return card;
      }
    });
    return decodedCards;
  };
  if (sameSuit) {
    //-----------------------------poszukiwanie Pokera Królewskiego
    const royalFlush = sameSuit.filter(
      card =>
        card.value === 14 ||
        card.value === 13 ||
        card.value === 12 ||
        card.value === 11 ||
        card.value === 10
    );

    //-----------------------------poszukiwanie Pokera
    const values = sameSuit.map(elem => elem.value).sort((a, b) => a - b); //posegregowanie kart od najniższej do najwyższej
    const straightFlush = [];
    for (let i = 0; i <= values.length; i++) {
      if (values[i + 1] - values[i] === 1) {
        straightFlush.push(values[i]);
        if (straightFlush.length === 4 && values[4] - straightFlush[3] === 1) {
          straightFlush.push(values[4]);
        }
      }
    }

    //----------------------------sprawdzanie czy mamy Poker Królewski bądź Poker
    if (royalFlush.length === 5) {
      return console.log(
        `Twoje karty tworzą Poker Królewski: W kolorze: ${sameSuit[0].suit}.`
      );
    } else if (straightFlush.length === 5) {
      return console.log(
        `Twoje karty tworzą Poker: W kolorze: ${sameSuit[0].suit}, o wartościach:`,
        `${decoded(straightFlush)}.`
      );
    }
  }
  //sprawdzamy jednakowe wartości kart, by sprawdzić czy mamy karete/fulla/trójkę/dwie pary/parę
  const elements = modifiedCards.map(card => card.value).sort((a, b) => a - b);
  // const elements = testingCards.map(card => card.value).sort((a, b) => a - b);
  const noDuplicatedElements = [...new Set(elements)];

  //pomocnicze zestawy kart, by sprawdzić czy mamy 4 takie same, lub 3 takie same
  const set0 = [];
  const set1 = [];
  const set2 = [];
  //jeżeli mamy tylko dwa rodzaje wartości kart, możemy sprawdzić karetę lub fulla
  if (noDuplicatedElements.length === 2) {
    elements.map(elem => {
      if (noDuplicatedElements[0] === elem) {
        set0.push(elem);
      } else {
        set1.push(elem);
      }
    });
    //jeżeli mamy tylko trzy rodzaje wartości kart, możemy sprawdzić trójkę lub dwie pary
  } else if (noDuplicatedElements.length === 3) {
    elements.map(elem => {
      if (noDuplicatedElements[0] === elem) {
        set0.push(elem);
      } else if (noDuplicatedElements[1] === elem) {
        set1.push(elem);
      } else {
        set2.push(elem);
      }
    });
  }

  //funkcja do poszukwiania dwóch par i zwracająca wartość zestawu (wartość wyższej pary)
  const selectSets = function(elements) {
    if (set0.length === set1.length) {
      if (set0[0] > set1[0]) {
        return set0[0];
      } else {
        return set1[0];
      }
    } else if (set0.length === set2.length) {
      if (set0[0] > set2[0]) {
        return set0[0];
      } else {
        return set2[0];
      }
    } else if (set1.length === set2.length) {
      if (set1[0] > set2[0]) {
        return set1[0];
      } else {
        return set2[0];
      }
    }
  };
  //sprawdzamy karty, by znaleźć strita
  const streightSeek = modifiedCards
    .map(card => card.value)
    .sort((a, b) => a - b);
  // const streightSeek = testingCards
  //   .map(card => card.value)
  //   .sort((a, b) => a - b);

  const streight = [];
  if (streightSeek[4] === 14) {
    for (let i = 0; i <= 4; i++) {
      if (streightSeek[i + 1] - streightSeek[i] === 1) {
        streight.push(streightSeek[i]);
        if (streight.length === 3 && streightSeek[3] - streight[2] === 1) {
          streight.push(streightSeek[3]);
        }
      }
    }
    if (streight.length === 4) {
      streight.push(streightSeek[4]);
    }
  } else {
    for (let i = 0; i <= streightSeek.length; i++) {
      if (streightSeek[i + 1] - streightSeek[i] === 1) {
        streight.push(streightSeek[i]);
        if (streight.length === 4 && streightSeek[4] - streight[3] === 1) {
          streight.push(streightSeek[4]);
        }
      }
    }
  }

  //----------------------------poszukiwanie karety
  if (set0.length === 4 || set1.length === 4) {
    return (
      console.log(`Twoje karty tworzą Karetę, o wartościach:`),
      set0.length > set1.length
        ? console.log(`${decoded(set0)[0]} na ${decoded(set1)}.`)
        : console.log(`${decoded(set1)[0]} na ${decoded(set0)}.`)
    );
  }

  //----------------------------poszukiwanie fulla
  //else if (set2 === "") {
  else if (
    (set0.length === 3 || set1.length === 3) &&
    (set0.length === 2 || set1.length === 2)
  ) {
    return (
      console.log("Twoje karty tworzą Fulla, o wartościach:"),
      set0.length > set1.length
        ? console.log(`${decoded(set0)[0]} na ${decoded(set1)[0]}.`)
        : console.log(`${decoded(set1)[0]} na ${decoded(set0)[0]}.`)
    );
  }
  // }

  //---------------------------poszukiwanie koloru
  else if (sameSuit) {
    if (sameSuit.length === 5) {
      const values = sameSuit.map(elem => elem.value).sort((a, b) => a - b); //posegregowanie kart od najniższej do najwyższej
      return (
        console.log(`Twoje karty tworzą Kolor: ${sameSuit[4].suit}.`),
        console.log(`O wartości ${decoded(values)[4]}.`)
      );
    }
  }

  //---------------------------poszukiwanie strita
  //else if (streight.length > 0) {
  else if (streight.length === 5) {
    return (
      console.log(`Twoje karty tworzą Strita.`),
      console.log(`O wartości ${decoded(streight)[4]}.`)
    );
  }
  // }

  //---------------------------poszukiwanie trójki
  else if (set0.length === 3 || set1.length === 3 || set2.length === 3) {
    const threeOfaKindCardsValue = (set0, set1, set2) => {
      if (set0.length === 3) return set0[0];
      else if (set1.length === 3) return set1[0];
      else return set2[0];
    };
    return console.log(
      `Twoje karty tworzą Trójkę, wartość trójki to: ${decoded([
        threeOfaKindCardsValue(set0, set1, set2)
      ])}.`
    );
  }

  //---------------------------poszukiwanie dwóch par
  else if (set1.length > 0) {
    if (
      set0.length === set1.length ||
      set0.length === set2.length ||
      set1.length === set2.length
    ) {
      return console.log(
        `Twoje karty tworzą Dwie pary, wartość par to: ${decoded([
          selectSets(elements)
        ])}.`
      );
    }
  }

  //---------------------------poszukiwanie jednej pary
  // noDuplicatedElements[i] != undefined
  else if (noDuplicatedElements.length === 4) {
    const onePairValue = [];

    for (let i = 0; i < elements.length; i++) {
      if (
        elements[i] === elements[i + 1] ||
        elements[i] === elements[i + 2] ||
        elements[i] === elements[i + 3] ||
        elements[i] === elements[i + 4]
      ) {
        onePairValue.push(elements[i]);
      }
    }

    return console.log(
      `Twoje karty tworzą Jedną parę, o wartości: ${decoded(onePairValue)}.`
    );
  }

  //---------------------------poszukiwanie wysokiej karty
  else if (noDuplicatedElements.length === 5) {
    const highCardSeek = noDuplicatedElements[4];
    switch (highCardSeek) {
      case 14:
        return console.log(`Twój układ to Wysoka karta: As.`);
      case 13:
        return console.log(`Twój układ to Wysoka karta: Król.`);
      case 12:
        return console.log(`Twój układ to Wysoka karta: Dama.`);
      case 11:
        return console.log(`Twój układ to Wysoka karta: Walet.`);
      case 10:
        return console.log(`Twój układ to Wysoka karta: 10`);
      case 9:
        return console.log(`Twój układ to Wysoka karta: 9`);
      case 8:
        return console.log(`Twój układ to Wysoka karta: 8`);
      case 7:
        return console.log(`Twój układ to Wysoka karta: 7`);
      case 6:
        return console.log(`Twój układ to Wysoka karta: 6`);
      case 5:
        return console.log(`Twój układ to Wysoka karta: 5`);
      case 4:
        return console.log(`Twój układ to Wysoka karta: 4`);
      case 3:
        return console.log(`Twój układ to Wysoka karta: 3`);
    }
  }
};
showBestPokerSet(modifiedCards);
//showBestPokerSet(testingCards); //Wyszukiwanie kart testowych
