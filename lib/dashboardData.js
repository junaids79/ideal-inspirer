/**
 * Mock learner dashboard data.
 * Replace with Supabase enrollment / progress queries when available.
 */

export const dashboardStats = {
  coursesEnrolled: 8,
  averageProgress: 62,
  certificates: 2,
  learningHours: 48,
  completed: 2,
};

export const continueLearningCourses = [
  {
    id: "sap-fico",
    title: "SAP FICO",
    progress: 80,
    lastLesson: "Financial Posting",
    category: "Finance",
    thumbnailColor: "from-teal-600 to-teal-800",
  },
  {
    id: "sap-mm",
    title: "SAP MM",
    progress: 65,
    lastLesson: "Inventory Management",
    category: "Enterprise",
    thumbnailColor: "from-ink-700 to-ink-900",
  },
  {
    id: "power-bi",
    title: "Power BI",
    progress: 45,
    lastLesson: "Data Visualization Basics",
    category: "Analytics",
    thumbnailColor: "from-marigold-600 to-marigold",
  },
];

export const enrolledCourses = [
  {
    id: "sap-fico",
    title: "SAP FICO",
    progress: 80,
    completed: false,
    category: "Finance",
    thumbnailColor: "from-teal-600 to-teal-800",
  },
  {
    id: "sap-mm",
    title: "SAP MM",
    progress: 65,
    completed: false,
    category: "Enterprise",
    thumbnailColor: "from-ink-700 to-ink-900",
  },
  {
    id: "english",
    title: "English Communication",
    progress: 100,
    completed: true,
    category: "Communication",
    thumbnailColor: "from-teal-400 to-teal-700",
  },
  {
    id: "power-bi",
    title: "Power BI",
    progress: 45,
    completed: false,
    category: "Analytics",
    thumbnailColor: "from-marigold-600 to-marigold",
  },
  {
    id: "python",
    title: "Python Fundamentals",
    progress: 30,
    completed: false,
    category: "Programming",
    thumbnailColor: "from-ink-400 to-ink-700",
  },
  {
    id: "leadership",
    title: "Leadership Essentials",
    progress: 55,
    completed: false,
    category: "Soft Skills",
    thumbnailColor: "from-teal-700 to-teal-900",
  },
  {
    id: "excel",
    title: "Advanced Excel",
    progress: 100,
    completed: true,
    category: "Productivity",
    thumbnailColor: "from-marigold-400 to-marigold-600",
  },
  {
    id: "sap-hana",
    title: "SAP HANA",
    progress: 20,
    completed: false,
    category: "Enterprise",
    thumbnailColor: "from-teal-500 to-ink-700",
  },
];

export const recentlyViewed = [
  { id: "sap-fico", title: "SAP FICO", category: "Finance" },
  { id: "english", title: "English Communication", category: "Communication" },
  { id: "power-bi", title: "Power BI", category: "Analytics" },
];

export const recommendedCourses = [
  {
    id: "power-bi",
    title: "Power BI",
    description: "Build dashboards and reports that drive business decisions.",
    category: "Analytics",
    duration: "6 weeks",
    thumbnailColor: "from-marigold-600 to-marigold",
  },
  {
    id: "python",
    title: "Python",
    description: "Learn programming fundamentals for data and automation.",
    category: "Programming",
    duration: "8 weeks",
    thumbnailColor: "from-ink-400 to-ink-700",
  },
  {
    id: "sap-hana",
    title: "SAP HANA",
    description: "Master in-memory database administration and modeling.",
    category: "Enterprise",
    duration: "10 weeks",
    thumbnailColor: "from-teal-500 to-ink-700",
  },
  {
    id: "ai-beginners",
    title: "AI for Beginners",
    description: "Understand AI concepts and practical applications today.",
    category: "Technology",
    duration: "4 weeks",
    thumbnailColor: "from-teal-400 to-teal-700",
  },
];
