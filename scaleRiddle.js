let balls = [1, 1, 2, 1, 1, 1, 1, 1];

const scaleRiddle = function(ballsSet) {
  const Ball = function(weight, index) {
    this.weight = weight;
    this.index = index;
  };

  const ballsWithIndexes = balls.map((ball, index) => new Ball(ball, index));

  let plate1 = [];
  let plate2 = [];
  let plate3 = [];

  const draw3balls = function(plate) {
    let randomIndex = Math.floor(Math.random() * balls.length);
    let randomBall = ballsWithIndexes.splice(randomIndex, 1, "pusty")[0];
    if (randomBall !== "pusty") {
      plate.push(randomBall);
    }
  };

  while (plate1.length < 3) {
    draw3balls(plate1);
  }

  while (plate2.length < 3) {
    draw3balls(plate2);
  }

  plate3 = ballsWithIndexes.filter(ball => ball !== "pusty");

  const plateWeight = function(plate) {
    return plate
      .map(ball => ball.weight)
      .reduce((a, b) => Number(a) + Number(b));
  };
  const plate1Weight = plateWeight(plate1);
  const plate2Weight = plateWeight(plate2);
  console.log("Plate1: ", plate1, "Plate2: ", plate2, "Plate3: ", plate3);

  if (plate1Weight === plate2Weight) {
    if (plate3[0].weight > plate3[1].weight) {
      return `Szukana kula znajdowała się na początku na ${plate3[0].index} indexie`;
    } else {
      return `Szukana kula znajdowała się na początku na ${plate3[1].index} indexie`;
    }
  } else if (plate1Weight > plate2Weight) {
    if (plate1[0].weight > plate1[1].weight) {
      return `Szukana kula znajdowała się na początku na ${plate1[0].index} indexie`;
    } else if (plate1[0].weight < plate1[1].weight) {
      return `Szukana kula znajdowała się na początku na ${plate1[1].index} indexie`;
    } else {
      return `Szukana kula znajdowała się na początku na ${plate1[2].index} indexie`;
    }
  } else {
    if (plate2[0].weight > plate2[1].weight) {
      return `Szukana kula znajdowała się na początku na ${plate2[0].index} indexie`;
    } else if (plate2[0].weight < plate2[1].weight) {
      return `Szukana kula znajdowała się na początku na ${plate2[1].index} indexie`;
    } else {
      return `Szukana kula znajdowała się na początku na ${plate2[2].index} indexie`;
    }
  }
};

console.log(scaleRiddle(balls));
