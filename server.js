import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const SCHOOL_FILE = path.join(DATA_DIR, 'school.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial fallback data
const initialStudents = [
  {
    id: 1,
    studentName: 'SUNIDHI KUMARI',
    fatherName: 'RAJAN KUMAR',
    motherName: 'NITU DEVI',
    dob: '06/01/2015',
    enrollmentNumber: '197',
    rollNumber: '4',
    className: '3',
    section: 'A',
    house: 'Red House',
    address: 'Ward No-01 Lakhraw Siwan (Bihar)',
    academicSession: '2024-25',
    studentPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
    initials: 'SK',
    status: 'Enrolled',
    attendance: {
      t1Present: 54, t1Total: 60,
      hyPresent: 55, hyTotal: 60,
      t2Present: 58, t2Total: 60,
      annualPresent: 56, annualTotal: 60
    },
    coScholastic: [
      { id: 1, activity: 'Work Education', hyGrade: 'A', annualGrade: 'A' },
      { id: 2, activity: 'Art Education', hyGrade: 'A', annualGrade: 'A' },
      { id: 3, activity: 'Sports / Yoga / NCC', hyGrade: 'B', annualGrade: 'B' }
    ],
    remarks: 'Sunidhi shows exceptional curiosity in Science and Computer studies. Keep up the brilliant work!',
    resultStatus: 'Promote',
    scholastic: [
      { subject: 'HINDI', per1: 7, nb1: 5, sea1: 5, hy1: 65, per2: 8, nb2: 5, sea2: 4, yr2: 70 },
      { subject: 'ENGLISH', per1: 6, nb1: 4, sea1: 5, hy1: 34, per2: 7, nb2: 4, sea2: 5, yr2: 55 },
      { subject: 'MATHS', per1: 5, nb1: 4, sea1: 5, hy1: 51, per2: 8, nb2: 5, sea2: 5, yr2: 68 },
      { subject: 'GK', per1: 7, nb1: 4, sea1: 5, hy1: 41, per2: 7, nb2: 5, sea2: 5, yr2: 60 },
      { subject: 'DRAWING', per1: 7, nb1: 4, sea1: 5, hy1: 65, per2: 9, nb2: 5, sea2: 5, yr2: 75 },
      { subject: 'SANSKRIT', per1: 6, nb1: 5, sea1: 5, hy1: 54, per2: 7, nb2: 4, sea2: 5, yr2: 66 },
      { subject: 'SCIENCE', per1: 7, nb1: 5, sea1: 5, hy1: 46, per2: 8, nb2: 5, sea2: 5, yr2: 62 },
      { subject: 'COMPUTER', per1: 8, nb1: 5, sea1: 5, hy1: 73, per2: 9, nb2: 5, sea2: 5, yr2: 78 }
    ]
  },
  {
    id: 2,
    studentName: 'ELEANOR RICHARDS',
    fatherName: 'DAVID RICHARDS',
    motherName: 'CLARA RICHARDS',
    dob: '12/04/2008',
    enrollmentNumber: 'STU-2023-084',
    rollNumber: '1',
    className: '11',
    section: 'Science',
    house: 'Blue House',
    address: 'Academic Colony, Siwan',
    academicSession: '2024-25',
    studentPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    initials: 'ER',
    status: 'Enrolled',
    attendance: {
      t1Present: 58, t1Total: 60,
      hyPresent: 59, hyTotal: 60,
      t2Present: 60, t2Total: 60,
      annualPresent: 59, annualTotal: 60
    },
    coScholastic: [
      { id: 1, activity: 'Work Education', hyGrade: 'A', annualGrade: 'A' },
      { id: 2, activity: 'Art Education', hyGrade: 'A', annualGrade: 'A' },
      { id: 3, activity: 'Sports / Yoga / NCC', hyGrade: 'A', annualGrade: 'A' }
    ],
    remarks: 'Outstanding performance across all subjects. Top student in class!',
    resultStatus: 'Promote',
    scholastic: [
      { subject: 'HINDI', per1: 9, nb1: 5, sea1: 5, hy1: 75, per2: 9, nb2: 5, sea2: 5, yr2: 78 },
      { subject: 'ENGLISH', per1: 9, nb1: 5, sea1: 5, hy1: 76, per2: 9, nb2: 5, sea2: 5, yr2: 80 },
      { subject: 'MATHS', per1: 10, nb1: 5, sea1: 5, hy1: 78, per2: 10, nb2: 5, sea2: 5, yr2: 80 },
      { subject: 'GK', per1: 8, nb1: 5, sea1: 5, hy1: 70, per2: 9, nb2: 5, sea2: 5, yr2: 75 },
      { subject: 'DRAWING', per1: 8, nb1: 5, sea1: 5, hy1: 72, per2: 9, nb2: 5, sea2: 5, yr2: 75 },
      { subject: 'SANSKRIT', per1: 8, nb1: 5, sea1: 5, hy1: 68, per2: 9, nb2: 5, sea2: 5, yr2: 72 },
      { subject: 'SCIENCE', per1: 9, nb1: 5, sea1: 5, hy1: 74, per2: 10, nb2: 5, sea2: 5, yr2: 78 },
      { subject: 'COMPUTER', per1: 10, nb1: 5, sea1: 5, hy1: 80, per2: 10, nb2: 5, sea2: 5, yr2: 80 }
    ]
  }
];

const defaultSchool = {
  id: 1,
  schoolName: 'MAHAVIRI SHISHU VIDYA MANDIR',
  schoolLogo: '/mahaviri_shishu_vidya_mandir_logo/screen.png',
  secondLogo: '/academic_excellence_logo/screen.png',
  affiliationNumber: 'RTE/SWN/0052 (G.F.E.R.T PATNA)',
  address: 'Ward No-01 Lakhraw Siwan (Bihar)',
  contactNumber: '+91 98765 43210',
  email: 'contact@mahavirishishu.edu.in',
  principalName: 'Dr. Rajan Kumar',
  academicSession: '2024-25'
};

// Seed initial files if they don't exist
if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(initialStudents, null, 2));
}

