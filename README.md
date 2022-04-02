# ANT RACE 
[![release](https://img.shields.io/badge/release-v0.1-red.svg?style=flat-square)]()
An ant race front end simulation built in react 

The Project:
-----------
# Algorithm that determines the win
```
###### function generateAntWinLikelihoodCalculator() {
###### const delay = 7000 + Math.random() * 7000;
###### const likelihoodOfAntWinning = Math.random();
###### return (callback) => {
######   setTimeout(() => {
######      callback(likelihoodOfAntWinning);
######    }, delay);
######  };
###### }
```
- algorithm cannot be modified

- Users must be able to tap a button that loads the ant data 
- When data has been fetched, User must be able to Start a Race, which triggers running calculations on all ants simultaneously.
- When data has been fetched, UI must display the global state of the race (not yet run, in progress, all calculated).

- When a race is ongoing, as the results come in, the list of ants must be ordered by calculated likelihood of winning
    - highest
    - lowest
    - not yet calculated
- repo can be cloned and then run 
```
npm install && npm start locally
```