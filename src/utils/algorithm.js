export const generateAntWinLikelihoodCalculator = (id, inProgress) => {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();
    inProgress(id, delay)
    return function (callback) {
      setTimeout(function () {
        callback(id, likelihoodOfAntWinning);
      }, delay);
    }
  }