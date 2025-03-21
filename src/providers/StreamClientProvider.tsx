import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  //   get all type of video client from stream
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();

  useEffect(() => {
     if(!isLoaded || !user) return;
     if(!apiKey) throw new Error("STREAM API KEY is not defined");

     const client = new StreamVideoClient({
        apiKey,
        user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
        },
        tokenProvider
     });
    }, [user, isLoaded]);
    

  return <StreamVideo client={videoClient}></StreamVideo>;
};

export default StreamVideoProvider;
