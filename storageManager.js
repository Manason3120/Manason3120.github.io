// ============================
// STORAGE MANAGER V1
// ============================

const StorageManager = (() => {

  // ---------- UTIL ----------
  function generateId(prefix = "id") {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // ============================
  // USER SYSTEM
  // ============================

  function getUsers() {
    return load("users") || [];
  }

  function saveUsers(users) {
    save("users", users);
  }

  function createUser({ username, password, email }) {
    const users = getUsers();

    const newUser = {
      id: generateId("teacher"),
      username,
      password,
      email
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
  }

  function login(username, password) {
    const users = getUsers();
    return users.find(
      u => u.username === username && u.password === password
    );
  }

  function setCurrentUser(user) {
    save("currentUser", user);
  }

  function getCurrentUser() {
    return load("currentUser");
  }

  function logout() {
    localStorage.removeItem("currentUser");
  }

  // ============================
  // CLASS / DUNGEON SYSTEM
  // ============================

  function getClasses() {
    return load("classes") || [];
  }

  function saveClasses(classes) {
    save("classes", classes);
  }

  function createClass({ teacherId, dungeonName }) {
    const classes = getClasses();

    const newClass = {
      id: generateId("dungeon"),
      teacherId,
      dungeonName,
      schedule: [],
      students: [],
      mapData: {},
      townData: {},
      createdAt: new Date().toISOString()
    };

    classes.push(newClass);
    saveClasses(classes);

    return newClass;
  }

  function getTeacherClasses(teacherId) {
    return getClasses().filter(c => c.teacherId === teacherId);
  }

  function updateClass(updatedClass) {
    const classes = getClasses().map(c =>
      c.id === updatedClass.id ? updatedClass : c
    );

    saveClasses(classes);
  }

  // ============================
  // STUDENT SYSTEM
  // ============================

  function createStudent({ classId, name, role }) {
    const classes = getClasses();

    const student = {
      id: generateId("student"),
      name,
      role,
      xp: 0,
      gold: 0,
      token: 0,
      violationCount: 0
    };

    const updated = classes.map(c => {
      if (c.id === classId) {
        c.students.push(student);
      }
      return c;
    });

    saveClasses(updated);

    return student;
  }

  function updateStudent(classId, updatedStudent) {
    const classes = getClasses().map(c => {

      if (c.id === classId) {
        c.students = c.students.map(s =>
          s.id === updatedStudent.id ? updatedStudent : s
        );
      }

      return c;
    });

    saveClasses(classes);
  }

  // ============================
  // DEMO ACCOUNT (AUTO CREATE)
  // ============================

  function ensureDemoAccount() {
    const users = getUsers();

    const exist = users.find(u => u.username === "mainamson3010");

    if (!exist) {
      createUser({
        username: "mainamson3010",
        password: "mainamson3010",
        email: "mainamson22@gmail.com"
      });
    }
  }

  // Run once
  ensureDemoAccount();

  // ============================
  // EXPORT
  // ============================

  return {
    createUser,
    login,
    setCurrentUser,
    getCurrentUser,
    logout,

    createClass,
    getTeacherClasses,
    updateClass,

    createStudent,
    updateStudent
  };

})();
