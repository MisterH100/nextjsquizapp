"use client";
import loading_squares from "@/public/loadingsquares.svg";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
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
import { useRef, useState } from "react";
import axios from "axios";
import { Loading } from "./Loading";

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
  const { setPlayer, player, setLoading, loading } = useQuizContext();
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });
  const playerRef = useRef<any>(null);

  function onSubmit(values: z.infer<typeof usernameSchema>) {
    setLoading(true);
    axios
      .post("https://misterh-api-server.onrender.com/api/quiz_player/new", {
        username: values.username,
      })
      .then((response: any) => {
        setPlayer({
          ...player,
          player_id: response.data._id,
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <div className="fixed w-full h-screen flex justify-center items-center bg-black bg-opacity-20">
      {loading ? (
        <Loading />
      ) : (
        <Card className="w-full md:w-[500px] bg-white">
          <CardHeader>
            <CardTitle>Create your username</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: the_quiz_lord"
                          {...field}
                          ref={playerRef}
                        />
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
                        (playerRef.current.value =
                          "player" + (Date.now() + Math.random()).toString(36))
                      )
                    }
                    variant="outline"
                    className="bg-blue-600 text-white hover:text-black"
                  >
                    Generate Random
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
