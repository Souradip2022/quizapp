import {useEffect, useRef} from "react";
import {useContext} from "react";
import useApp, {context} from "../../context/context_provider.js";
import Footer from "../Footer.jsx";

function QuestionPage() {
  const {dispatch} = useContext(context);
  const {questions, status, index, answer, points, secondsRemaining, totalPoints} = useApp();
  const length = questions.length;
  const currQuestion = questions[index];
  const buttonSelect = useRef([]);
  const hasAnswered = answer === null;

  function handleClick(e, markedIndex) {

    const button = buttonSelect.current[markedIndex];
    const correct = buttonSelect.current[currQuestion.correctOption];

    if (markedIndex === currQuestion.correctOption && hasAnswered === true) {
      button.style.backgroundColor = "green";
    } else {
      correct.style.backgroundColor = "green";
      button.style.backgroundColor = "red";
    }

    dispatch({type: "newAnswer", payload: markedIndex});
  }

  const nextBtn = useRef(null);

  function handleNext(e) {
    dispatch({type: "nextQuestion"});
    console.log("Success");
  }

  useEffect(() => {
    buttonSelect.current.map((btn) => btn.backgroundColor = '')
  }, [index, questions[index]]);

  return (
    <>
      <header className="progress">
        <progress></progress>
        <p>Question <strong>{index + 1}</strong> / {length}</p>
        <p><strong>{points}</strong> / {totalPoints}</p>
       </header>
      <div className="options">
        <h4>{currQuestion.question}</h4>
        {currQuestion.options.map((option, markedIndex) => (
          <button
            key={markedIndex}
            className={`btn btn-option ${markedIndex === answer ? "answer" : null}
            ${!hasAnswered
              ? markedIndex === currQuestion.correctOption
                ? ""
                : ""
              : null}`
            }
            disabled={!hasAnswered}
            ref={(el) => buttonSelect.current[markedIndex] = el}
            onClick={(e) => handleClick(e, markedIndex)}>
            {option}
          </button>
        ))}
      </div>
      {(status === "active") &&
        <footer style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
          <div className="timer">06:22</div>
          <button className="btn btn-ui"
                  onClick={(e) => handleNext(e)}
                  ref={nextBtn}>Next
          </button>
        </footer>
      }
    </>
  );
}

export default QuestionPage;