import { useQuizContext } from "@/lib/globalContext";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const ErrorModal = () => {
  const { errorMessage } = useQuizContext();
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      <Card className="w-full md:w-[500px] h-[300px] bg-white flex items-center flex-col">
        <CardHeader>An error occurred</CardHeader>
        <CardContent>
          <p>{errorMessage}</p>
          <Button
            className="mt-10 w-full bg-blue-800 text-white text-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            reload
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
