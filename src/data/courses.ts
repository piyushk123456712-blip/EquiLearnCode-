import { myLessons } from './myLessons';

// Helper function to extract YouTube ID from URL
function extractYoutubeId(url: string | undefined): string {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

// Convert the flat myLessons array into the nested courses structure required by the app
export const courses = myLessons.reduce((acc, lesson) => {
  const courseId = lesson.courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const chapterId = lesson.chapterTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const lessonId = lesson.lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Find or create course
  let course = acc.find(c => c.id === courseId);
  if (!course) {
    course = {
      id: courseId,
      title: lesson.courseTitle,
      description: lesson.courseDescription,
      descriptionHi: (lesson as any).courseDescriptionHi || lesson.courseDescription,
      level: lesson.level || "beginner",
      category: lesson.category || "languages",
      icon: lesson.icon || "terminal",
      chapters: []
    };
    acc.push(course);
  }

  // Find or create chapter
  let chapter = course.chapters.find((ch: any) => ch.title === lesson.chapterTitle);
  if (!chapter) {
    chapter = {
      id: chapterId,
      title: lesson.chapterTitle,
      titleHi: (lesson as any).chapterTitleHi || lesson.chapterTitle,
      lessons: []
    };
    course.chapters.push(chapter);
  }

  // Create lesson
  chapter.lessons.push({
    id: lessonId,
    title: lesson.lessonTitle,
    titleHi: (lesson as any).lessonTitleHi || lesson.lessonTitle,
    description: lesson.description,
    descriptionHi: (lesson as any).descriptionHi || lesson.description,
    objectives: (lesson as any).objectives || [],
    notes: (lesson as any).notes || "",
    code: (lesson as any).code || "",
    practice: (lesson as any).practice || "",
    videoIdEn: extractYoutubeId(lesson.youtubeVideoUrlEn),
    videoIdHi: extractYoutubeId(lesson.youtubeVideoUrlHi)
  });

  return acc;
}, [] as any[]);

export const projects = [
  {
    id: "py-calc",
    title: "Scientific & CLI Calculator",
    lang: "Python",
    difficulty: "Beginner",
    description: "Build a versatile console and GUI calculator supporting arithmetic, exponentiation, and trigonometry."
  },
  {
    id: "py-weather-cli",
    title: "Live Weather CLI Tracker",
    lang: "Python",
    difficulty: "Beginner",
    description: "Fetch live atmospheric weather conditions, temperature, and humidity using the OpenWeatherMap API."
  },
  {
    id: "js-taskmaster",
    title: "Interactive Kanban Task Board",
    lang: "JavaScript",
    difficulty: "Intermediate",
    description: "Build a drag-and-drop productivity kanban board using modern HTML5 drag events and localStorage."
  },
  {
    id: "react-quiz",
    title: "Timed Coding Quiz Platform",
    lang: "React.js",
    difficulty: "Intermediate",
    description: "A dynamic quiz app with timed questions, score calculations, category filters, and result sharing."
  },
  {
    id: "c-banking",
    title: "Console Banking Management System",
    lang: "C Language",
    difficulty: "Intermediate",
    description: "Create an account management system with file handling for deposits, balance inquiries, and transfers."
  },
  {
    id: "cpp-inventory",
    title: "Store Inventory Management with OOP",
    lang: "C++",
    difficulty: "Intermediate",
    description: "Design a complete stock manager utilizing classes, operator overloading, STL vectors, and file I/O."
  },
  {
    id: "java-library",
    title: "Digital Library System",
    lang: "Java",
    difficulty: "Intermediate",
    description: "An object-oriented library management system managing book loans, student records, and return dates."
  },
  {
    id: "sql-ecommerce-schema",
    title: "E-Commerce Database Architecture",
    lang: "SQL",
    difficulty: "Beginner",
    description: "Design complete relational schemas for products, customer reviews, order items, and payment transactions."
  },
  {
    id: "node-auth-api",
    title: "JWT Authentication & User REST API",
    lang: "Node.js",
    difficulty: "Advanced",
    description: "Build a secure REST API with user registration, password hashing with bcrypt, and JSON Web Token (JWT) auth."
  },
  {
    id: "rust-cli-grep",
    title: "Fast Text Search CLI (Mini-Grep)",
    lang: "Rust",
    difficulty: "Intermediate",
    description: "Build a blazing fast command-line file search utility utilizing Rust ownership, file streams, and regex."
  }
];

export const roadmaps = [
  {
    id: "python-dev",
    title: "Python Developer Roadmap",
    steps: ["Python Core Basics", "Data Structures & Algorithms", "OOP & Design Patterns", "File Handling & Modules", "Web Frameworks (Django/Flask)", "Database Integration", "Building Real-World Projects"]
  },
  {
    id: "frontend-dev",
    title: "Modern Frontend Engineer Roadmap",
    steps: ["Semantic HTML5 & Modern CSS3", "Responsive UI & Tailwind CSS", "Core JavaScript (ES6+)", "DOM & Asynchronous APIs", "React.js & State Management", "Build Tools (Vite)", "Portfolio Deployment"]
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Developer Roadmap",
    steps: ["Frontend Basics (HTML/CSS/JS)", "React.js Framework", "Node.js & Express.js Backend", "Relational & NoSQL Databases (SQL/MongoDB)", "Authentication & Security", "REST & GraphQL APIs", "Full Stack Deployment"]
  },
  {
    id: "systems-cpp-dev",
    title: "C / C++ Systems & Competitive Programming",
    steps: ["C Syntax & Memory Layout", "Pointers, Structs & Dynamic Allocation", "C++ Object Oriented Programming", "Standard Template Library (STL)", "Data Structures (Trees, Graphs, Heaps)", "Dynamic Programming & Optimization"]
  },
  {
    id: "backend-java-dev",
    title: "Java Backend Engineer Roadmap",
    steps: ["Java Syntax & Core OOP", "Collections & Streams Framework", "Multithreading & Concurrency", "SQL & Database Design", "Spring Boot Framework", "Microservices & Docker", "Cloud Deployment"]
  },
  {
    id: "android-dev",
    title: "Android App Developer (Kotlin) Roadmap",
    steps: ["Kotlin Fundamentals & Null Safety", "Android Studio & Project Structure", "Jetpack Compose UI", "Architecture Components (MVVM)", "Room Database & Coroutines", "REST API Networking (Retrofit)", "Google Play Store Publishing"]
  }
];
