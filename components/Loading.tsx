import { useQuizContext } from "@/lib/globalContext";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import loading_squares from "@/public/loadingsquares.svg";

export const Loading = () => {
  const { loadingMessage } = useQuizContext();
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      <Card className="w-full md:w-[500px] bg-white flex items-center flex-col">
        <CardHeader>{loadingMessage}</CardHeader>
        <Image
          className="w-1/2 h-full object-contain"
          src={loading_squares}
          width={500}
          height={300}
          alt="LOADING"
          priority
        />
      </Card>
    </div>
  );
};
