import React, { useState } from 'react';
//import seedData from '../src/api/data.json';
import '../App.css';

const AntRaceApp = () => {

  const [ants, setAnts] = useState({});
  // eslint-disable-next-line
  const [updateAnts, setUpdateAnts] = useState({});
  
  // needs all any type changed if possible to strictest type/interface declaration 
  // This is a Full Lean MVP version of the Entire App in one TypeScript/TSX file
  // Initial basic version runs HERE: https://codesandbox.io/s/react-typescript-forked-vguprc?file=/src/App.tsx
  const calculateOdds = () => {
    function updateAnts(chances:any, idx:any) {
      const updateAnts:any = Object.assign({}, {ants});
      updateAnts.ants[idx].likelihoodOfAntWinning = chances;
      updateAnts.ants[idx].calculatingOdds = "Calculating...";
      setUpdateAnts(updateAnts);
    }

    function generateAntWinLikelihoodCalculator() {
      var delay = 7000 + Math.random() * 7000;
      var likelihoodOfAntWinning = Math.random();
      return function(callback:any) {
        setTimeout(function() {
          callback(likelihoodOfAntWinning);
        }, delay);
      };
    }
    
    Object.keys(ants).map((idx) => {
      updateAnts('', idx);
      const callback = (likelihoodOfAntWinning:any) => {
        updateAnts(likelihoodOfAntWinning, idx);
      };
      generateAntWinLikelihoodCalculator()(callback);
    });
  }

    const loadData = () => {
    const ants:any = {};
    const fetchData = async () => {
      const result = seedData;
      result.ants.forEach((ant:any, idx:any) => {
        ants[idx] = ant;
        ants[idx].likelihoodOfAntWinning = "";
        ants[idx].calculatingOdds = "";
      });      
      setAnts(ants);
    };
    fetchData();
  };

  const AntList = () => {
    return antBuilder();
  }

  const antBuilder = () => {
      let ant:any = Object.keys(ants).sort((a:any, b:any) => ants[a].likelihoodOfAntWinning - ants[b].likelihoodOfAntWinning).reverse().map((idx) => {
      let racerId = "racer" + idx;
      let odds = Math.round(ants[idx].likelihoodOfAntWinning * 100)+"%";
      return (
        <section className="card"> 
        <ul id="racers" className={racerId}>
          <li>Odds of winning: {ants[idx].calculatingOdds}{ants[idx].likelihoodOfAntWinning}</li>
          <li>{ants[idx].name} has a {odds} probability of winning</li>
          <li>Name: {ants[idx].name}</li>
          <li>Length: {ants[idx].length}</li>
          <li>Weight: {ants[idx].weight}</li>
        </ul>
        </section>
      );
    })
    return ant;
  }

  return ( 
    <div>
      <button type="button" onClick={loadData}>Load Ant Data</button>
      <button type="button" onClick={calculateOdds}>Start Racing</button>
      <AntList />
    </div>
  );
};


export default AntRaceApp;