if (!fs.existsSync(SCHOOL_FILE)) {
  fs.writeFileSync(SCHOOL_FILE, JSON.stringify(defaultSchool, null, 2));
}

const getStudents = () => JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
const saveStudents = (data) => fs.writeFileSync(STUDENTS_FILE, JSON.stringify(data, null, 2));

const getSchool = () => JSON.parse(fs.readFileSync(SCHOOL_FILE, 'utf8'));
const saveSchool = (data) => fs.writeFileSync(SCHOOL_FILE, JSON.stringify(data, null, 2));

const readBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    try { resolve(body ? JSON.parse(body) : {}); }
    catch (e) { resolve({}); }
  });
});

const sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // GET /api/students
  if (req.method === 'GET' && pathname === '/api/students') {
    return sendJSON(res, 200, getStudents());
  }

  // GET /api/students/:id
  if (req.method === 'GET' && pathname.startsWith('/api/students/')) {
    const id = pathname.replace('/api/students/', '');
    const students = getStudents();
    const student = students.find(s => String(s.id) === String(id));
    if (student) return sendJSON(res, 200, student);
    return sendJSON(res, 404, { message: 'Student not found' });
  }

  // POST /api/students
  if (req.method === 'POST' && pathname === '/api/students') {
    const studentData = await readBody(req);
    const students = getStudents();

    const newId = students.length ? Math.max(...students.map(s => s.id || 0)) + 1 : 1;
    const initials = studentData.studentName
      ? studentData.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'ST';

    const newStudent = {
      id: newId,
      studentName: (studentData.studentName || 'NEW STUDENT').toUpperCase(),
      fatherName: (studentData.fatherName || '').toUpperCase(),
      motherName: (studentData.motherName || '').toUpperCase(),
      dob: studentData.dob || '01/01/2015',
      enrollmentNumber: studentData.enrollmentNumber || `ENR-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNumber: studentData.rollNumber || '1',
      className: studentData.className || '1',
      section: (studentData.section || 'A').toUpperCase(),
      house: studentData.house || 'Yellow House',
      address: studentData.address || 'Siwan, Bihar',
      academicSession: studentData.academicSession || '2024-25',
      studentPhoto: studentData.studentPhoto || '',
      initials,
      status: 'Enrolled',
      attendance: studentData.attendance || {
        t1Present: 50, t1Total: 60,
        hyPresent: 52, hyTotal: 60,
        t2Present: 55, t2Total: 60,
        annualPresent: 54, annualTotal: 60
      },
      coScholastic: studentData.coScholastic || [
        { id: 1, activity: 'Work Education', hyGrade: 'A', annualGrade: 'A' },
        { id: 2, activity: 'Art Education', hyGrade: 'A', annualGrade: 'A' },
        { id: 3, activity: 'Sports / Yoga / NCC', hyGrade: 'A', annualGrade: 'A' }
      ],
      remarks: studentData.remarks || 'Promising student with good academic dedication.',
      resultStatus: studentData.resultStatus || 'Promote',
      scholastic: studentData.scholastic || [
        { subject: 'HINDI', per1: 8, nb1: 5, sea1: 5, hy1: 70, per2: 8, nb2: 5, sea2: 5, yr2: 72 },
        { subject: 'ENGLISH', per1: 7, nb1: 4, sea1: 5, hy1: 65, per2: 8, nb2: 5, sea2: 5, yr2: 68 },
        { subject: 'MATHS', per1: 8, nb1: 5, sea1: 5, hy1: 75, per2: 9, nb2: 5, sea2: 5, yr2: 80 },
        { subject: 'GK', per1: 8, nb1: 4, sea1: 5, hy1: 60, per2: 8, nb2: 5, sea2: 5, yr2: 65 },
        { subject: 'DRAWING', per1: 9, nb1: 5, sea1: 5, hy1: 80, per2: 9, nb2: 5, sea2: 5, yr2: 82 },
        { subject: 'SANSKRIT', per1: 7, nb1: 5, sea1: 5, hy1: 62, per2: 8, nb2: 5, sea2: 5, yr2: 66 },
        { subject: 'SCIENCE', per1: 8, nb1: 5, sea1: 5, hy1: 72, per2: 8, nb2: 5, sea2: 5, yr2: 74 },
        { subject: 'COMPUTER', per1: 9, nb1: 5, sea1: 5, hy1: 85, per2: 9, nb2: 5, sea2: 5, yr2: 88 }
      ]
    };

    const updated = [newStudent, ...students];
    saveStudents(updated);
    return sendJSON(res, 201, newStudent);
  }

  // PUT /api/students/:id
  if (req.method === 'PUT' && pathname.startsWith('/api/students/')) {
    const id = pathname.replace('/api/students/', '');
    const updateFields = await readBody(req);
    const students = getStudents();
    const idx = students.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      students[idx] = { ...students[idx], ...updateFields };
      saveStudents(students);
      return sendJSON(res, 200, students[idx]);
    }
    return sendJSON(res, 404, { message: 'Student not found' });
  }

  // DELETE /api/students/:id
  if (req.method === 'DELETE' && pathname.startsWith('/api/students/')) {
    const id = pathname.replace('/api/students/', '');
    let students = getStudents();
    students = students.filter(s => String(s.id) !== String(id));
    saveStudents(students);
    return sendJSON(res, 200, { success: true });
  }

  // GET /api/school
  if (req.method === 'GET' && pathname === '/api/school') {
    return sendJSON(res, 200, getSchool());
  }

  // PUT /api/school
  if (req.method === 'PUT' && pathname === '/api/school') {
    const settings = await readBody(req);
    saveSchool(settings);
    return sendJSON(res, 200, settings);
  }

  return sendJSON(res, 404, { message: 'Endpoint not found' });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Central School API Server running on port ${PORT}`);
});
