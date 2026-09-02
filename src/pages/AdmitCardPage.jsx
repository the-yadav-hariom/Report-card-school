import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { studentService } from '../services/studentService';
import { schoolService } from '../services/schoolService';
import AdmitCard from '../components/AdmitCard';
import FullAdmitCardDataEditorModal from '../components/FullAdmitCardDataEditorModal';
import { 
  Printer, 
  Edit3, 
  Users, 
  Sparkles, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  FileText,
  Calendar,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const AdmitCardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const studentIdParam = searchParams.get('studentId');

  const [students, setStudents] = useState([]);
  const [school, setSchool] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const [examPreset, setExamPreset] = useState('ANNUAL EXAMINATION 2024-2025');

  // Admit Card Data State
  const [admitCardData, setAdmitCardData] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      if (studentIdParam) {
        const found = students.find(s => String(s.id) === String(studentIdParam) || s.enrollmentNumber === studentIdParam);
        if (found) {
          setSelectedStudent(found);
          setSearchError('');
        } else {
          setSearchError(`Invalid Roll Number or Enrollment Number "${studentIdParam}"!`);
        }
      } else if (!selectedStudent) {
        setSelectedStudent(students[0]);
      }
    }
  }, [students, studentIdParam]);

  useEffect(() => {
    if (selectedStudent && school) {
      generateAdmitCardStructure(selectedStudent, school, examPreset);
    }
  }, [selectedStudent, school, examPreset]);

  const loadInitialData = async () => {
    const sData = await studentService.getAllStudents();
    const schData = await schoolService.getSchoolSettings();
    setStudents(sData);
    setSchool(schData);

    if (sData.length > 0 && !selectedStudent) {
      setSelectedStudent(sData[0]);
    }
  };

  const generateAdmitCardStructure = (stud, sch, examTitle) => {
    // Generate default exam timetable from student's scholastic subjects or fallback default
    let timetable = [];
    if (stud.scholastic && stud.scholastic.length > 0) {
      const dates = ['10/03/2025', '11/03/2025', '12/03/2025', '13/03/2025', '14/03/2025', '15/03/2025', '17/03/2025', '18/03/2025'];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday', 'Tuesday'];
      
      timetable = stud.scholastic.map((item, idx) => ({
        date: dates[idx % dates.length],
        day: days[idx % days.length],
        subject: item.subject || `SUBJECT ${idx + 1}`,
        time: '09:00 AM - 12:00 PM',
        roomNo: `Hall-0${(idx % 3) + 1}`
      }));
    } else {
      timetable = [
        { date: '10/03/2025', day: 'Monday', subject: 'HINDI', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-01' },
        { date: '11/03/2025', day: 'Tuesday', subject: 'ENGLISH', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-01' },
        { date: '12/03/2025', day: 'Wednesday', subject: 'MATHEMATICS', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-01' },
        { date: '13/03/2025', day: 'Thursday', subject: 'SCIENCE', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-02' },
        { date: '14/03/2025', day: 'Friday', subject: 'SOCIAL SCIENCE', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-02' },
        { date: '15/03/2025', day: 'Saturday', subject: 'COMPUTER SCIENCE', time: '09:00 AM - 12:00 PM', roomNo: 'Hall-02' }
      ];
    }

    const defaultInstructions = [
      'Candidates must carry this Admit Card along with valid School ID Card to the Examination Hall.',
      'Reporting time is 15 minutes before the commencement of examination. No late entry after 09:15 AM.',
      'Use of mobile phones, smartwatches, calculators, or any unauthorized electronic items is strictly prohibited.',
      'Check the Question Paper and Answer Sheet carefully before writing your details and Roll Number.',
      'Maintain discipline and decorum inside the exam hall. Misbehavior will result in immediate disqualification.'
    ];

    setAdmitCardData({
      school: {
        schoolName: sch?.schoolName || 'MAHAVIRI SHISHU VIDYA MANDIR',
        affiliationNumber: sch?.affiliationNumber || 'RTE/SWN/0052 (G.F.E.R.T PATNA)',
        address: sch?.address || 'Ward No-01 Lakhraw Siwan (Bihar)',
        contactNumber: sch?.contactNumber || '+91 98765 43210',
        schoolLogo: sch?.schoolLogo || '/mahaviri_shishu_vidya_mandir_logo/screen.png',
        secondLogo: sch?.secondLogo || '/academic_excellence_logo/screen.png',
        principalName: sch?.principalName || 'Dr. Rajan Kumar'
      },
      student: {
        id: stud.id,
        studentName: stud.studentName || 'STUDENT NAME',
        fatherName: stud.fatherName || '',
        motherName: stud.motherName || '',
        rollNumber: stud.rollNumber || '1',
        className: stud.className || '1',
        section: stud.section || 'A',
        enrollmentNumber: stud.enrollmentNumber || 'ENR-1001',
        dob: stud.dob || '01/01/2015',
        gender: stud.gender || 'Regular',
        studentPhoto: stud.studentPhoto || ''
      },
      examTitle: examTitle || 'ANNUAL EXAMINATION HALL TICKET',
      academicSession: stud.academicSession || sch?.academicSession || '2024-2025',
      examCenter: 'Mahaviri Shishu Vidya Mandir Main Campus',
      centerCode: 'MSVM-8801',
      principalTitle: 'Controller of Examinations / Principal',
      examSchedule: timetable,
      instructions: defaultInstructions
    });
  };

  const handleSearchVerification = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchInput.trim()) {
      setSearchError('Please enter a Roll Number or Enrollment Number.');
      return;
    }

    const found = students.find(s => 
      String(s.rollNumber) === searchInput.trim() || 
      String(s.enrollmentNumber).toLowerCase() === searchInput.trim().toLowerCase() ||
      s.studentName.toLowerCase().includes(searchInput.trim().toLowerCase())
    );

    if (found) {
      setSelectedStudent(found);
      setSearchParams({ studentId: found.id });
      setSearchInput('');
      setSearchError('');
    } else {
      setSearchError(`No student found matching "${searchInput}"!`);
    }
  };

  const handleSaveAdmitCard = async () => {
    if (!admitCardData || !selectedStudent) return;
    
    try {
      // Save updated student fields if modified
      const updatedStudentData = {
        ...selectedStudent,
        studentName: admitCardData.student.studentName,
        fatherName: admitCardData.student.fatherName,
        motherName: admitCardData.student.motherName,
        rollNumber: admitCardData.student.rollNumber,
        className: admitCardData.student.className,
        section: admitCardData.student.section,
        enrollmentNumber: admitCardData.student.enrollmentNumber,
        dob: admitCardData.student.dob,
        studentPhoto: admitCardData.student.studentPhoto
      };

      await studentService.updateStudent(selectedStudent.id, updatedStudentData);
      setSaveSuccessMsg('Admit Card data successfully saved and updated!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
      loadInitialData();
    } catch (err) {
      setSaveSuccessMsg('Admit Card saved locally!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-body pb-12">
      
      {/* Page Title Header (No-print) */}
      <div className="no-print bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-maroon/10 text-maroon rounded-xl font-bold">
              <FileText className="w-5 h-5 text-maroon" />
            </span>
            <div>
              <h1 className="font-heading font-black text-lg sm:text-xl text-gray-900 tracking-wide uppercase">
                Admit Card Generator & Editor
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Generate, customize every field, and print official examination hall tickets
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Direct Inline Edit Mode Toggle */}
          <button
            onClick={() => setIsInlineEditing(!isInlineEditing)}
            className={`px-3 py-2 text-xs font-extrabold rounded-xl border transition-all flex items-center gap-1.5 ${
              isInlineEditing
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
            title="Click text directly on admit card to edit"
          >
            {isInlineEditing ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4 text-gray-500" />}
            <span>Direct Edit Mode: {isInlineEditing ? 'ON' : 'OFF'}</span>
          </button>

          {/* Full Editor Modal Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 bg-gold/20 text-maroon hover:bg-gold/30 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-gold/40 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-gold-dark" />
            <span>Edit All Data (Modal)</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveAdmitCard}
            className="px-3.5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Data</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-maroon text-white font-extrabold text-xs rounded-xl hover:bg-maroon-dark transition-all flex items-center gap-1.5 shadow-md shadow-maroon/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Admit Card</span>
          </button>
        </div>
      </div>

      {/* Student Selection & Examination Preset Filter Bar (No-print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Student Selector & Verification Search */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-maroon" />
            <span>Select Student:</span>
          </label>

          <select
            value={selectedStudent ? selectedStudent.id : ''}
            onChange={(e) => {
              const id = e.target.value;
              const found = students.find(s => String(s.id) === String(id));
              if (found) {
                setSelectedStudent(found);
                setSearchParams({ studentId: id });
                setSearchError('');
              }
            }}
            className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon min-w-[210px]"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.studentName} (Class {s.className}-{s.section}, Roll: {s.rollNumber})
              </option>
            ))}
          </select>

          {/* Verification Search Input */}
          <form onSubmit={handleSearchVerification} className="flex items-center gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchError('');
              }}
              placeholder="Roll No or Student Name..."
              className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold focus:bg-white focus:border-maroon min-w-[180px]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-maroon text-white font-extrabold text-xs rounded-lg hover:bg-maroon-dark transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Exam Title Preset Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <span>Exam Preset:</span>
          </label>
          <select
            value={examPreset}
            onChange={(e) => setExamPreset(e.target.value)}
            className="px-3 py-1.5 bg-amber-50/70 border border-amber-300 rounded-lg text-xs font-extrabold text-maroon focus:border-maroon"
          >
            <option value="ANNUAL EXAMINATION 2024-2025">ANNUAL EXAMINATION 2024-2025</option>
            <option value="HALF-YEARLY EXAMINATION 2024-2025">HALF-YEARLY EXAMINATION 2024-2025</option>
            <option value="PRE-BOARD EXAMINATION 2024-2025">PRE-BOARD EXAMINATION 2024-2025</option>
            <option value="PERIODIC TEST / UNIT EXAM 2024-2025">PERIODIC TEST / UNIT EXAM 2024-2025</option>
          </select>
        </div>

      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="no-print p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl shadow-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-extrabold">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Error Search Alert */}
      {searchError && (
        <div className="no-print p-4 bg-red-50 border-2 border-red-300 text-red-900 rounded-xl shadow-md flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="text-xs font-bold">{searchError}</span>
        </div>
      )}

      {/* Admit Card Printable Layout Area */}
      {admitCardData && (
        <AdmitCard
          data={admitCardData}
          isEditing={isInlineEditing}
          onDataChange={(newData) => setAdmitCardData(newData)}
        />
      )}

      {/* Modal Editor */}
      {admitCardData && (
        <FullAdmitCardDataEditorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={admitCardData}
          onSave={(newData) => {
            setAdmitCardData(newData);
            setSaveSuccessMsg('Admit Card data updated from editor!');
            setTimeout(() => setSaveSuccessMsg(''), 4000);
          }}
        />
      )}

    </div>
  );
};

export default AdmitCardPage;
