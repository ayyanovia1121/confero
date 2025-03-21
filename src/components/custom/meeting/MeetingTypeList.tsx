"use client";
import { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

type MeetingStatus =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<MeetingStatus | undefined>();
  const route = useRouter();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return null;

    try {
      if(!values.dateTime){
        toast.warning("Please select a date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if(!values.description){
        route.push(`/meeting/${call.id}`);
      }
      toast.success("Meeting created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting");
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <MeetingCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <MeetingCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        className="bg-blue-1"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <MeetingCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-1"
        handleClick={() => route.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => route.push("/instant-meeting")}
      />
    </section>
  );
};

export default MeetingTypeList;
