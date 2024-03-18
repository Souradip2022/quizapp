import {useEffect, useReducer, useState} from "react";
import {ContextProvider} from "./context/context_provider.js";
import './index.css';
import Header from "./components/Header.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartPage from "./components/StartPage.jsx";
import QuestionPage from "./components/QuestionPage.jsx";
import FinishPage from "./components/FinishPage.jsx";
import ResponsePage from "./components/ResponsePage.jsx";


function App() {

  const TIME_PER_QUESTION = 30;
  const initialState = {
    // 'loading', 'error', 'ready', 'active', 'finished'
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highestScore: 0,
    totalTime: null,
  }

  const [{questions, status, index, answer, points, highestScore,
    totalTime}, dispatch] = useReducer(reducer, initialState);


  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready"
        };

      case "dataFailed":
        return {
          ...state,
          status: "error"
        };

      case "start":
        return {
          ...state,
          status: "active",
          totalTime: state.questions.length * TIME_PER_QUESTION
        };

      case "newAnswer": {
        const question = state.questions[state.index];

        return {
          ...state,
          answer: action.payload,
          points: (action.payload === question.correctOption) ? state.points + question.points : state.points
        };
      }

      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null
        };

      case "finish":
        return {
          ...state,
          index: 0,
          status: "complete"
        }

      case "restart":
        return {
          ...state,
          points: 0,
          status: "active"
        }

      case "responsePage":
        return {
          ...state,
          status: "response"
        }
      default:
        throw new Error("Unknown error");
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://localhost:8000/questions", {signal: controller.signal})
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`API request failed with status ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then(data => {
        dispatch({type: "dataReceived", payload: data});
      })
      .catch((err) => {

        if (err.name === 'AbortError') {
          console.log('Fetch aborted'); // Optionally log abort error
        } else {
          console.log("rejected: " + err.message); // Log application-specific error message
          dispatch({type: "dataFailed"});
        }
      });

    return () => controller.abort();
  }, []);

  let initVal = 0;
  const totalPoints = questions.reduce((sum, currVal) => sum + currVal.points, initVal);
  //console.log(totalPoints);

  useEffect(() => {
    const len = questions.length;
    if (index === len) dispatch({type: "finish"});
  }, [index]);

  const [answeredIndex, setAnsweredIndex] = useState([]);

  return (
    <>
      <ContextProvider
        value={{questions, status, index, answer, points, highestScore, totalTime, dispatch, totalPoints, answeredIndex, setAnsweredIndex}}>
        <div className="app">
          <Header/>
          <main className="main">
            {status === "loading" && (<Loader/>)}

            {status === "error" && (<Error/>)}

            {status === "ready" && (<StartPage/>)}

            {status === "active" && (<QuestionPage/>)}

            {status === "complete" && (<FinishPage/>)}

          </main>
          {status === "response" && (<ResponsePage/>)}
        </div>
      </ContextProvider>
    </>
  )
}

export default App
