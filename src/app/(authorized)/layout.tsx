import { auth } from "../api/auth/[...nextauth]/route";
import Login from "@/components/Login";

export default async function RootAuthorized({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const session = await auth()

    return(
        <>
            {!session? (
                <Login />
            ): (
                <>
                {children}
                </>
            )}    
        </>
    )
}