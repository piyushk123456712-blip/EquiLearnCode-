const fs = require('fs');

let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');
code = code.replace("import { defaultCourses } from '../data/courses';", "import { courses as defaultCourses } from '../data/courses';");
code = code.replace("import { createContext, useContext, useState, useEffect, useMemo } from 'react';", "import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';");
fs.writeFileSync('src/context/AppContext.tsx', code);
