"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useQuizContext } from "@/lib/globalContext";
import axios from "axios";

const usernameSchema = z.object({
  token: z
    .string()
    .min(100, {
      message: "Invalid token",
    })
    .max(200, {
      message: "Invalid token",
    }),
});

export const TokenLogin = () => {
  const router = useRouter();
  const {
    setUsername,
    setPlayer,
    setLoading,
    setLoadingMessage,
    setErrorMessage,
    loading,
  } = useQuizContext();

  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(values: z.infer<typeof usernameSchema>) {
    setLoadingMessage("validating token...");
    setLoading(true);
    await axios
      .post(
        `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        { username: null },
        {
          headers: {
            "quiz-token": values.token,
          },
        }
      )
      .then((response: any) => {
        setUsername(response.data.details.username);
        setPlayer({ token: values.token });
        setLoading(false);
        router.push("/");
      })
      .catch((error: any) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  }

  return (
    <div className="fixed w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      <Card className="w-full md:w-[500px] bg-white">
        <CardHeader>
          <CardTitle>Login with token</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      paste a valid token in the field
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={loading}
                  className="bg-black text-white hover:text-black"
                >
                  {loading ? "validating token..." : "login"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
