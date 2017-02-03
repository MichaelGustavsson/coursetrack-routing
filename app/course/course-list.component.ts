import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  moduleId: module.id,
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  providers: [CourseService]
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  course: Course;
  errorMessage: string;
  title: string = 'Courses we recommend';

  constructor(private _service: CourseService, private _router: Router) { }

  getCourses(): void {
    this._service.getCourses()
      .subscribe(courses => this.courses = courses,
      error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getCourses();
  }

  onSelect(course: Course): void {
    this._router.navigate(['/course', course.courseNumber]);
  }
}
