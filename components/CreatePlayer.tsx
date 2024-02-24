"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loading } from "./Loading";
import { ErrorModal } from "./Error";
import Link from "next/link";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be less than 20 characters",
    }),
});

export const Modal = () => {
  const {
    username,
    setUsername,
    setPlayer,
    setLoading,
    setLoadingMessage,
    setErrorMessage,
  } = useQuizContext();
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof usernameSchema>) {
    setLoadingMessage("Creating player...");
    setLoading(true);
    await axios
      .post("https://misterh-api-server.onrender.com/api/quiz_player/new", {
        username: values.username,
      })
      .then((response) => {
        axios
          .get(
            `https://misterh-api-server.onrender.com/api/quiz_player/player/${response.data._id}`
          )
          .then((response: any) => {
            setPlayer({ token: response.data.token });
            setUsername(response.data.username);
            setLoading(false);
          })
          .catch((error: any) => {
            setErrorMessage(error.message);
            setLoading(false);
          });
      })
      .catch((error: any) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }

  return (
    <div className="fixed w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      <Card className="w-full md:w-[500px] bg-white">
        <CardHeader>
          <CardTitle>Create your username</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: the_quiz_lord" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-black text-white hover:text-black"
                >
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    form.setValue(
                      "username",
                      "player" + (Date.now() + Math.random()).toString(36)
                    )
                  }
                  variant="outline"
                  className="bg-blue-600 text-white hover:text-black"
                >
                  Generate Random
                </Button>
              </div>
              <div className="w-full text-center">
                <Link className="w-full text-blue-800" href="/">
                  Log in with token
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
