'use client'
import Loader from "@/components/custom/global/Loader";
import MeetingSetup from "@/components/custom/meeting/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

const MeetingPage =  () => {
   const { id } = useParams();
  const {user, isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {call, isCallLoading} = useGetCallById(id as string);

  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            "meeting room"
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default MeetingPage