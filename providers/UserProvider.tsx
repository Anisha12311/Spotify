"use client"

import { MyUserContextPrivider } from "@/hooks/useUser"

interface UserProviderProps{
    children : React.ReactNode
}

const UserProvider : React.FC<UserProviderProps> =({children}) => {
    return (
        <MyUserContextPrivider>
            {children}
        </MyUserContextPrivider>
    )
}
export default UserProvider