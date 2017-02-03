import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Course } from './course';

@Injectable()
export class CourseService {
  private _url: string = 'api/courses';

  constructor(private _http: Http) { }

  getCourses(): Observable<Course[]> {
    return this._http.get(this._url)
      .map(this.extractData)
      .catch(this.errorHandler);
  }

  getCourse(id: string): Observable<Course> {
    return this.getCourses()
      .map(courses => courses.find(course => course.courseNumber === id));
  }

  errorHandler(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      const result = error.json() || '';
      const err = result.error || JSON.stringify(result);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  private extractData(response: Response) {
    let result = response.json();
    return result.data || {};
  }
}
