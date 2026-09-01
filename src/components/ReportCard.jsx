import React from 'react';
import { calculateGrade, computeStudentTotals } from '../services/initialData';

const ReportCard = ({ student, school }) => {
  if (!student) return null;

  const { totalGrand, maxPossible, percentage, overallGrade, attendancePct } = computeStudentTotals(student);

  return (
    <div className="report-card-printable bg-paper p-4 sm:p-8 rounded-xl border border-paper-border shadow-lg font-body max-w-5xl mx-auto my-2 text-gray-900 print:p-2 print:my-0">
      
      {/* 1. INSTITUTIONAL HEADER */}
      <div className="border-b-2 border-maroon pb-2 mb-3 print:pb-1 print:mb-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <img 
            src={school?.schoolLogo || "/mahaviri_shishu_vidya_mandir_logo/screen.png"} 
            alt="School Crest" 
            className="w-14 h-14 print:w-12 print:h-12 object-contain rounded bg-white p-0.5 border border-maroon/20 shadow-xs"
          />
          <div>
            <h1 className="font-heading text-lg sm:text-xl print:text-base font-extrabold text-maroon uppercase tracking-wide">
              {school?.schoolName || 'MAHAVIRI SHISHU VIDYA MANDIR'}
            </h1>
            <p className="text-xs print:text-[10px] font-bold text-gray-700 mt-0.5">
              {school?.address || 'Ward No-01 Lakhraw Siwan (Bihar)'}
            </p>
            <p className="text-[10px] print:text-[9px] text-gray-600 font-medium mt-0.5">
              Affiliated to {school?.affiliationNumber || 'G.F.E.R.T, PATNA • Code: RTE/SWN/0052'} • Contact: {school?.contactNumber || '+91 98765 43210'}
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right border-t sm:border-t-0 border-gray-300 pt-1 sm:pt-0">
          <span className="inline-block bg-maroon/10 text-maroon font-bold text-[11px] print:text-[9px] px-2 py-0.5 rounded-full uppercase border border-maroon/20">
            Session: {school?.academicSession || student?.academicSession || '2024-25'}
          </span>
          <p className="text-xs print:text-[10px] font-extrabold text-maroon-dark mt-0.5 tracking-wider uppercase">
            ANNUAL REPORT CARD
          </p>
        </div>
      </div>

      {/* 2. STUDENT PROFILE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3 print:mb-2 border border-gray-300 rounded-lg p-2.5 print:p-1.5 bg-white/80 shadow-2xs">
        {/* Photo / Initials */}
        <div className="flex justify-center sm:justify-start items-center">
          {student.studentPhoto ? (
            <div className="w-16 h-16 print:w-14 print:h-14 rounded-lg overflow-hidden border-2 border-maroon/40 shadow-sm bg-white p-0.5">
              <img src={student.studentPhoto} alt={student.studentName} className="w-full h-full object-cover rounded" />
            </div>
          ) : (
            <div className="w-16 h-16 print:w-14 print:h-14 rounded-lg bg-maroon/10 border-2 border-maroon/30 text-maroon font-extrabold text-xl print:text-lg flex items-center justify-center shadow-inner">
              {student.initials || 'ST'}
            </div>
          )}
        </div>

        {/* Info Columns */}
        <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-3 text-xs print:text-[9.5px]">
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Student Name</span>
            <span className="font-bold text-xs print:text-[10px] text-gray-900">{student.studentName}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Father's Name</span>
            <span className="font-semibold text-gray-800">{student.fatherName}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Mother's Name</span>
            <span className="font-semibold text-gray-800">{student.motherName}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Class & Section</span>
            <span className="font-semibold text-gray-900">Class {student.className} - {student.section}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Roll Number</span>
            <span className="font-semibold text-gray-900">{student.rollNumber}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Enrollment No.</span>
            <span className="font-semibold text-gray-900">{student.enrollmentNumber}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Date of Birth</span>
            <span className="font-medium text-gray-800">{student.dob}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">House</span>
            <span className="font-medium text-gray-800">{student.house || 'Red House'}</span>
          </div>
          <div>
            <span className="block text-[9.5px] print:text-[8px] text-gray-500 font-bold uppercase">Address</span>
            <span className="font-medium text-gray-800 truncate block">{student.address}</span>
          </div>
        </div>
      </div>

      {/* 3. SCHOLASTIC AREA MARKS TABLE */}
      <div className="mb-3 print:mb-2 overflow-x-auto">
        <h3 className="font-heading font-bold text-xs print:text-[10px] text-maroon mb-1 print:mb-0.5 uppercase tracking-wide border-b border-maroon/30 pb-0.5">
          1. SCHOLASTIC AREA (Academic Evaluation)
        </h3>
        <table className="w-full text-center border-collapse border border-gray-300 text-xs min-w-[700px] bg-white">
          <thead>
            <tr className="bg-maroon text-white font-bold text-[11px] uppercase">
              <th className="border border-maroon-dark p-2 text-left w-36" rowSpan={2}>Subjects</th>
              <th className="border border-maroon-dark p-1 bg-maroon-dark/90" colSpan={6}>TERM-1 (100 Marks)</th>
              <th className="border border-maroon-dark p-1 bg-maroon-dark/90" colSpan={6}>TERM-2 (100 Marks)</th>
              <th className="border border-maroon-dark p-1 bg-gold/90 text-maroon-dark" colSpan={2}>OVERALL</th>
            </tr>
            <tr className="bg-gray-100 text-[9px] font-bold text-gray-700 uppercase">
              <th className="border border-gray-300 p-1">Test (10)</th>
              <th className="border border-gray-300 p-1">NB (5)</th>
              <th className="border border-gray-300 p-1">SEA (5)</th>
              <th className="border border-gray-300 p-1 bg-gray-200">Test Tot (20)</th>
              <th className="border border-gray-300 p-1">Half Yr (80)</th>
              <th className="border border-gray-300 p-1 bg-maroon/10 text-maroon font-extrabold">T1 TOT (100)</th>
              
              <th className="border border-gray-300 p-1">Test (10)</th>
              <th className="border border-gray-300 p-1">NB (5)</th>
              <th className="border border-gray-300 p-1">SEA (5)</th>
              <th className="border border-gray-300 p-1 bg-gray-200">Test Tot (20)</th>
              <th className="border border-gray-300 p-1">Yearly (80)</th>
              <th className="border border-gray-300 p-1 bg-maroon/10 text-maroon font-extrabold">T2 TOT (100)</th>
              
              <th className="border border-gray-300 p-1 font-bold bg-gold/20 text-maroon">GRAND TOT</th>
              <th className="border border-gray-300 p-1 font-bold bg-gold/20 text-emerald-800">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
            {student.scholastic && student.scholastic.map((sub, idx) => {
              const testTot1 = (sub.per1 || 0) + (sub.nb1 || 0) + (sub.sea1 || 0);
              const tot1 = testTot1 + (sub.hy1 || 0);

              const testTot2 = (sub.per2 || 0) + (sub.nb2 || 0) + (sub.sea2 || 0);
              const tot2 = testTot2 + (sub.yr2 || 0);

              const grand = tot2 > 0 ? ((tot1 + tot2) / 2) : tot1;
              const grade = calculateGrade(grand);

              return (
                <tr key={idx} className="hover:bg-maroon/5 transition-colors">
                  <td className="border border-gray-300 p-2 text-left font-bold text-gray-900">{sub.subject}</td>
                  
                  {/* Term 1 */}
                  <td className="border border-gray-300 p-1">{sub.per1}</td>
                  <td className="border border-gray-300 p-1">{sub.nb1}</td>
                  <td className="border border-gray-300 p-1">{sub.sea1}</td>
                  <td className="border border-gray-300 p-1 font-semibold bg-gray-50">{testTot1}</td>
                  <td className="border border-gray-300 p-1">{sub.hy1}</td>
                  <td className="border border-gray-300 p-1 font-bold text-maroon bg-maroon/5">{tot1}</td>

                  {/* Term 2 */}
                  <td className="border border-gray-300 p-1">{sub.per2 ?? '-'}</td>
                  <td className="border border-gray-300 p-1">{sub.nb2 ?? '-'}</td>
                  <td className="border border-gray-300 p-1">{sub.sea2 ?? '-'}</td>
                  <td className="border border-gray-300 p-1 font-semibold bg-gray-50">{sub.yr2 ? testTot2 : '-'}</td>
                  <td className="border border-gray-300 p-1">{sub.yr2 ?? '-'}</td>
                  <td className="border border-gray-300 p-1 font-bold text-maroon bg-maroon/5">{tot2 || '-'}</td>

                  {/* Overall */}
                  <td className="border border-gray-300 p-1 font-extrabold text-maroon bg-gold/10">{grand.toFixed(2)}</td>
                  <td className="border border-gray-300 p-1 font-extrabold text-emerald-700 bg-gold/10">{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. CO-SCHOLASTIC & ATTENDANCE & SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-2.5 print:mb-2 print:gap-2">
        
        {/* Co-Scholastic Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="bg-maroon text-white px-2 py-0.5 font-bold text-[10px] print:text-[9px] uppercase tracking-wider">
            2. CO-SCHOLASTIC ACTIVITIES
          </div>
          <table className="w-full text-[10px] print:text-[8.5px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-[9px] print:text-[8px] text-gray-600 uppercase font-bold border-b border-gray-300">
                <th className="p-1 border-r border-gray-300">Activity</th>
                <th className="p-1 text-center border-r border-gray-300">Half Yr</th>
                <th className="p-1 text-center">Annual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-bold text-gray-800">
              {student.coScholastic && student.coScholastic.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-1 border-r border-gray-300 text-gray-900">{item.activity}</td>
                  <td className="p-1 text-center border-r border-gray-300 text-emerald-700">{item.hyGrade}</td>
                  <td className="p-1 text-center text-emerald-700">{item.annualGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Summary */}
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="bg-maroon text-white px-2 py-0.5 font-bold text-[10px] print:text-[9px] uppercase tracking-wider">
            3. ATTENDANCE RECORD
          </div>
          <table className="w-full text-[10px] print:text-[8.5px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-[9px] print:text-[8px] text-gray-600 uppercase font-bold border-b border-gray-300">
                <th className="p-1 border-r border-gray-300">Term</th>
                <th className="p-1 text-center border-r border-gray-300">Present / Total</th>
                <th className="p-1 text-center">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[10px] print:text-[8.5px] text-gray-800 font-medium">
              <tr>
                <td className="p-1 border-r border-gray-300">Term 1</td>
                <td className="p-1 text-center border-r border-gray-300">{student.attendance?.t1Present || 0} / {student.attendance?.t1Total || 60}</td>
                <td className="p-1 text-center font-bold text-maroon">
                  {Math.round(((student.attendance?.t1Present || 0) / (student.attendance?.t1Total || 60)) * 100)}%
                </td>
              </tr>
              <tr>
                <td className="p-1 border-r border-gray-300">Half Yearly</td>
                <td className="p-1 text-center border-r border-gray-300">{student.attendance?.hyPresent || 0} / {student.attendance?.hyTotal || 60}</td>
                <td className="p-1 text-center font-bold text-maroon">
                  {Math.round(((student.attendance?.hyPresent || 0) / (student.attendance?.hyTotal || 60)) * 100)}%
                </td>
              </tr>
              <tr>
                <td className="p-1 border-r border-gray-300">Term 2</td>
                <td className="p-1 text-center border-r border-gray-300">{student.attendance?.t2Present || 0} / {student.attendance?.t2Total || 60}</td>
                <td className="p-1 text-center font-bold text-maroon">
                  {Math.round(((student.attendance?.t2Present || 0) / (student.attendance?.t2Total || 60)) * 100)}%
                </td>
              </tr>
              <tr>
                <td className="p-1 border-r border-gray-300">Annual</td>
                <td className="p-1 text-center border-r border-gray-300">{student.attendance?.annualPresent || 0} / {student.attendance?.annualTotal || 60}</td>
                <td className="p-1 text-center font-bold text-maroon">
                  {Math.round(((student.attendance?.annualPresent || 0) / (student.attendance?.annualTotal || 60)) * 100)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Overall Summary Box */}
        <div className="border border-gray-300 rounded-lg bg-white p-2 print:p-1.5 flex flex-col justify-between text-[10px] print:text-[8.5px]">
          <div>
            <h4 className="font-heading font-bold text-[10px] print:text-[9px] uppercase text-maroon mb-1 border-b border-gray-200 pb-0.5">
              4. RESULT SUMMARY
            </h4>
            <div className="space-y-0.5">
              <div className="flex justify-between border-b border-gray-100 pb-0.5">
                <span className="text-gray-600 font-semibold">Grand Total Marks:</span>
                <span className="font-extrabold text-maroon">{totalGrand.toFixed(2)} / {maxPossible}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-0.5">
                <span className="text-gray-600 font-semibold">Overall Percentage:</span>
                <span className="font-extrabold text-maroon">{percentage}%</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-0.5">
                <span className="text-gray-600 font-semibold">Overall Grade:</span>
                <span className="font-extrabold text-emerald-700">{overallGrade}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-0.5">
                <span className="text-gray-600 font-semibold">Attendance Pct:</span>
                <span className="font-bold text-gray-800">{attendancePct}%</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-gray-600 font-semibold">Final Result:</span>
                <span className={`px-1.5 py-0.5 rounded font-extrabold text-[9.5px] print:text-[8.5px] ${
                  student.resultStatus === 'Promote' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {student.resultStatus === 'Promote' ? 'PROMOTED TO NEXT CLASS' : (student.resultStatus || 'TERM PENDING')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. REMARKS & SIGNATURES */}
      <div className="border-t border-gray-300 pt-1.5 mt-1.5 print:pt-1 print:mt-1">
        <div className="mb-1.5 print:mb-1 p-1.5 print:p-1 bg-white border border-gray-300 rounded-lg text-[10px] print:text-[8.5px]">
          <span className="font-bold text-maroon uppercase">Teacher's Remarks: </span>
          <span className="text-gray-800 italic">{student.remarks || 'Diligent student with polite behavior and consistent academic focus.'}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[9.5px] print:text-[8.5px] text-gray-700 font-bold pt-1">
          <div>
            <div className="w-28 h-px bg-gray-400 mx-auto mb-0.5"></div>
            <span>Class Teacher Signature</span>
          </div>
          <div>
            <div className="w-28 h-px bg-gray-400 mx-auto mb-0.5"></div>
            <span>Principal Signature ({school?.principalName || 'Dr. Rajan Kumar'})</span>
          </div>
          <div className="text-right italic text-gray-500 font-normal text-[8.5px] print:text-[8px]">
            <span>Official e-Report Card</span>
            <br />
            <span>Stitch Academia Portal</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReportCard;
