import {useContext, useState} from "react";
import useApp, {context} from "../context/context_provider.js";
import QuestionPageFooter from "./QuestionPageFooter.jsx";

function QuestionPage() {
  const {dispatch, setAnsweredIndex} = useContext(context);
  const {questions, index, answer, points, totalPoints, answeredIndex} = useApp();
  const length = questions.length;

  const currQuestion = questions[index];
  const hasAnswered = answer !== null;
  //console.log(currQuestion.question);
  // console.log(answeredIndex);

  return (
    <>
      {index !== length &&
        <>
          <header className="progress">
            <progress max={length} value={index + Number(answer !== null)}/>
            <p>Question <strong>{index + 1}</strong> / {length}</p>
            <p><strong>{points}</strong> / {totalPoints}</p>
          </header>
          <div className="options">
            <h4>{currQuestion.question}</h4>
            {currQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`btn btn-option 
            ${index === answer ? "answer" : ""}
            ${hasAnswered ? index === answer ?
                    (answer === currQuestion.correctOption) ?
                      "correct" : "wrong"
                    : null
                  : null
                }
            ${(hasAnswered) ?
                  (index === currQuestion.correctOption) && "correct" : null}
            `}

                disabled={hasAnswered}
                onClick={() => {
                  setAnsweredIndex(() => [...answeredIndex, index])
                  dispatch({type: "newAnswer", payload: index});
                }}>
                {option}
              </button>
            ))}
          </div>
          <QuestionPageFooter answered={hasAnswered}
                              length={length}/>
        </>}
    </>
  );
}

export default QuestionPage;