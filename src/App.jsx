import { useEffect, useMemo, useState } from "react";
import "./app.css"
import { MoneyPyramid } from "./money";
import Trivia from "./components/Trivia";
import { Data } from "./questions";
import Timer from "./components/timer";
import Start from "./components/Start";


function App() {
  //const moneyPyramid = MoneyPyramid;

  const [userName, setUserName] = useState(null);

  const moneyPyramid = useMemo(() => MoneyPyramid, []);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [stop, setStop] = useState(false);

  const [earned, setEarned] = useState("$ 0");

  const data = Data;

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
  }, [questionNumber, moneyPyramid])

  return (
    <div className="app">
      {userName ?
        <>
          <div className="main">
            {stop ? <h1 className="endText">You earned : {earned}</h1> :
              <>
                <div className="top">
                  <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} /> </div>
                </div>
                <div className="bottom"><Trivia
                  data={data} setStop={setStop}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                />
                </div>

              </>
            }
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((item) => {
                const classList = item.id === questionNumber ? "moneyListItem active" : "moneyListItem";
                return (
                  <li className={classList}>
                    <span className="moneyListItemNumber">{item.id}</span>
                    <span className="moneyListItemAmount">{item.amount}</span>
                  </li>
                )
              })}


            </ul>
          </div>
        </> : <Start setUserName = {setUserName} />}
    </div>
  );
}

export default App;
