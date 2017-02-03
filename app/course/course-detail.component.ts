import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CourseService } from './course.service';
import { Course } from './course';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  providers: [CourseService]
})
export class CourseDetailComponent implements OnInit {
  @Input()
  course: Course;
  title: string = 'Course Details';
  private id: string;

  constructor(private _service: CourseService, private _route: ActivatedRoute) { }

  getCourse() {
    this._service.getCourse(this.id)
      .subscribe(course => this.course = course);
  }

  ngOnInit() {
    if (!this.course) {
      this._route.params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.getCourse());
    }
  }
}
