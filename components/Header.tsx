import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu"  
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

const socials =[
    {
        id:1,
        name:"Twitter",
        link:"https://twitter.com/handsome_nyathi"
    },
    {
        id:2,
        name:"Github",
        link:"https://github.com/MisterH100"
    },
    {
        id:3,
        name:"Instagram",
        link:"https://www.instagram.com/handsome_nyathi"
    },
    {
        id:4,
        name:"LinkedIn",
        link:"https://linkedin.com/in/handsome-nyathi-9a3116275"
    },
]

export const Header =()=>{
    return(
        <header className="fixed w-full z-50 p-4 border-none">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Alert className="flex justify-between w-full md:w-[500px] rounded-full p-4 mx-auto bg-white cursor-pointer shadow-lg">
                        <div>
                            <AlertTitle>Develop with me!</AlertTitle>
                            <AlertDescription>
                                Follow me on my socials and check out my portfolio
                            </AlertDescription>
                        </div>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-500">
                            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                            </svg>
                        </div>
                    </Alert>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-full md:w-[400px] rounded-b-xl">
                    <DropdownMenuLabel>Socials</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        {socials.map((social)=>
                            <DropdownMenuItem 
                                key={social.id}
                                className="bg-gray-100 hover:bg-gray-500">
                                <Link
                                    className="w-full" 
                                    target="_blank"
                                    href={social.link}>
                                    {social.name}
                                </Link>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-500"/>
                    <DropdownMenuLabel>Portfolio</DropdownMenuLabel>
                    <DropdownMenuItem  className="bg-gray-100 hover:bg-gray-500">
                        <Link 
                            className="w-full"
                            target="_blank"
                            href="https://thehandsomedev.com">thehandsomedev.com
                        </Link>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}