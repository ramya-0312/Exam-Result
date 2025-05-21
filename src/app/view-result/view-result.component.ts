import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

   registered = '';
   dob = '';
  semester = '';
   selectedSemester = '';
   errorMessage = '';
   totalMarks = '';
   resultStatus = '';
  student: {
    name: string;
    registered: string;
    department: string;
    marks: { name: string; marks: number }[];
    total: string;
    result: string;
  } | null = null;
  loadingResult = true;
  error = '';
  resultData = '';
  cgpa:number=0

  constructor(private router: Router,private http:HttpClient) {}

  // ngOnInit(): void {
  //   this.resultData = JSON.parse(localStorage.getItem('resultData') || '{}');
  //   const resultRaw = localStorage.getItem('resultData');
  //   const semester = localStorage.getItem('selectedSemester');
  //   const registered = localStorage.getItem('registerNumber');
  //   const dob = localStorage.getItem('dob');

  //   if (!resultRaw || !semester || !registered || !dob) {
  //     alert('Incomplete data. Please start again.');
  //     this.router.navigate(['/student-result']);
  //     return;
  //   }

  //   const resultParsed = JSON.parse(resultRaw);

  //   this.semester = semester;
  //   const data = resultParsed.response[0];

  //   this.resultData = {
  //     name: resultParsed.studentName,
  //     registerNumber: registered,
  //     department: 'N/A', // You can update if you get this from backend
  //     marks: [
  //       { subject: 'English', mark: data.english },
  //       { subject: 'Mathematics', mark: data.maths },
  //       { subject: 'Science', mark: data.science },
  //       { subject: 'Social', mark: data.social }
  //     ],
  //     total: data.grade,
  //     result: data.result
  //   };
  // }
  ngOnInit(): void {
    const result = this.getGradeAndCGPA();
console.log(result.grade);  // Output: Grade (e.g., 'A', 'B+', 'U')
console.log(result.cgpa);   // Output: CGPA (e.g., 9, 8, 0 for fail)
    setTimeout(() => {
      this.loadingResult=false;

    },2000);
    const resultRaw = localStorage.getItem('resultData');
    const semester = localStorage.getItem('selectedSemester');
    const registered = localStorage.getItem('registerNumber');
    const dob = localStorage.getItem('dob');

    if (!resultRaw || !semester || !registered || !dob) {
      alert('Incomplete data. Please start again.');
      this.router.navigate(['/student-result']);
      return;
    }
    this.fetchResult(registered, semester);

    const resultParsed = JSON.parse(resultRaw);
    const data = resultParsed.response;


    // Set the values properly
    this.semester = semester;
    this.student = {
      name: data.name,
      registered: data.registered,
      department: data.department,
      marks: data.subjects,
      total: (data.totalMarks),
      result: data.resultStatus
    };

  }
  showRevaluation = false;
selectedSubjects: string[] = [];

toggleRevaluation() {
  this.showRevaluation = !this.showRevaluation;
}
fetchResult(registered: string, semester: string): void {
  this.http.get<any>(`http://localhost:8080/api/result?regNo=${registered}&semester=${semester}`)
    .subscribe(
      (res) => {
        // Handle result data
      },
      (err) => {
        console.error("Error fetching result:", err);
      }
    );
}

onSubjectToggle(event: any) {
  const subject = event.target.value;
  if (event.target.checked) {
    this.selectedSubjects.push(subject);
  } else {
    this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject);
  }
}

applyRevaluation() {
  if (this.selectedSubjects.length === 0) {
    alert('Please select at least one subject.');
    return;
  }

  const revalRequest = {
    registerNumber: this.student?.registered,
    semester: this.semester,
    subjects: this.selectedSubjects
  };

  console.log('Sending Revaluation Request:', revalRequest);
  alert('Revaluation request submitted successfully!');
  this.showRevaluation = false;
  this.selectedSubjects = [];
}



getPercentage(): number {
  const totalMarksObtained = Number(this.student?.total);  // Ensure it's a number
  console.log("Total Marks Obtained: ", totalMarksObtained);  // Debugging log
  const totalPossibleMarks = 500;  // Total marks, assume it's out of 500
  const percentage = Math.round((totalMarksObtained / totalPossibleMarks) * 100);
  console.log("Calculated Percentage: ", percentage);  // Debugging log
  return percentage;
}

  getGradeAndCGPA(): { grade: string, cgpa: number } {
    const percentage = this.getPercentage();
    let grade = '';
    let cgpa = 0;

    if (percentage >= 90) {
        grade = 'A+';
        cgpa = 10;
    } else if (percentage >= 80) {
        grade = 'A';
        cgpa = 9;
    } else if (percentage >= 70) {
        grade = 'B+';
        cgpa = 8;
    } else if (percentage >= 60) {
        grade = 'B';
        cgpa = 7;
    } else if (percentage >= 50) {
        grade = 'C+';
        cgpa = 6;
    } else if (percentage >= 40) {
        grade = 'C';
        cgpa = 5;
    } else {
        grade = 'u ';
        cgpa = 0;
    }

    return { grade, cgpa };
}


  goHome() {
    this.router.navigate(['/select-semester']);
  }
  goToRevaluation() {
    this.router.navigate(['/revaluation']);
  }

  printPage() {
    window.print();
  }
  confirmLogout() {
    localStorage.clear();
     this.router.navigate(['/home']);
   }
}
