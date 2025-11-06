export interface CourseCard {
  id: string;
  title: string;
  description: string;
  progress: number;
  tag: "Courses" | "In Progress" | "Favorites";
}

export const mockCourses: CourseCard[] = [
  { id: "course-1", title: "Start Here", description: "Your quest begins here.", progress: 0, tag: "Courses" },
  { id: "course-2", title: "Upgrade Mindset", description: "Become your best self.", progress: 0, tag: "Courses" },
  { id: "course-3", title: "Flipping", description: "Earn your first $1,000 quickly.", progress: 0, tag: "Courses" },
];
