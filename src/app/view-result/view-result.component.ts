import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-result-view',
  templateUrl: './view-result.component.html',
})
export class ResultViewComponent implements OnInit {
  student: any;

  ngOnInit() {
    const data = localStorage.getItem('studentResult');
    if (data) {
      this.student = JSON.parse(data);
    }
  }
}
