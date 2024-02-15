import {useEffect, useMemo, useRef, useState} from "react";
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
  const [selected, setSelected] = useState([false, false, false, false]);

  function handleClick(e, index) {
    dispatch({type: "newAnswer", payload: index});
    if (index !== currQuestion.correctOption) {
      setSelected((curr) =>
        curr.map((bool, ind) => (ind === index) && true)
      );
    }
  }

  const color = useMemo(() => {


  }, [selected])

  const nextBtn = useRef(null);

  function handleNext(e) {
    //nextBtn.current.classList.add("correct");
    dispatch({type: "nextQuestion"});
    console.log("Success");
  }

  return (
    <>
      <header className="progress">
        <progress></progress>
        <p>Question <strong>{index + 1}</strong> / {length}</p>
        <p><strong>{points}</strong> / {totalPoints}</p>
      </header>
      <div className="options">
        <h4>{currQuestion.question}</h4>
        {currQuestion.options.map((option, index) => (
          <button
            key={index}

            className={`btn btn-option ${color}
            ${index === answer && "answer"}
            ${(!hasAnswered) ?
              (index === currQuestion.correctOption) && "correct" : null}
            `}

            ref={(el) => buttonSelect.current[index] = el}
            onClick={(e) => handleClick(e, index)}>
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