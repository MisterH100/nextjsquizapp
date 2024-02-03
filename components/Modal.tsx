'use client'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { useQuizContext } from "@/lib/globalContext"

const usernameSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }).max(20,{
        message: "Username must be less than 20 characters"
    }),
})

export const Modal = ()=>{
    const {setUser} = useQuizContext();
    const form = useForm<z.infer<typeof usernameSchema>>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
          username: "",
        },
    })

    function onSubmit(values: z.infer<typeof usernameSchema>){
        setUser({username: values.username,loggedIn:true})
    }

    return(
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
                            <Button 
                                type="submit" 
                                variant="outline" 
                                className="bg-black text-white hover:text-black">Create
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}