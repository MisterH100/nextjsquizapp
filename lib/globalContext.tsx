'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { useLocalStroge } from "./usernameStorage";

interface contextProps{
  player: IPlayer,
  setPlayer: (Dispatch<SetStateAction<IPlayer>>),
  currQuiz: number,
  setCurrQuiz: (Dispatch<SetStateAction<number>>),
  points: number,
  setPoints: (Dispatch<SetStateAction<number>>)
  correctQuizzes: IQuiz[],
  setCorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  inCorrectQuizzes: IQuiz[],
  setInCorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  complete: boolean,
  setComplete: (Dispatch<SetStateAction<boolean>>),
  start: ()=> void,
  timed: boolean,
  setTimed:(Dispatch<SetStateAction<boolean>>)
}
export interface IAnswers{
  id: number,
  name: string
}
export interface IQuiz{
  id:number
  question: string,
  answers:IAnswers[],
  correctAnswer : string,
  points: number,
  answered: boolean,
  answer:string,
}
export interface IPlayer{
  username: string,
  loggedIn: boolean,
}
const QuizContext = createContext<contextProps>({} as contextProps)

export const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [player,setPlayer] = useLocalStroge<IPlayer>("quizPlayer",{} as IPlayer);
    const [currQuiz, setCurrQuiz] = useState(0);
    const [points, setPoints] = useState(0);
    const [correctQuizzes, setCorrectQuizzes] = useState<IQuiz[]>([ ]);
    const [inCorrectQuizzes, setInCorrectQuizzes] = useState<IQuiz[]>([ ]);
    const [complete,setComplete] = useState(false);
    const [timed,setTimed] = useState(false);

    const start =() =>{
      setComplete(false);
      setCurrQuiz(0);
      setCorrectQuizzes([]),
      setInCorrectQuizzes([]),
      setPoints(0)
    }

    return(
      <QuizContext.Provider value={{player,setPlayer,currQuiz,setCurrQuiz,points,setPoints,correctQuizzes,setCorrectQuizzes,inCorrectQuizzes,setInCorrectQuizzes,complete,setComplete,start,timed,setTimed}}>
          {children}
      </QuizContext.Provider>
    )
};

export const useQuizContext = () => useContext(QuizContext);
