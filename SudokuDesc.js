const _board = [
  ["7", ".", "4", "8", ".", ".", "3", ".", "1"],
  ["8", "2", ".", "5", ".", ".", ".", "4", "."],
  [".", ".", "9", "4", "3", ".", "5", ".", "."],
  ["3", "1", ".", ".", ".", ".", "8", ".", "7"],
  [".", "8", ".", ".", ".", ".", ".", "1", "."],
  ["9", ".", "7", ".", ".", ".", ".", "3", "2"],
  [".", ".", "6", ".", "1", "5", "4", ".", "."],
  [".", "7", ".", ".", ".", "9", ".", "6", "5"],
  ["5", ".", "8", ".", ".", "2", "1", ".", "3"]
];
sudokuSolver(_board);
// console.log(_board);

// funkcja sprawdzająca czy zmienna k z funkcji sudokuSolver pasuje do pustego pola z tej samej funkcji (i,j - współrzędne)
function isValid(board, row, col, k) {
  for (let z = 0; z < 9; z++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(z / 3);
    const n = 3 * Math.floor(col / 3) + (z % 3);
    if (board[row][z] == k || board[z][col] == k || board[m][n] == k) {
      // warunek sprawdzajacy dla kazdego pola z:
      // 1. rzędu
      // 2. kolumny
      // 3. kwadratu 3x3
      // czy podana wartość zmiennej k wsytępuje na którymkolwiek z pól występujących w rzędzie/kolumnie/kwadracie 3x3
      return false; // jesli wartosc zmiennej k się pokrywa, funckja zwraca false i kolejna wartosc k jest sprawdzana
    }
  }
  return true; // jesli nie pokrywa to znaczy ze to nasza szukana liczba - zostaje przekazana
  // dalej i wpisana w puste pole
}

function sudokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == ".") {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = `${k}`;
            // po wstawieniu w pole cyfry funkcja zatrzymuje się na iteracjach i, j opisujacych
            // współrzędne tego pola oraz iteracji k równej znalezionej liczbie.

            if (sudokuSolver(data)) {
              return true; //zwraca true zamykając instancję (liczba w polu znaleziona i jest dobrze)
            } else {
              data[i][j] = ".";
            }
          }
        }
        return false; //zwraca false jak przeiteruje wszystkie mozliwosci k w danym pustym polu i zadna nie pasuje
      }
    }
  }
  return true; //zwraca true jak przeiteruje do konca pola (i,j) i nie znajdzie pustych miejsc
}

console.log(_board[0]);
console.log(_board[1]);
console.log(_board[2]);
console.log(_board[3]);
console.log(_board[4]);
console.log(_board[5]);
console.log(_board[6]);
console.log(_board[7]);
console.log(_board[8]);

// kroki:
// 1. funckja sudokuSolver iteruje bo tablicach za pomocą zmiennych i, j (wspolrzedne) szukajac pustych mmiejsc
// 2. po znalezieniu pustego miejsca w punkcjie o wsp. i j zaczyna sie iteracja ze zmienną k
// zmienna k o określonej wartości wrac ze wspolrzednymi pustego miejsca dla ktorego szukamy liczby (i, j)
// przekazywana jest do funkcji isValid.
// 3. w funkcji isValid iterujemy za pomocą zmiennej z wszystkie pola z rzędu, kolumny i kwadratu 3x3 odpowiadające
// polu w ktorym szukamy wartosci, sprawdzając czy występuje tam liczba o wartości równej zmiennej k.
// 4. jeżli występuje zwracamy false i sprawdzamy kolejną wartość k. Jeśli nie, zwracamy true i wpisujemy znalezioną liczbę w pole.

// Następuje rekurencja (incepcja). - funkcja odpalana w funckji. W zamarzniętej funkcji uruchamiana
// zostaje kolejna funkcja która szukać będzie od początku pustego pola - iteracje zaczynają się od początku
// w kolejne puste pole wstawia kolejną liczbę zatrzymując się na iteracjach i, j rownych temu polu
// oraz k rownej znalezionej liczbie. I tak dla kazdego pustego pola odpalają się kolejne instancje funkcji
// do momentu wypelnienia wszystkich pól (funkcja przeiteruje i, j do konca
// nie przejdzie warunku data[i][j] == "." zwróci 'true' i zacznie zamykac po koleji swoje zamrozone instancje zwracajace true)
// ,lub do momentu trafienia na pole
// gdzie zadna liczba nie pasuje. wtedy przeiteruje do konca zmienna k i warunek z funckją(isValid) nie zostaje spelniony.
// nasza funkcja sudokuSolver zwróci więc false co spowoduje wstawienie w miescje poprzednio
// znalezionej liczby pustego miejsca i podjecie kolejnej proby znalezienia liczyby WYŻSZEJ niz
// wstawiona poprzednio (dalsza iteracja zmiennej k). W razie nie znalezienia odpowiedniej liczby mechanizm
// się powtórzy i cofnie nas o kolejny krok do tyłu. I tak az do momentu kiedy wszystko bedzie ok. Wtedy wszystko
// znowu ruszy dalej.
