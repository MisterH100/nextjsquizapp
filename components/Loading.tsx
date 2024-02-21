import { useQuizContext } from "@/lib/globalContext";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import loading_squares from "@/public/loadingsquares.svg";

export const Loading = () => {
  return (
    <div className="z-[100] fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      <Card className="w-full md:w-[500px] bg-white flex items-center flex-col">
        <CardHeader>Saving...</CardHeader>
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
