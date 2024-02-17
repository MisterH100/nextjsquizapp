'use client'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useLocalStroge } from "./usernameStorage";
import axios from "axios";

interface contextProps{
  player: IPlayer,
  setPlayer: (Dispatch<SetStateAction<IPlayer>>),
  currPlayer: string,
  setCurrPlayer:(Dispatch<SetStateAction<string>>)
  currQuiz: number,
  setCurrQuiz: (Dispatch<SetStateAction<number>>),
  points: number,
  setPoints: (Dispatch<SetStateAction<number>>)
  correctQuizzes: IQuiz[],
  setCorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  inCorrectQuizzes: IQuiz[],
  setInCorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  

  currCorrectQuizzes: IQuiz[],
  setCurrCorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  currIncorrectQuizzes: IQuiz[],
  setCurrIncorrectQuizzes: (Dispatch<SetStateAction<IQuiz[]>>),
  expired: boolean,
  setExpired:(Dispatch<SetStateAction<boolean>>),
  complete: boolean,
  setComplete: (Dispatch<SetStateAction<boolean>>),
  start: ()=> void,
  timed: boolean,
  setTimed:(Dispatch<SetStateAction<boolean>>),
  getTimeStamp: ()=>void,
  updateData:()=>void,
  updateStats: ()=>void,
  authPlayer:()=>void
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
  player_id: string,
  token: string,
}
const QuizContext = createContext<contextProps>({} as contextProps)

export const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [player,setPlayer] = useLocalStroge<IPlayer>("quizPlayer",{} as IPlayer);
    const [currPlayer,setCurrPlayer] = useState("");
    const [currQuiz, setCurrQuiz] = useState(0);
    const [points, setPoints] = useState(0);
    const [correctQuizzes, setCorrectQuizzes] = useState<IQuiz[]>([ ]);
    const [inCorrectQuizzes, setInCorrectQuizzes] = useState<IQuiz[]>([ ]);
    const [currCorrectQuizzes,setCurrCorrectQuizzes] = useState<IQuiz[]>([ ]);
    const [currIncorrectQuizzes,setCurrIncorrectQuizzes] = useState<IQuiz[]>([ ])
    const [complete,setComplete] = useState(false);
    const [timed,setTimed] = useState(false);
    const [expired,setExpired] = useState(false);
    const start =() =>{
      setComplete(false);
      setCurrQuiz(0);
      setCorrectQuizzes([]),
      setInCorrectQuizzes([]),
      setPoints(0)
    }

    const getTimeStamp =async()=>{
      if(player.token){
        await axios.post(`https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        {usrname:player.username},
        {
          headers:{
            'quiz-token':player.token
          }
        })
        .then((response:any)=>{
          axios.get(`https://misterh-api-server.onrender.com/api/quiz_player/time_stamp/${response.data.details._id}`)
          .then((response:any)=>{
            const prevDate = new Date(response.data.timeStamp);
            const currDate = new Date(Date.now())
            if(prevDate.getFullYear() === currDate.getFullYear() && prevDate.getMonth() === currDate.getMonth() && prevDate.getDate() === currDate.getDate()){
             setExpired(true)
            }
          }).catch((error:any)=>{
            console.log(error)
          }) 
        }).catch((error:any)=>{
          console.log(error)
        })
        
      }
    }
    const updateStats =()=>{
      if(player.token){
        axios.post(`https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        {usrname:player.username},
        {
          headers:{
            'quiz-token':player.token
          }
        })
        .then((response:any)=>{
          setPoints(response.data.details.points)
          setCorrectQuizzes(response.data.details.correctQuizzes)
          setInCorrectQuizzes(response.data.details.incorrectQuizzes)
          setComplete(response.data.details.completed)
          setCurrPlayer(response.data.details.username)
        }).catch((error:any)=>{
          console.log(error)
        })
    }
    }
    const updateData = async()=>{
      if(player.token){
        await axios.post(`https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        {usrname:player.username},
        {
          headers:{
            'quiz-token':player.token
          }
        })
        .then((response:any)=>{
          console.log("updating data....")
          axios.put(`https://misterh-api-server.onrender.com/api/quiz_player/update/${response.data.details._id}`,
          {
            points:points,
            correctQuizIds:currCorrectQuizzes.map((cq)=>cq.id),
            incorrectQuizIds:currIncorrectQuizzes.map((iq)=>iq.id)
          }).then((response)=>{
            console.log("updatePassed:",response.data.success)
          }).catch((error:any)=>{
            console.log(error)
          }) 
        }).catch((error:any)=>{
          console.log(error)
        })
        
      }
    }
    const authPlayer =async()=>{
      if(player.token){
        await axios.post(`https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        {usrname:player.username},
        {
          headers:{
            'quiz-token':player.token
          }
        })
        .then((response:any)=>{
          setComplete(response.data.details.completed)
        }).catch((error:any)=>{
          console.log(error)
        })
        
      }
    }
    useEffect(()=>{
      if(player.player_id){
        axios.get(`https://misterh-api-server.onrender.com/api/quiz_player/player/${player.player_id}`)
        .then((response:any)=>{
          setPlayer({...player,player_id:"",token:response.data.token})
        }).catch((error:any)=>{
          console.log(error)
        })
      }
    },[player])
    

    return(
      <QuizContext.Provider value={{player,setPlayer,currPlayer,setCurrPlayer,currQuiz,setCurrQuiz,points,setPoints,correctQuizzes,setCorrectQuizzes,inCorrectQuizzes,setInCorrectQuizzes,currCorrectQuizzes,setCurrCorrectQuizzes,currIncorrectQuizzes,setCurrIncorrectQuizzes,complete,setComplete,start,timed,setTimed,getTimeStamp,updateData,updateStats,authPlayer,expired,setExpired}}>
          {children}
      </QuizContext.Provider>
    )
};

export const useQuizContext = () => useContext(QuizContext);
