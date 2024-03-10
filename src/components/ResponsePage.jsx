import useApp, {context} from "../context/context_provider.js";
import {useContext} from "react";

function ResponsePage() {
  const {answeredIndex, questions} = useApp();
  const {dispatch} = useContext(context);

  const style = {
    width: "60rem",
    paddingTop: "2rem",
    color: "white",
    border: "2px solid white",
    padding: "2rem",
    borderRadius: "1.4rem",
  }


  return (<>
    <main className="response-sheet">
      {questions.map((currQuestion, quesIndex) => (
        <div className="options"
             style={style}
             key={quesIndex}>
          <h3 style={{color: "white", border: "1px solid white", padding: "1.4rem", borderRadius: "5px"
          }}>{currQuestion.question}</h3>
          {currQuestion.options.map((option, index) => (<div
            key={index}
            className={`response-btn
                  ${index === answeredIndex[quesIndex] ? index === currQuestion.correctOption ? "correct" : "wrong" : null} 
                  ${index === currQuestion.correctOption && "correct"}
                `}>
            {option}
          </div>))}
        </div>))}
      <div style={{display: "flex", width: "60rem", justifyContent: "space-between"}}>
        <button className="btn" onClick={() => dispatch({type: "restart"})}>Reattempt</button>
        <button className="btn" onClick={() => dispatch({type: "finish"})}>Exit</button>
      </div>
    </main>
  </>);
}

export default ResponsePage;