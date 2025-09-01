import { useState, useEffect, use } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat= ()=>{
    const {user} = useUser();
    const [chatClient, setChatclient]=useState(null);

    const {data: token, isLoading, error} = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!user?.id // this will take the object and convert it into a boolean
    });

    // init chat client
    useEffect(()=>{
        const initChat= async()=>{
            if(!tokenData?.data || !user?.id || !STREAM_API_KEY) return;
            let cancelled=false;

            try{
                const client= StreamChat.getInstance(STREAM_API_KEY);
                client.connectUser({
                    id:user.id,
                    name:user.fullName,
                    image : user.imageUrl
                })
                setChatclient(client);


            }catch(error){
                console.log("Error connecting to stream",error);
                Sentry.captureException(error, {
                    tags: {component : "useStreamChat"},
                    extra: {
                        context: "stream_chat_connection",
                        userId: user?.id,
                        streamApiKey: STREAM_API_KEY ? "present":"missing"
                    }
                })
            }

        }
        initChat();

        // cleanup
        return ()=>{
            chatClient.disconnectUser();
        }

    },[tokenData,user,chatClient])

    return {chatClient, isLoading:tokenLoading, error:tokenError};
}