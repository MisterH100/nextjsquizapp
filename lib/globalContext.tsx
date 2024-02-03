'use client'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useLocalStroge } from "./usernameStorage";

interface contextProps{
  user: IUser,
  setUser: (Dispatch<SetStateAction<IUser>>),
  currQuiz: number,
  setCurrQuiz: (Dispatch<SetStateAction<number>>),
  points: number,
  setPoints: (Dispatch<SetStateAction<number>>)
  correctQuizes: IQuiz[],
  setCorrectQuizes: (Dispatch<SetStateAction<IQuiz[]>>),
  inCorrectQuizes: IQuiz[],
  setInCorrectQuizes: (Dispatch<SetStateAction<IQuiz[]>>),
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
  answerd: boolean,
  answer:string,
}
export interface IUser{
  username: string,
  loggedIn: boolean
}
const QuizContext = createContext<contextProps>({} as contextProps)

export const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user,setUser] = useLocalStroge<IUser>("username",{} as IUser);
  
    const [currQuiz, setCurrQuiz] = useState(0);
    const [points, setPoints] = useState(0);
    const [correctQuizes, setCorrectQuizes] = useState<IQuiz[]>([ ]);
    const [inCorrectQuizes, setInCorrectQuizes] = useState<IQuiz[]>([ ]);
    const [complete,setComplete] = useState(false);
    const [timed,setTimed] = useState(false);

    const start =() =>{
      setComplete(false);
      setCurrQuiz(0);
      setCorrectQuizes([]),
      setInCorrectQuizes([]),
      setPoints(0)
    }

    return(
      <QuizContext.Provider value={{user,setUser,currQuiz,setCurrQuiz,points,setPoints,correctQuizes,setCorrectQuizes,inCorrectQuizes,setInCorrectQuizes,complete,setComplete,start,timed,setTimed}}>
          {children}
      </QuizContext.Provider>
    )
};

export const useQuizContext = () => useContext(QuizContext);
