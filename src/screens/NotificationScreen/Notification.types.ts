export type TNotification = {
  id: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
};
export const Notifications: TNotification[] = [
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "New Assignment Available",
    content: "Your Math assignment on Algebra has been posted. Check it now!",
    timestamp: "2025-08-19T08:30:00Z",
  },
  {
    id: "2",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    title: "Exam Schedule Released",
    content: "The schedule for your upcoming exams has been released.",
    timestamp: "2025-08-18T14:00:00Z",
  },
  {
    id: "3",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    title: "New Message from Teacher",
    content: "Your teacher has sent you feedback on your last assignment.",
    timestamp: "2025-08-17T16:45:00Z",
  },
  {
    id: "4",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    title: "Event Reminder",
    content: "Don’t forget the Science Club meeting tomorrow at 3 PM.",
    timestamp: "2025-08-19T12:00:00Z",
  },
  {
    id: "5",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    title: "Library Due Date",
    content:
      "Your borrowed books are due in 2 days. Return or renew them on time.",
    timestamp: "2025-08-16T09:20:00Z",
  },
];
