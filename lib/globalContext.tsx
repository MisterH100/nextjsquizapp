"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "./usernameStorage";
import axios from "axios";

interface contextProps {
  player: IPlayer;
  setPlayer: Dispatch<SetStateAction<IPlayer>>;
  currPlayer: string;
  setCurrPlayer: Dispatch<SetStateAction<string>>;
  points: number;
  rank: number;
  setPoints: Dispatch<SetStateAction<number>>;
  correctQuizzes: IQuiz[];
  setCorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
  inCorrectQuizzes: IQuiz[];
  setInCorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
  getUsername: (setState: Dispatch<SetStateAction<string>>) => void;
  currCorrectQuizzes: IQuiz[];
  setCurrCorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
  currIncorrectQuizzes: IQuiz[];
  setCurrIncorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
  expired: boolean;
  setExpired: Dispatch<SetStateAction<boolean>>;
  complete: boolean;
  setComplete: Dispatch<SetStateAction<boolean>>;
  timed: boolean;
  loading: boolean;
  showLeaderboard: boolean;
  setShowLeaderboard: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTimed: Dispatch<SetStateAction<boolean>>;
  getTimeStamp: () => void;
  updateData: () => void;
  updateStats: () => void;
  authPlayer: () => void;
}
export interface IAnswers {
  id: number;
  name: string;
}
export interface IQuiz {
  id: number;
  question: string;
  answers: IAnswers[];
  correctAnswer: string;
  points: number;
  answered: boolean;
  answer: string;
}
export interface IPlayer {
  player_id: string;
  token: string;
}
const QuizContext = createContext<contextProps>({} as contextProps);

export const QuizContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useLocalStorage<IPlayer>(
    "quizPlayer",
    {} as IPlayer
  );
  const [currPlayer, setCurrPlayer] = useState("");
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState(0);
  const [correctQuizzes, setCorrectQuizzes] = useState<IQuiz[]>([]);
  const [inCorrectQuizzes, setInCorrectQuizzes] = useState<IQuiz[]>([]);
  const [currCorrectQuizzes, setCurrCorrectQuizzes] = useState<IQuiz[]>([]);
  const [currIncorrectQuizzes, setCurrIncorrectQuizzes] = useState<IQuiz[]>([]);
  const [complete, setComplete] = useState(false);
  const [timed, setTimed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const getTimeStamp = async () => {
    if (player.token) {
      setLoading(true);
      await axios
        .post(
          `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
          { username: null },
          {
            headers: {
              "quiz-token": player.token,
            },
          }
        )
        .then((response: any) => {
          axios
            .get(
              `https://misterh-api-server.onrender.com/api/quiz_player/time_stamp/${response.data.details._id}`
            )
            .then((response: any) => {
              const prevDate = new Date(response.data.timeStamp);
              const currDate = new Date(Date.now());
              if (
                prevDate.getFullYear() === currDate.getFullYear() &&
                prevDate.getMonth() === currDate.getMonth() &&
                prevDate.getDate() === currDate.getDate()
              ) {
                setExpired(true);
              }
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            })
            .catch((error: any) => {
              console.log(error);
            });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const updateStats = () => {
    if (player.token) {
      setLoading(true);
      axios
        .post(
          `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
          { username: null },
          {
            headers: {
              "quiz-token": player.token,
            },
          }
        )
        .then((response: any) => {
          setPoints(response.data.details.points);
          setCorrectQuizzes(response.data.details.correctQuizzes);
          setInCorrectQuizzes(response.data.details.incorrectQuizzes);
          setComplete(response.data.details.completed);
          setCurrPlayer(response.data.details.username);
          axios
            .get(
              `https://misterh-api-server.onrender.com/api/quiz_player/rank/${response.data.details._id}`
            )
            .then((response) => {
              setRank(response.data.rank);
            })
            .catch((error: any) => {
              console.log(error);
            });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const updateData = async () => {
    if (player.token) {
      setLoading(true);
      await axios
        .post(
          `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
          { username: null },
          {
            headers: {
              "quiz-token": player.token,
            },
          }
        )
        .then((response: any) => {
          console.log("updating data....");
          axios
            .put(
              `https://misterh-api-server.onrender.com/api/quiz_player/update/${response.data.details._id}`,
              {
                points: points,
                correctQuizIds: currCorrectQuizzes.map((cq) => cq.id),
                incorrectQuizIds: currIncorrectQuizzes.map((iq) => iq.id),
              }
            )
            .then((response) => {
              console.log("updatePassed:", response.data.success);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            })
            .catch((error: any) => {
              console.log(error);
            });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const getUsername = async (setState: Dispatch<SetStateAction<string>>) => {
    if (player.token) {
      setLoading(true);
      axios
        .post(
          `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
          { username: null },
          {
            headers: {
              "quiz-token": player.token,
            },
          }
        )
        .then((response: any) => {
          setState(response.data.details.username);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const authPlayer = async () => {
    if (player.token) {
      setLoading(true);
      await axios
        .post(
          `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
          { username: null },
          {
            headers: {
              "quiz-token": player.token,
            },
          }
        )
        .then((response: any) => {
          setComplete(response.data.details.completed);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (player.player_id) {
      setLoading(true);
      axios
        .get(
          `https://misterh-api-server.onrender.com/api/quiz_player/player/${player.player_id}`
        )
        .then((response: any) => {
          setPlayer({
            ...player,
            player_id: "",
            token: response.data.token,
          });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [player]);

  return (
    <QuizContext.Provider
      value={{
        player,
        setPlayer,
        currPlayer,
        setCurrPlayer,
        points,
        rank,
        setPoints,
        correctQuizzes,
        setCorrectQuizzes,
        inCorrectQuizzes,
        setInCorrectQuizzes,
        currCorrectQuizzes,
        setCurrCorrectQuizzes,
        currIncorrectQuizzes,
        setCurrIncorrectQuizzes,
        getUsername,
        complete,
        setComplete,
        timed,
        loading,
        showLeaderboard,
        setShowLeaderboard,
        setLoading,
        setTimed,
        getTimeStamp,
        updateData,
        updateStats,
        authPlayer,
        expired,
        setExpired,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
