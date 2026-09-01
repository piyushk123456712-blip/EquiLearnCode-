const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(
  'const [password, setPassword] = useState("");',
  'const [password, setPassword] = useState("");\n  const [loginError, setLoginError] = useState("");'
);

code = code.replace(
  /alert\("Incorrect password!"\);/g,
  'setLoginError("Incorrect password. Please try again.");'
);

code = code.replace(
  /<button type="submit"/g,
  '{loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}\n            <button type="submit"'
);

fs.writeFileSync('src/pages/Settings.tsx', code);
