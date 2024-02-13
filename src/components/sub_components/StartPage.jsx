import {useContext} from "react";
import useApp, {context} from "../../context/context_provider.js";

function StartPage() {
  const {dispatch} = useContext(context);
  const {questions} = useApp();
  const length = questions.length;

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {length} questions to test your react mastery
      </h3>
      <button className="btn btn-ui"
              onClick={() => dispatch({type: "start"})}>
        Let's start
      </button>
    </div>
  )
}

export default StartPage;