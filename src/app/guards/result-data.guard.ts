import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResultDataGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const resultData = localStorage.getItem('resultData');
    const semester = localStorage.getItem('selectedSemester');
    const registered = localStorage.getItem('registerNumber');
    const dob = localStorage.getItem('dob');

    if (resultData && semester && registered && dob) {
      return true; // Allow access
    } else {
      alert('Access denied. Please fill in the required information.');
      this.router.navigate(['/student-result']); // Redirect to input page
      return false;
    }
  }
}
