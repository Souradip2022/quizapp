import {createContext, useContext} from "react";

export const context = createContext({
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  totalTime: null,
  correct: null,
  totalPoints: 0,
  answeredIndex: []
});

export const ContextProvider = context.Provider;

export default function useApp () {
  return useContext(context);
}