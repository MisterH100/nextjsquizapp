"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocalStorage } from "./usernameStorage";
import axios from "axios";
const queryClient = new QueryClient();

interface contextProps {
  player: IPlayer;
  setPlayer: Dispatch<SetStateAction<IPlayer>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  points: number;
  rank: number;
  setRank: Dispatch<SetStateAction<number>>;
  setPoints: Dispatch<SetStateAction<number>>;
  correctQuizzes: IQuiz[];
  setCorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
  incorrectQuizzes: IQuiz[];
  setIncorrectQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
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
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTimed: Dispatch<SetStateAction<boolean>>;
  authPlayer: () => void;
  getUsername: () => void;
  updateData: () => void;
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
  token: string;
}
const QuizContext = createContext<contextProps>({} as contextProps);

export const QuizContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useLocalStorage<IPlayer>(
    "quiz_player",
    {} as IPlayer
  );
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState(0);
  const [correctQuizzes, setCorrectQuizzes] = useState<IQuiz[]>([]);
  const [incorrectQuizzes, setIncorrectQuizzes] = useState<IQuiz[]>([]);
  const [currCorrectQuizzes, setCurrCorrectQuizzes] = useState<IQuiz[]>([]);
  const [currIncorrectQuizzes, setCurrIncorrectQuizzes] = useState<IQuiz[]>([]);
  const [complete, setComplete] = useState(false);
  const [timed, setTimed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const authPlayer = async () => {
    if (player.token) {
      setLoadingMessage("Authenticating player...");
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
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  const getUsername = async () => {
    if (player.token) {
      setLoadingMessage("Authenticating player...");
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
          setUsername(response.data.details.username);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error: any) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  const updateData = () => {
    if (player.token) {
      setLoadingMessage("Authenticating player...");
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
          setLoadingMessage("Updating data...");
          axios
            .put(
              `https://misterh-api-server.onrender.com/api/quiz_player/update/${response.data.details._id}`,
              {
                points: points,
                correctQuizIds: currCorrectQuizzes.map((cq) => cq.id),
                incorrectQuizIds: currIncorrectQuizzes.map((iq) => iq.id),
              }
            )
            .then(() => {
              setLoading(false);
            })
            .catch((error: any) => {
              setLoading(false);
              setErrorMessage(error.message);
            });
        })
        .catch((error: any) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        player,
        setPlayer,
        username,
        setUsername,
        points,
        rank,
        setRank,
        setPoints,
        correctQuizzes,
        setCorrectQuizzes,
        incorrectQuizzes,
        setIncorrectQuizzes,
        currCorrectQuizzes,
        setCurrCorrectQuizzes,
        currIncorrectQuizzes,
        setCurrIncorrectQuizzes,
        getUsername,
        complete,
        setComplete,
        timed,
        loading,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        setLoading,
        setTimed,
        authPlayer,
        expired,
        setExpired,
        updateData,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
