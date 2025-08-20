export type TExam = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
};

export const ExamFilter: TExam[] = [
  {
    id: "1",
    title: "Math Exam Announcement",
    content:
      "The Math exam will take place on 20/08/2025. Please prepare accordingly.",
    timestamp: "2024-01-20 14:30",
  },
  {
    id: "2",
    title: "Literature Exam Announcement",
    content: "The Literature exam has been rescheduled to 22/08/2025.",
    timestamp: "2025-08-19 14:30",
  },
  {
    id: "3",
    title: "English Mock Test",
    content: "The English mock test will be held this weekend.",
    timestamp: "2025-08-20 14:30",
  },
  {
    id: "4",
    title: "Physics Exam Schedule Update",
    content:
      "The Physics exam schedule has been adjusted. Check details in the system.",
    timestamp: "2025-08-21 14:30",
  },
  {
    id: "5",
    title: "Chemistry Exam Announcement",
    content: "The Chemistry exam will start at 8 AM on 23/08/2025.",
    timestamp: "2025-08-22 14:30",
  },
];

export type TAssignment = {
  id: number;
  subject: string;
  dealine: string;
  description: string;
  status?: "done" | "todo";
};

export const CurrentTask: TAssignment[] = [
  {
    id: 1,
    subject: "English",
    dealine: "2025-08-20 10:00",
    description:
      "Complete grammar exercises from Unit 3 and review vocabulary list.",
    status: "todo",
  },
  {
    id: 2,
    subject: "English",
    dealine: "2025-08-22 14:30",
    description:
      "Write a 200-word essay on the topic: 'The Importance of Learning English'.",
    status: "todo",
  },
  {
    id: 3,
    subject: "English",
    dealine: "2025-08-25 09:00",
    description:
      "Prepare a short presentation about your favorite book in English.",
    status: "todo",
  },
  {
    id: 4,
    subject: "English",
    dealine: "2025-08-28 15:00",
    description:
      "Practice speaking skills by recording a 2-minute introduction about yourself.",
    status: "todo",
  },
  {
    id: 5,
    subject: "English",
    dealine: "2025-08-30 11:30",
    description: "Read Chapter 4 of the textbook and summarize the main ideas.",
    status: "todo",
  },
];
