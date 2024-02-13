import useApp, {context} from "../context/context_provider.js";
import {useContext, useEffect, useRef} from "react";

function Footer({removehandleClick}) {

  const {status, index} = useApp();
  const {dispatch} = useContext(context);
  const nextBtn = useRef(null);



  function handleNext(e) {
    const newIndex = index + 1;
    dispatch({type: "nextQuestion", payload: newIndex})
    console.log("Success");
  }

  return (
    <>
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

export default Footer;
