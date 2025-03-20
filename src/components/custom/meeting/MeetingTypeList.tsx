"use client";
import { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";

type MeetingStatus =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<MeetingStatus | undefined>();
  const route = useRouter();
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
    </section>
  );
};

export default MeetingTypeList;
