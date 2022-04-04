import React, { useState } from 'react';
import seedData from "../src/api/data.json";

const AntRaceApp: React.FC = () => {  
  // needs all types updated if possible to strictest type/interface declaration
  // This is a Full Lean MVP version of the Entire App in one TypeScript/TSX file
  // Initial basic version runs HERE: https://codesandbox.io/s/react-typescript-forked-xvi26r?file=/src/App.tsx
  // eslint-disable-next-line
  interface Provider {
    [idx: string]: number | string;
    length: number;
    name: string;
    ants: any;
    weight: number;
  }

  const [ants, setAnts] = useState<object>({});
  // eslint-disable-next-line
  const [updateAnts, setUpdateAnts] = useState<object>({});
  
  const calculateOdds = (): void => {
    function updateAnts(chances: any, idx: any) {
      const updateAnts: any = Object.assign({}, { ants });
      updateAnts.ants[idx].likelihoodOfAntWinning = chances;
      updateAnts.ants[idx].calculatingOdds = "Calculating...";
      setUpdateAnts(updateAnts);
    }
    function generateAntWinLikelihoodCalculator(): any {
      var delay = 7000 + Math.random() * 7000;
      var likelihoodOfAntWinning = Math.random();
      return function (callback: any) {
        setTimeout(function () {
          callback(likelihoodOfAntWinning);
        }, delay);
      };
    }
    // eslint-disable-next-line
    Object.keys(ants).map((idx): void => {
      updateAnts("", idx);
      const callback = (likelihoodOfAntWinning: any) => {
        updateAnts(likelihoodOfAntWinning, idx);
      };
      generateAntWinLikelihoodCalculator()(callback);
    });
  };

  const loadData = () => {
    const ants: any = {};
    const fetchData = async (): Promise<void> => {
      const result = seedData;
      result.ants.forEach((ant: any, idx: any) => {
        ants[idx] = ant;
        ants[idx].likelihoodOfAntWinning = "";
        ants[idx].calculatingOdds = "";
      });
      setAnts(ants);
    };
    fetchData();
  };

  
  const antBuilder = () => {
    let ant: any = Object.keys(ants)
      .sort((a: string, b: string) => ants[a].likelihoodOfAntWinning - ants[b].likelihoodOfAntWinning)
      .reverse()
      .map((idx) => {
        let racerId = "racer" + idx;
        let odds = Math.round(ants[idx].likelihoodOfAntWinning * 100) + "%";
        return (
          <React.Fragment>
            <section className="card">
              <ul id="racers" className={racerId}>
                <li>
                  Odds of winning: {ants[idx].calculatingOdds}
                  {ants[idx].likelihoodOfAntWinning}
                </li>
                <li>
                  {ants[idx].name} has a {odds} probability of winning
                </li>
                <li>Name: {ants[idx].name}</li>
                <li>Length: {ants[idx].length}</li>
                <li>Weight: {ants[idx].weight}</li>
              </ul>
            </section>
          </React.Fragment>
        );
      });
    return ant;
  };

  const AntList = (): any => {
    return antBuilder();
  };

  return (
    <React.Fragment>
      <h1>Ant Race</h1>
      <br />
      <br />
      <main>
        <button type="button" onClick={loadData}>
          Load Ant Data
        </button>
        <button type="button" onClick={calculateOdds}>
          Start Racing
        </button>
        <h2>Highest</h2>
        {`Ant Race to the Top!`}
        <AntList />
        <h2>Lowest</h2>
      </main>
    </React.Fragment>
  );
};

export default AntRaceApp;