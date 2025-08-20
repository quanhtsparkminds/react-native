import { images } from "@assets/index";

export type TAttendances = {
  id: string;
  timestemp: string;
  subject: string;
  reason: string;
};

export const Attendances: TAttendances[] = [
  {
    id: "1",
    timestemp: "2025-08-19T08:30:00Z",
    subject: "Mathematics",
    reason: "Attended morning class",
  },
  {
    id: "2",
    timestemp: "2025-08-18T10:15:00Z",
    subject: "Science",
    reason: "Late due to traffic",
  },
  {
    id: "3",
    timestemp: "2025-08-17T14:00:00Z",
    subject: "History",
    reason: "Absent because of illness",
  },
  {
    id: "4",
    timestemp: "2025-08-16T09:00:00Z",
    subject: "English",
    reason: "Attended full session",
  },
  {
    id: "5",
    timestemp: "2025-08-15T11:45:00Z",
    subject: "Physics",
    reason: "Left early for appointment",
  },
];

export type TScoreSubject = {
  id: number;
  score: number;
  icon: keyof typeof images;
  maxScore: number;
  subject: string;
};

export const ScoreSubjects: TScoreSubject[] = [
  {
    id: 1,
    score: 9.5,
    icon: "math",
    maxScore: 10,
    subject: "Math",
  },
  {
    id: 2,
    score: 8.0,
    icon: "sport",
    maxScore: 10,
    subject: "Sport",
  },
  {
    id: 3,
    score: 7.5,
    icon: "geo",
    maxScore: 10,
    subject: "Geography",
  },
  {
    id: 4,
    score: 9.0,
    icon: "english",
    maxScore: 10,
    subject: "English",
  },
];
