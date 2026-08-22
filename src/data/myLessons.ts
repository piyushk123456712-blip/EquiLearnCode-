// Comprehensive programming curriculum for EquiLearnCode
// Automatically converted into courses and chapters

export const myLessons = [
  // ===================== PYTHON =====================
  {
    courseTitle: "Python",
    courseDescription: "Learn Python programming from scratch. Covers syntax, data structures, OOP, and real-world scripting.",
    courseDescriptionHi: "शुरुआत से पायथन प्रोग्रामिंग सीखें। सिंटैक्स, डेटा स्ट्रक्चर, ऊप्स और वास्तविक दुनिया के प्रोजेक्ट्स।",
    category: "languages",
    icon: "python",
    level: "beginner",
    chapterTitle: "Python Basics",
    chapterTitleHi: "पायथन बेसिक्स",
    lessonTitle: "01 — Introduction to Python",
    lessonTitleHi: "01 — पायथन का परिचय",
    description: "Understand what Python is, why it is so popular, and how to write your first program.",
    descriptionHi: "समझें कि पायथन क्या है, यह इतना लोकप्रिय क्यों है और अपना पहला प्रोग्राम कैसे लिखें।",
    objectives: [
      "Understand Python features and ecosystem",
      "Write and execute your first 'Hello, World!' script",
      "Understand indentation and comment syntax"
    ],
    notes: "Python is an interpreted, high-level, dynamically typed programming language known for readability.",
    code: `# Your first Python program\nprint("Hello, World from EquiLearnCode!")\n\n# Variables\nname = "Piyush"\nage = 20\nprint(f"Welcome {name}, age {age}")`,
    practice: "Write a Python script that calculates the sum, difference, and product of two numbers.",
    youtubeVideoUrlEn: "https://youtu.be/X7YsihLSNZY?si=Vx_TYTc4G9fZMEnN",
    youtubeVideoUrlHi: "https://youtu.be/fUw6Wrgwh5c?si=sHYEXMeRnTOhOKTs"
  },
  {
    courseTitle: "Python",
    courseDescription: "Learn Python programming from scratch. Covers syntax, data structures, OOP, and real-world scripting.",
    courseDescriptionHi: "शुरुआत से पायथन प्रोग्रामिंग सीखें। सिंटैक्स, डेटा स्ट्रक्चर, ऊप्स और वास्तविक दुनिया के प्रोजेक्ट्स।",
    category: "languages",
    icon: "python",
    level: "beginner",
    chapterTitle: "Python Basics",
    chapterTitleHi: "पायथन बेसिक्स",
    lessonTitle: "02 — Variables, Data Types & Operators",
    lessonTitleHi: "02 — वेरिएबल्स, डेटा प्रकार और ऑपरेटर",
    description: "Learn integer, float, string, boolean types, and arithmetic/logical operators.",
    descriptionHi: "इंटिजर, फ्लोट, स्ट्रिंग, बूलियन प्रकार और अंकगणितीय/तार्किक ऑपरेटर सीखें।",
    objectives: [
      "Master int, float, str, and bool data types",
      "Perform arithmetic, relational, and logical operations",
      "Convert between data types using type casting"
    ],
    notes: "Python uses dynamic typing, meaning variable types are inferred automatically at runtime.",
    code: `x = 10\ny = 3.5\nname = "CodeLearner"\nis_active = True\n\n# Arithmetic operations\nsum_val = x + y\npower_val = x ** 2\n\nprint(f"Sum: {sum_val}, Power: {power_val}")`,
    practice: "Create a program that converts temperatures between Celsius and Fahrenheit.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },
  {
    courseTitle: "Python",
    courseDescription: "Learn Python programming from scratch. Covers syntax, data structures, OOP, and real-world scripting.",
    courseDescriptionHi: "शुरुआत से पायथन प्रोग्रामिंग सीखें। सिंटैक्स, डेटा स्ट्रक्चर, ऊप्स और वास्तविक दुनिया के प्रोजेक्ट्स।",
    category: "languages",
    icon: "python",
    level: "beginner",
    chapterTitle: "Control Flow & Functions",
    chapterTitleHi: "कंट्रोल फ्लो और फंक्शन्स",
    lessonTitle: "03 — Loops, Conditions & Functions",
    lessonTitleHi: "03 — लूप्स, कंडीशन्स और फंक्शन्स",
    description: "Control execution with if-else conditions, while/for loops, and modular reusable functions.",
    descriptionHi: "if-else कंडीशन्स, while/for लूप्स और रीयूजेबल फंक्शन्स के साथ कोड निष्पादित करें।",
    objectives: [
      "Master if, elif, and else decision making",
      "Iterate over sequences using for and while loops",
      "Define functions with parameters and return statements"
    ],
    notes: "Functions promote code reusability and clean modular program architecture.",
    code: `def check_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nfor num in range(1, 20):\n    if check_prime(num):\n        print(f"{num} is Prime")`,
    practice: "Write a function that calculates the factorial of any positive number.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== JAVASCRIPT =====================
  {
    courseTitle: "JavaScript",
    courseDescription: "Master modern JavaScript (ES6+) for interactive web development and full-stack engineering.",
    courseDescriptionHi: "इंटरैक्टिव वेब डेवलपमेंट और फुल-स्टैक इंजीनियरिंग के लिए आधुनिक जावास्क्रिप्ट (ES6+) सीखें।",
    category: "web",
    icon: "javascript",
    level: "beginner",
    chapterTitle: "JavaScript Fundamentals",
    chapterTitleHi: "जावास्क्रिप्ट फंडामेंटल्स",
    lessonTitle: "01 — Modern JS Syntax & Variables",
    lessonTitleHi: "01 — आधुनिक जेएस सिंटैक्स और वेरिएबल्स",
    description: "Understand let, const, arrow functions, template literals, and JavaScript execution context.",
    descriptionHi: "let, const, एरो फंक्शन्स, टेम्पलेट लिटरल्स और जावास्क्रिप्ट एग्जीक्यूशन समझें।",
    objectives: [
      "Understand variable scoping with let, const, and var",
      "Write modern arrow functions and template literals",
      "Work with primitive and reference data types"
    ],
    notes: "Prefer const by default, and let only when reassigning variables. Avoid var in modern JS.",
    code: `const greetUser = (name, role = "Developer") => {\n  const message = \`Hello \${name}, welcome to your \${role} journey!\`;\n  console.log(message);\n  return message;\n};\n\ngreetUser("Piyush");`,
    practice: "Create a program that calculates the average of an array of student marks using arrow functions.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },
  {
    courseTitle: "JavaScript",
    courseDescription: "Master modern JavaScript (ES6+) for interactive web development and full-stack engineering.",
    courseDescriptionHi: "इंटरैक्टिव वेब डेवलपमेंट और फुल-स्टैक इंजीनियरिंग के लिए आधुनिक जावास्क्रिप्ट (ES6+) सीखें।",
    category: "web",
    icon: "javascript",
    level: "intermediate",
    chapterTitle: "DOM & Async JavaScript",
    chapterTitleHi: "DOM और एसिंक जावास्क्रिप्ट",
    lessonTitle: "02 — DOM Manipulation & Async/Await",
    lessonTitleHi: "02 — DOM मैनिपुलेशन और एसिंक/अवेइट",
    description: "Learn how to manipulate webpage elements, listen to events, and fetch live data from APIs.",
    descriptionHi: "वेबपेज एलिमेंट्स को संशोधित करना, इवेंट्स सुनना और API से लाइव डेटा लाना सीखें।",
    objectives: [
      "Select and manipulate DOM nodes dynamically",
      "Attach event listeners for click and keypress events",
      "Fetch REST API data using async/await and Promises"
    ],
    notes: "Promises and async/await allow non-blocking asynchronous operations in JavaScript.",
    code: `async function fetchUserData(username) {\n  try {\n    const res = await fetch(\`https://api.github.com/users/\${username}\`);\n    const data = await res.json();\n    console.log(\`User: \${data.name}, Public Repos: \${data.public_repos}\`);\n  } catch (error) {\n    console.error("Error fetching data:", error);\n  }\n}\n\nfetchUserData("google");`,
    practice: "Create a simple interactive counter on a webpage with Increment, Decrement, and Reset buttons.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== C PROGRAMMING =====================
  {
    courseTitle: "C Programming",
    courseDescription: "The mother of all modern languages. Learn memory management, pointers, structs, and computer architecture.",
    courseDescriptionHi: "सभी आधुनिक भाषाओं की जननी। मेमोरी प्रबंधन, पॉइंटर्स, स्ट्रक्ट्स और कंप्यूटर आर्किटेक्चर सीखें।",
    category: "languages",
    icon: "c",
    level: "beginner",
    chapterTitle: "C Fundamentals",
    chapterTitleHi: "सी भाषा की मूल बातें",
    lessonTitle: "01 — Introduction to C Language",
    lessonTitleHi: "01 — सी प्रोग्रामिंग का परिचय",
    description: "Write your first compiled C program, understand compilation process, headers, and standard I/O.",
    descriptionHi: "पहला C प्रोग्राम लिखें, कंपाइलेशन प्रक्रिया, हेडर फाइलें और स्टैंडर्ड I/O समझें।",
    objectives: [
      "Understand compilers (GCC, Clang) and execution flow",
      "Learn main() function, #include <stdio.h>, and return codes",
      "Use printf and scanf for standard input/output"
    ],
    notes: "C is a procedural programming language that gives direct control over system memory.",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to C Programming on EquiLearnCode!\\n");\n    int a = 15, b = 25;\n    printf("Sum = %d\\n", a + b);\n    return 0;\n}`,
    practice: "Write a C program to check whether a given integer is even or odd.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },
  {
    courseTitle: "C Programming",
    courseDescription: "The mother of all modern languages. Learn memory management, pointers, structs, and computer architecture.",
    courseDescriptionHi: "सभी आधुनिक भाषाओं की जननी। मेमोरी प्रबंधन, पॉइंटर्स, स्ट्रक्ट्स और कंप्यूटर आर्किटेक्चर सीखें।",
    category: "languages",
    icon: "c",
    level: "intermediate",
    chapterTitle: "Pointers & Memory",
    chapterTitleHi: "पॉइंटर्स और मेमोरी प्रबंधन",
    lessonTitle: "02 — Pointers, Arrays & Dynamic Allocation",
    lessonTitleHi: "02 — पॉइंटर्स, एरे और डायनामिक मेमोरी",
    description: "Demystify pointers, addresses, dereferencing, malloc, and free.",
    descriptionHi: "पॉइंटर्स, मेमोरी एड्रेस, dereferencing, malloc और free को गहराई से समझें।",
    objectives: [
      "Understand memory addresses with & operator and pointers with *",
      "Pass pointers to functions for pass-by-reference simulation",
      "Allocate dynamic heap memory with malloc() and prevent leaks with free()"
    ],
    notes: "Always free dynamically allocated memory to avoid memory leaks.",
    code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int*)malloc(n * sizeof(int));\n    if (arr == NULL) return 1;\n\n    for (int i = 0; i < n; i++) {\n        arr[i] = (i + 1) * 10;\n        printf("arr[%d] = %d at %p\\n", i, arr[i], (void*)&arr[i]);\n    }\n\n    free(arr);\n    return 0;\n}`,
    practice: "Write a C function to swap two numbers using pointer arguments.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== C++ =====================
  {
    courseTitle: "C++ Programming",
    courseDescription: "Master object-oriented programming, modern C++20 features, Standard Template Library (STL), and competitive coding.",
    courseDescriptionHi: "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग, आधुनिक C++20, STL और प्रतिस्पर्धी कोडिंग में महारत हासिल करें।",
    category: "languages",
    icon: "cpp",
    level: "beginner",
    chapterTitle: "C++ Core & OOP",
    chapterTitleHi: "C++ कोर और OOP",
    lessonTitle: "01 — Classes, Objects & OOP Principles",
    lessonTitleHi: "01 — क्लासेज, ऑब्जेक्ट्स और ऊप्स सिद्धांत",
    description: "Learn encapsulation, constructors, methods, and classes in C++.",
    descriptionHi: "C++ में इनकैप्सुलेशन, कंस्ट्रक्टर्स, मेथड्स और क्लासेज सीखें।",
    objectives: [
      "Declare classes with public and private access modifiers",
      "Implement parameterized constructors and destructors",
      "Create and instantiate objects"
    ],
    notes: "C++ is a multi-paradigm language offering both high-level abstractions and low-level performance.",
    code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Student {\nprivate:\n    string name;\n    int rollNo;\npublic:\n    Student(string n, int r) : name(n), rollNo(r) {}\n    void display() {\n        cout << "Student: " << name << ", Roll: " << rollNo << endl;\n    }\n};\n\nint main() {\n    Student s1("Piyush", 101);\n    s1.display();\n    return 0;\n}`,
    practice: "Create a BankAccount class with deposit, withdraw, and checkBalance methods.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },
  {
    courseTitle: "C++ Programming",
    courseDescription: "Master object-oriented programming, modern C++20 features, Standard Template Library (STL), and competitive coding.",
    courseDescriptionHi: "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग, आधुनिक C++20, STL और प्रतिस्पर्धी कोडिंग में महारत हासिल करें।",
    category: "languages",
    icon: "cpp",
    level: "intermediate",
    chapterTitle: "Standard Template Library (STL)",
    chapterTitleHi: "स्टैंडर्ड टेम्पलेट लाइब्रेरी (STL)",
    lessonTitle: "02 — Vectors, Maps & STL Algorithms",
    lessonTitleHi: "02 — वेक्टर्स, मैप्स और STL एल्गोरिदम",
    description: "Supercharge your coding speed with vectors, unordered_maps, sets, and sort algorithms.",
    descriptionHi: "वेक्टर्स, अनऑर्डर्ड मैप्स, सेट्स और सॉर्ट एल्गोरिदम के साथ अपनी कोडिंग स्पीड बढ़ाएं।",
    objectives: [
      "Use dynamic std::vector for resizable arrays",
      "Store key-value pairs in std::map and std::unordered_map",
      "Apply std::sort and binary_search algorithms"
    ],
    notes: "STL provides heavily optimized data structures and algorithms out of the box.",
    code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {45, 12, 85, 32, 89};\n    sort(nums.begin(), nums.end());\n\n    cout << "Sorted elements: ";\n    for (int n : nums) {\n        cout << n << " ";\n    }\n    cout << endl;\n    return 0;\n}`,
    practice: "Use std::unordered_map to count the frequency of words in a given sentence.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== JAVA =====================
  {
    courseTitle: "Java",
    courseDescription: "Learn enterprise-grade Java programming. Covers JVM architecture, OOP concepts, Collections, and Exception Handling.",
    courseDescriptionHi: "एंटरप्राइज-ग्रेड जावा प्रोग्रामिंग सीखें। JVM आर्किटेक्चर, OOP कॉन्सेप्ट्स, कलेक्शंस और एक्सेप्शन हैंडलिंग।",
    category: "languages",
    icon: "java",
    level: "beginner",
    chapterTitle: "Java Fundamentals",
    chapterTitleHi: "जावा फंडामेंटल्स",
    lessonTitle: "01 — Java Architecture & OOP",
    lessonTitleHi: "01 — जावा आर्किटेक्चर और OOP",
    description: "Understand JVM, JRE, JDK, bytecode execution, and object-oriented principles in Java.",
    descriptionHi: "JVM, JRE, JDK, बाइटकोड निष्पादन और जावा में ऑब्जेक्ट-ओरिएंटेड सिद्धांतों को समझें।",
    objectives: [
      "Understand 'Write Once, Run Anywhere' (WORA) philosophy",
      "Write standard Java class with public static void main(String[] args)",
      "Implement inheritance and polymorphism"
    ],
    notes: "Java code compiles into platform-independent bytecode executed by the Java Virtual Machine (JVM).",
    code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java Learners at EquiLearnCode!");\n        \n        int[] numbers = {10, 20, 30, 40, 50};\n        for (int num : numbers) {\n            System.out.println("Value: " + num);\n        }\n    }\n}`,
    practice: "Create a Car class with accelerate and brake methods, then subclass it as ElectricCar.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },
  {
    courseTitle: "Java",
    courseDescription: "Learn enterprise-grade Java programming. Covers JVM architecture, OOP concepts, Collections, and Exception Handling.",
    courseDescriptionHi: "एंटरप्राइज-ग्रेड जावा प्रोग्रामिंग सीखें। JVM आर्किटेक्चर, OOP कॉन्सेप्ट्स, कलेक्शंस और एक्सेप्शन हैंडलिंग।",
    category: "languages",
    icon: "java",
    level: "intermediate",
    chapterTitle: "Collections & Exceptions",
    chapterTitleHi: "कलेक्शंस और एक्सेप्शन हैंडलिंग",
    lessonTitle: "02 — Collections Framework & Streams",
    lessonTitleHi: "02 — कलेक्शंस फ्रेमवर्क और स्ट्रीम्स",
    description: "Learn ArrayList, HashMap, HashSet, and modern Java Stream APIs.",
    descriptionHi: "ArrayList, HashMap, HashSet और आधुनिक जावा स्ट्रीम API सीखें।",
    objectives: [
      "Store and manipulate dynamic lists with ArrayList",
      "Map unique keys to values with HashMap",
      "Handle runtime errors with try-catch-finally blocks"
    ],
    notes: "Java Collections provide built-in data structures with high performance and type safety.",
    code: `import java.util.*;\n\npublic class CollectionsDemo {\n    public static void main(String[] args) {\n        List<String> langs = new ArrayList<>();\n        langs.add("Java");\n        langs.add("Python");\n        langs.add("JavaScript");\n\n        langs.forEach(lang -> System.out.println("Learning: " + lang));\n    }\n}`,
    practice: "Build a student database manager using HashMap<Integer, String> to lookup student records.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== HTML5 & CSS3 =====================
  {
    courseTitle: "HTML5 & CSS3",
    courseDescription: "The foundation of web design. Learn semantic HTML markup, modern CSS Flexbox, Grid, and responsive UI design.",
    courseDescriptionHi: "वेब डिज़ाइन की नींव। सिमेंटिक HTML, मॉडर्न CSS फ्लेक्सबॉक्स, ग्रिड और रिस्पॉन्सिव डिज़ाइन सीखें।",
    category: "web",
    icon: "html",
    level: "beginner",
    chapterTitle: "Web Structure & Styling",
    chapterTitleHi: "वेब संरचना और स्टाइलिंग",
    lessonTitle: "01 — Semantic HTML & Modern CSS Layouts",
    lessonTitleHi: "01 — सिमेंटिक HTML और आधुनिक CSS लेआउट",
    description: "Build clean web pages with headers, navigation, main sections, CSS Flexbox, and Grid.",
    descriptionHi: "हेडर्स, नेविगेशन, मुख्य सेक्शन, CSS फ्लेक्सबॉक्स और ग्रिड के साथ सुंदर वेबपेज बनाएं।",
    objectives: [
      "Write accessible semantic markup (<header>, <nav>, <main>, <article>, <footer>)",
      "Master CSS Box Model (margin, border, padding, content)",
      "Build fluid responsive layouts with CSS Flexbox"
    ],
    notes: "Semantic HTML improves SEO, accessibility, and clean code maintainability.",
    code: `<!-- Semantic Web Structure -->\n<div class="card">\n  <h2>Responsive Card Title</h2>\n  <p>Learn HTML & CSS on EquiLearnCode!</p>\n  <button class="btn">Explore More</button>\n</div>\n\n<style>\n  .card {\n    padding: 24px;\n    border-radius: 12px;\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .btn {\n    background: #2563eb;\n    color: white;\n    padding: 8px 16px;\n    border-radius: 6px;\n    border: none;\n    cursor: pointer;\n  }\n</style>`,
    practice: "Create a 3-column responsive pricing table using CSS Flexbox or CSS Grid.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== REACT.JS =====================
  {
    courseTitle: "React.js",
    courseDescription: "Build blazing fast modern single-page web applications with React components, hooks, and state management.",
    courseDescriptionHi: "रिएक्ट कंपोनेंट्स, हुक्स और स्टेट मैनेजमेंट के साथ तेज़ और आधुनिक सिंगल-पेज वेब ऐप्स बनाएं।",
    category: "web",
    icon: "react",
    level: "intermediate",
    chapterTitle: "React Fundamentals",
    chapterTitleHi: "रिएक्ट की मूल बातें",
    lessonTitle: "01 — Components, Props & Hooks",
    lessonTitleHi: "01 — कंपोनेंट्स, प्रॉप्स और हुक्स",
    description: "Learn functional components, JSX syntax, useState, useEffect, and component lifecycle.",
    descriptionHi: "फंक्शनल कंपोनेंट्स, JSX सिंटैक्स, useState, useEffect और कंपोनेंट लाइफसाइकिल सीखें।",
    objectives: [
      "Understand component-driven declarative UI development",
      "Manage component state using useState hook",
      "Perform side effects and data fetching with useEffect hook"
    ],
    notes: "React uses a virtual DOM to compute minimal necessary DOM updates for peak rendering speed.",
    code: `import React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="p-4 text-center">\n      <h2 className="text-xl font-bold">Count: {count}</h2>\n      <div className="flex gap-2 justify-center mt-4">\n        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-blue-600 text-white rounded">\n          Increment\n        </button>\n        <button onClick={() => setCount(0)} className="px-4 py-2 bg-gray-600 text-white rounded">\n          Reset\n        </button>\n      </div>\n    </div>\n  );\n}`,
    practice: "Build a dynamic Todo List app with add, delete, and toggle completion features.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== NODE.JS & EXPRESS =====================
  {
    courseTitle: "Node.js & Express",
    courseDescription: "Build high-performance backend servers, RESTful APIs, and handle authentication with Node.js.",
    courseDescriptionHi: "Node.js के साथ हाई-परफॉर्मेंस बैकएंड सर्वर, RESTful API और प्रमाणीकरण बनाएं।",
    category: "web",
    icon: "nodejs",
    level: "intermediate",
    chapterTitle: "Backend API Engineering",
    chapterTitleHi: "बैकएंड API इंजीनियरिंग",
    lessonTitle: "01 — Building RESTful APIs with Express",
    lessonTitleHi: "01 — एक्सप्रेस के साथ RESTful API बनाना",
    description: "Set up an Express server, define HTTP routes (GET, POST, PUT, DELETE), and handle JSON request bodies.",
    descriptionHi: "एक एक्सप्रेस सर्वर सेटअप करें, HTTP रूट्स परिभाषित करें और JSON रिक्वेस्ट बॉडी हैंडल करें।",
    objectives: [
      "Understand Node.js event loop and asynchronous non-blocking I/O",
      "Build REST endpoints with Express.js routing",
      "Apply middlewares for CORS, JSON parsing, and error handling"
    ],
    notes: "Node.js runs Google Chrome's V8 JavaScript engine outside the browser on the server.",
    code: `const express = require('express');\nconst app = express();\nconst PORT = 5000;\n\napp.use(express.json());\n\nconst users = [{ id: 1, name: "Piyush", role: "Admin" }];\n\napp.get('/api/users', (req, res) => {\n  res.json(users);\n});\n\napp.post('/api/users', (req, res) => {\n  const newUser = { id: Date.now(), ...req.body };\n  users.push(newUser);\n  res.status(201).json(newUser);\n});\n\napp.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
    practice: "Build an API endpoint for a mini bookstore that supports adding, listing, and deleting books.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== SQL & DATABASES =====================
  {
    courseTitle: "SQL & Databases",
    courseDescription: "Master relational database management, schema design, complex joins, indexing, and data modeling with SQL.",
    courseDescriptionHi: "रिलेशनल डेटाबेस प्रबंधन, स्कीमा डिज़ाइन, कॉम्प्लेक्स जॉइन्स, इंडेक्सिंग और SQL डेटा मॉडलिंग में महारत हासिल करें।",
    category: "databases",
    icon: "sql",
    level: "beginner",
    chapterTitle: "SQL Queries & Schemas",
    chapterTitleHi: "SQL क्वेरी और स्कीमा",
    lessonTitle: "01 — CRUD Operations & Table Design",
    lessonTitleHi: "01 — CRUD ऑपरेशन्स और टेबल डिज़ाइन",
    description: "Learn CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, WHERE conditions, and foreign keys.",
    descriptionHi: "CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, WHERE कंडीशन्स और फॉरेन कीज़ सीखें।",
    objectives: [
      "Design normalized relational database schemas",
      "Perform essential CRUD operations on relational tables",
      "Filter, sort, and paginate data with WHERE, ORDER BY, and LIMIT"
    ],
    notes: "SQL (Structured Query Language) is the universal standard language for interacting with relational databases.",
    code: `-- Create Users Table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) UNIQUE NOT NULL,\n    email VARCHAR(100) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Insert data\nINSERT INTO users (username, email) VALUES\n('piyush_code', 'piyush@example.com'),\n('learner123', 'learner@example.com');\n\n-- Query active users\nSELECT * FROM users WHERE email LIKE '%@example.com' ORDER BY id DESC;`,
    practice: "Write an SQL query to retrieve total orders and total amount spent by each customer using GROUP BY and JOIN.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== PHP =====================
  {
    courseTitle: "PHP & MySQL",
    courseDescription: "Learn server-side scripting with PHP, database connection with PDO/MySQLi, and dynamic website creation.",
    courseDescriptionHi: "PHP के साथ सर्वर-साइड स्क्रिप्टिंग, PDO/MySQLi डेटाबेस कनेक्शन और डायनामिक वेबसाइट बनाना सीखें।",
    category: "web",
    icon: "php",
    level: "beginner",
    chapterTitle: "PHP Fundamentals",
    chapterTitleHi: "PHP बेसिक्स",
    lessonTitle: "01 — PHP Syntax & Form Processing",
    lessonTitleHi: "01 — PHP सिंटैक्स और फॉर्म प्रोसेसिंग",
    description: "Learn PHP variables, arrays, superglobals ($_POST, $_GET), sessions, and database connectivity.",
    descriptionHi: "PHP वेरिएबल्स, एरे, सुपरग्लोबल्स ($_POST, $_GET), सेशन्स और डेटाबेस कनेक्टिविटी सीखें।",
    objectives: [
      "Understand PHP request lifecycle and embedding in HTML",
      "Process HTML form submissions securely",
      "Manage user login sessions with $_SESSION"
    ],
    notes: "PHP powers over 75% of the dynamic web, including platforms like WordPress.",
    code: `<?php\n// Simple PHP Backend Script\n$course = "PHP for Beginners";\n$author = "EquiLearnCode";\n\necho "<h1>Welcome to " . htmlspecialchars($course) . "</h1>";\necho "<p>Created by " . htmlspecialchars($author) . "</p>";\n\n$languages = ["PHP", "MySQL", "Apache"];\nforeach ($languages as $lang) {\n    echo "<li>Technology: $lang</li>";\n}\n?>`,
    practice: "Build a PHP script that validates an email and password from a contact form.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== RUST =====================
  {
    courseTitle: "Rust",
    courseDescription: "Learn memory-safe systems programming with Rust. Master ownership, borrowing, lifetimes, and blazing concurrency.",
    courseDescriptionHi: "रस्ट के साथ मेमोरी-सुरक्षित सिस्टम्स प्रोग्रामिंग सीखें। ओनरशिप, बॉरोइंग, लाइफटाइम्स और हाई स्पीड कॉनकरेंसी।",
    category: "languages",
    icon: "rust",
    level: "intermediate",
    chapterTitle: "Rust Systems Core",
    chapterTitleHi: "रस्ट सिस्टम कोर",
    lessonTitle: "01 — Ownership, Borrowing & Structs",
    lessonTitleHi: "01 — ओनरशिप, बॉरोइंग और स्ट्रक्ट्स",
    description: "Understand Rust's unique memory safety guarantees without a garbage collector.",
    descriptionHi: "बिना गारबेज कलेक्टर के रस्ट की अनोखी मेमोरी सुरक्षा और ओनरशिप मॉडल को समझें।",
    objectives: [
      "Understand Ownership rules and move semantics",
      "Learn immutable (&) and mutable (&mut) borrowing",
      "Create custom data models using Structs and Enums"
    ],
    notes: "Rust eliminates data races and null pointer crashes at compile time.",
    code: `fn main() {\n    let greeting = String::from("Hello Rustaceans at EquiLearnCode!");\n    print_length(&greeting);\n    println!("Original value retained: {}", greeting);\n}\n\nfn print_length(s: &String) {\n    println!("Length of '{}' is {} bytes", s, s.len());\n}`,
    practice: "Write a Rust program to implement a command-line temperature converter.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== GO (GOLANG) =====================
  {
    courseTitle: "Go (Golang)",
    courseDescription: "Build cloud-native microservices and lightning-fast distributed systems with Google's Go language.",
    courseDescriptionHi: "Google की Go भाषा के साथ क्लाउड-नेटिव माइक्रोसर्विस और अल्ट्रा-फ़ास्ट डिस्ट्रीब्यूटेड सिस्टम बनाएं।",
    category: "languages",
    icon: "golang",
    level: "intermediate",
    chapterTitle: "Golang Concurrency & Services",
    chapterTitleHi: "गो कॉनकरेंसी और सर्विसेज",
    lessonTitle: "01 — Go Syntax, Goroutines & Channels",
    lessonTitleHi: "01 — गो सिंटैक्स, गोरूटीन्स और चैनल्स",
    description: "Master simple clean syntax, error handling, lightweight Goroutines, and channel communications.",
    descriptionHi: "सरल सिंटैक्स, एरर हैंडलिंग, लाइटवेट गोरूटीन्स और चैनल कम्युनिकेशन में महारत हासिल करें।",
    objectives: [
      "Understand Go static typing and interface design",
      "Spawn concurrent tasks effortlessly with 'go' keyword",
      "Pass data safely across Goroutines using channels"
    ],
    notes: "Go was designed by Google for simplicity, fast compilation, and high-concurrency cloud systems.",
    code: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc worker(id int, ch chan string) {\n    time.Sleep(100 * time.Millisecond)\n    ch <- fmt.Sprintf("Worker %d completed task!", id)\n}\n\nfunc main() {\n    ch := make(chan string, 3)\n    for i := 1; i <= 3; i++ {\n        go worker(i, ch)\n    }\n    for i := 1; i <= 3; i++ {\n        fmt.Println(<-ch)\n    }\n}`,
    practice: "Build a concurrent web crawler prototype in Go using Goroutines and WaitGroups.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  },

  // ===================== KOTLIN =====================
  {
    courseTitle: "Kotlin & Android",
    courseDescription: "Develop modern Android apps and backend services with Google's preferred concise language, Kotlin.",
    courseDescriptionHi: "Google की पसंदीदा भाषा कोटलिन के साथ आधुनिक एंड्रॉइड ऐप्स और बैकएंड सर्विसेज विकसित करें।",
    category: "systems",
    icon: "kotlin",
    level: "beginner",
    chapterTitle: "Kotlin Fundamentals",
    chapterTitleHi: "कोटलिन बेसिक्स",
    lessonTitle: "01 — Kotlin Syntax & Null Safety",
    lessonTitleHi: "01 — कोटलिन सिंटैक्स और नल सेफ्टी",
    description: "Learn val vs var, null safety operator (?), data classes, extension functions, and lambdas.",
    descriptionHi: "val बनाम var, नल सेफ्टी (?), डेटा क्लासेज, एक्सटेंशन फंक्शन्स और लैम्ब्डा सीखें।",
    objectives: [
      "Prevent NullPointerExceptions with Kotlin's built-in type system",
      "Write concise Data Classes and Single-expression functions",
      "Explore Jetpack Compose Android UI architecture"
    ],
    notes: "Kotlin is 100% interoperable with Java and officially recommended by Google for Android app development.",
    code: `data class User(val id: Int, val name: String, val email: String? = null)\n\nfun main() {\n    val user = User(1, "Piyush", "piyush@example.com")\n    println("Welcome, \${user.name}!")\n    \n    val greeting: String? = "Hello from Kotlin on EquiLearnCode!"\n    println("Length: \${greeting?.length ?: 0}")\n}`,
    practice: "Create a Kotlin program that filters a list of numbers for even values using higher-order functions.",
    youtubeVideoUrlEn: "",
    youtubeVideoUrlHi: ""
  }
];
