import { Subsciption, UserDetails } from '@/types';
import { useState,createContext ,useEffect,useContext} from 'react';
import {
    useUser as useSupaUser,
    useSessionContext,
    User
  } from '@supabase/auth-helpers-react';
  
  type UserContextType =  {
    accessToken : string| null;
    user : User|null;
    userDetails : UserDetails|null;
    isLoading : boolean;
    subscription : Subsciption|null;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
) 

export interface Props {
    [propName : string] : any;
}

export const MyUserContextPrivider = (props : Props) => {
     const {
        session, isLoading:isLoadingUser,supabaseClient : supabase
     } = useSessionContext()

     const user = useSupaUser()
     const accessToken = session?.access_token ?? null

     const [isLoadingData, setIsloadingData] = useState(false)
     const [userDetails, setUserDetails] = useState<UserDetails |null>(null)
     
     const [subscription, setSubscription] = useState<Subsciption |null>(null)

     const getUserDetails = () => supabase.from('users').select('*').single();

     const getsubscription = () => 
        supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status',['trialing','active'])
        .single()

    useEffect(() => {
          if(user && !isLoadingData && !userDetails && !subscription){
            setIsloadingData(true);

            Promise.allSettled([getUserDetails(),getsubscription()]).then(
                (result) => {
                    const userDetialsPromise = result[0];
                    const subscriptionPromise = result[1];

                    if(userDetialsPromise.status === 'fulfilled'){
                        setUserDetails(userDetialsPromise.value.data as UserDetails)
                    }
                    if(subscriptionPromise.status === 'fulfilled'){
                        setSubscription(subscriptionPromise.value.data as Subsciption)
                    }
                     setIsloadingData(false)
                }
            )
          } else if(!user && !isLoadingData && !isLoadingUser){
            setUserDetails(null);
            setSubscription(null)
          }
        }, [user, isLoadingUser])

        const value = {
            accessToken,
            user,
            userDetails,
            isLoading : isLoadingData || isLoadingUser,
            subscription
        }
        
        return <UserContext.Provider value = {value} {...props}/>
    }

    export const useUser = () => {
        const context = useContext(UserContext);
        if(context === undefined){
            throw new Error('use User must be within a MyUserContextProvider')
        }
        return context
    }