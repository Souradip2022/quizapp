import useApp, {context} from "../context/context_provider.js";
import {useContext} from "react";

//console.log("Finish Page");

function FinishPage() {

  const {points, totalPoints} = useApp();
  const percentage = Math.floor((points / totalPoints) * 100);
  const {dispatch} = useContext(context);
  let score = [];
  //localStorage.clear();

  let oldData = JSON.parse(localStorage.getItem('points'));
  if (!oldData) { // Check if oldData is null or undefined
    oldData = []; // Initialize as empty array if null or undefined
  }
  oldData.push(points);
  localStorage.setItem('points', JSON.stringify(oldData));
  score = JSON.parse(localStorage.getItem('points'));
  let highScore = Math.max(...score);
  //console.log(highScore);
  //console.log(score);

  function restart() {
    dispatch({type: "restart"});
  }

  return (
    <>
      <main className="main">
        <p className="result">
          {percentage === 0 && <span>🤦‍♂️</span>}
          {percentage > 0 && percentage < 40 && <span>🤨</span>}
          {percentage >= 40 && percentage < 70 && <span>🙃</span>}
          {percentage >= 70 && percentage < 85 && <span>🎉</span>}
          {percentage >= 85 && percentage <= 100 && <span>🥇</span>}
          You scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
        </p>

        <p className="highscore">
          (Highest score: {highScore} points)
        </p>
        <footer style={{display: "flex", justifyContent: "space-between", width: "500p}"}}>
          <button className="btn" onClick={() => dispatch({type: "responsePage"})}>View response</button>
          <button className="btn" onClick={() => restart()}>Restart Quiz</button>
        </footer>
      </main>
    </>
  )
}

export default FinishPage;