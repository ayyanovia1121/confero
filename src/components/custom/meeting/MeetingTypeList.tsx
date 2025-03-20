'use client'
import MeetingCard from './MeetingCard';

const MeetingTypeList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <MeetingCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {}}
      />
      <MeetingCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        className="bg-blue-1"
        description="Via invitation link"
        handleClick={() => {}}
      />
      <MeetingCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => {}}
      />
      <MeetingCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-1"
        handleClick={() => {}}
      />
    </section>
  );
}

export default MeetingTypeList