import useApp, {context} from "../context/context_provider.js";
import {useContext, useEffect, useRef, useState} from "react";

// eslint-disable-next-line react/prop-types
function QuestionPageFooter({answered, length}) {

  const {status, index, totalTime} = useApp();
  const {dispatch} = useContext(context);
  const nextBtn = useRef(null);
  const [secondsRemaining, setSecondsRemaining] = useState(totalTime);

  function handleNext() {
    const newIndex = index + 1;
    if (index !== length) dispatch({type: "nextQuestion", payload: newIndex});
    //console.log("Success");
  }

  useEffect(() => {
    const intervalID = setInterval(function () {
      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);

    if (secondsRemaining === 0) dispatch({type: "finish"});
    return () => {
      clearInterval(intervalID);
    }
  }, [secondsRemaining]);

  return <>
    {status === "active" &&
      <footer style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
        <div className="timer">{`${Math.floor(secondsRemaining / 60)}  :  ${secondsRemaining % 60}`}</div>
        <button className={`btn ${!answered ? "btn-gray" : null}`}
                disabled={!answered}
                onClick={() => handleNext()}
                ref={nextBtn}> {index !== length - 1 ? "Next" : "Finish"}
        </button>
      </footer>
    }
  </>;
}

export default QuestionPageFooter;
