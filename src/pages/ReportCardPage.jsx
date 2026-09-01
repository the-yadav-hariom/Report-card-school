import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { studentService } from '../services/studentService';
import { schoolService } from '../services/schoolService';
import ReportCard from '../components/ReportCard';
import FullReportCardDataEditorModal from '../components/FullReportCardDataEditorModal';
import AdvancedReportCardDataModal from '../components/AdvancedReportCardDataModal';
import { Printer, Edit3, Users, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';

const ReportCardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const studentIdParam = searchParams.get('studentId');

  const [students, setStudents] = useState([]);
  const [school, setSchool] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    loadData();
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
          setSelectedStudent(null);
        }
      } else if (!selectedStudent) {
        setSelectedStudent(students[0]);
      }
    }
  }, [students, studentIdParam]);

  const loadData = async (updatedStudent) => {
    const sData = await studentService.getAllStudents();
    const schData = await schoolService.getSchoolSettings();
    setStudents(sData);
    setSchool(schData);

    if (updatedStudent && updatedStudent.id) {
      setSelectedStudent(updatedStudent);
      setSearchParams({ studentId: updatedStudent.id });
    } else if (selectedStudent) {
      const refreshed = sData.find(s => String(s.id) === String(selectedStudent.id));
      if (refreshed) setSelectedStudent(refreshed);
    }
  };

  const handleSearchVerification = async (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchInput.trim()) {
      setSearchError('Please enter a Roll Number or Enrollment Number.');
      return;
    }

    const res = await studentService.verifyStudentResult(searchInput);
    if (res.success && res.student) {
      setSelectedStudent(res.student);
      setSearchParams({ studentId: res.student.id });
      setSearchInput('');
      setSearchError('');
    } else {
      setSearchError(res.message || 'Invalid Roll Number or Enrollment Number!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-body pb-12">
      
      {/* Top Action Bar (Hidden during printing via CSS .no-print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Student Selector & Verification Input */}
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
              className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon min-w-[200px]"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.studentName} (Class {s.className}-{s.section}, Roll: {s.rollNumber})
                </option>
              ))}
            </select>

            <form onSubmit={handleSearchVerification} className="flex items-center gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSearchError('');
                }}
                placeholder="Enter Roll No / Enrollment ID..."
                className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold focus:bg-white focus:border-maroon min-w-[180px]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-maroon text-white font-extrabold text-xs rounded-lg hover:bg-maroon-dark transition-all"
              >
                Verify
              </button>
            </form>
          </div>

        {/* Buttons: Update Options & Print */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* New Page Editor Link */}
          {selectedStudent && (
            <Link
              to={`/update-report-card?studentId=${selectedStudent.id}`}
              className="px-3 py-2 bg-maroon/10 text-maroon hover:bg-maroon/20 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-maroon/20"
              title="Open dedicated editor page"
            >
              <ExternalLink className="w-4 h-4 text-maroon" />
              <span>Full Editor Page</span>
            </Link>
          )}

          {/* New Modal Model Button */}
          <button
            onClick={() => setIsAdvancedModalOpen(true)}
            className="px-3 py-2 bg-gold/20 text-maroon hover:bg-gold/30 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-gold/40 shadow-2xs"
            title="Open new modal model"
          >
            <Sparkles className="w-4 h-4 text-gold-dark" />
            <span>New Modal</span>
          </button>

          {/* Existing Modal Button */}
          <button
            onClick={() => setIsEditorModalOpen(true)}
            className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-gray-300"
          >
            <Edit3 className="w-4 h-4 text-gray-700" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-maroon text-white font-extrabold text-xs rounded-xl hover:bg-maroon-dark transition-all flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>

      {/* Invalid Roll/Enrollment Number Alert */}
      {searchError && (
        <div className="no-print p-4 bg-red-50 border-2 border-red-300 text-red-900 rounded-2xl shadow-md flex items-center gap-3 animate-shake">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-sm text-red-900 uppercase">Invalid Credentials!</h4>
            <p className="text-xs font-bold text-red-700 mt-0.5">{searchError}</p>
            <p className="text-[11px] text-red-600 mt-0.5">Please check your Roll Number or Enrollment ID and try again, or select a valid student from the dropdown.</p>
          </div>
        </div>
      )}

      {/* Report Card Render Area */}
      {selectedStudent && (
        <ReportCard student={selectedStudent} school={school} />
      )}

      {/* Standard Full Report Card Data Editor Modal */}
      {selectedStudent && (
        <FullReportCardDataEditorModal
          isOpen={isEditorModalOpen}
          onClose={() => setIsEditorModalOpen(false)}
          student={selectedStudent}
          onSaveSuccess={loadData}
        />
      )}

      {/* New Advanced Modal Model */}
      {selectedStudent && (
        <AdvancedReportCardDataModal
          isOpen={isAdvancedModalOpen}
          onClose={() => setIsAdvancedModalOpen(false)}
          student={selectedStudent}
          onSaveSuccess={loadData}
        />
      )}

    </div>
  );
};

export default ReportCardPage;
