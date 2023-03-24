import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, studyProgramService } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/courses" activeStyle={{ color: 'darkblue' }}>
          Courses
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class CourseList extends Component {
  courses = [];

  render() {
    return (
      <ul>
        {this.courses.map((course) => (
          <li key={course.id}>
            <NavLink to={'/courses/' + course.id}>{course.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studyProgramService.getCourses((courses) => {
      this.courses = courses;
    });
  }
}

class CourseDetails extends Component {
  studyProgram = null;
  students = [];

  render() {
    if (!this.studyProgram) return null;

    return (
      <div>
        Details:
        <ul>
          <li>Name: {this.studyProgram.name}</li>
          <li>Course Abbreviation: {this.studyProgram.courseAbbr}</li>
          <li>
            Students:
            <ul>
              {this.students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  mounted() {
    studyProgramService.getDetails((courses, students) => {
      this.studyProgram = courses;
      this.students = students;
    });
  }
}

class CourseEdit extends Component {
  course = null;

  render() {
    if (!this.course) return null;

    return <div></div>;
  }

  mounted() {
    studyProgramService.getCourse(this.props.match.params.id, (student) => {
      this.course = course;
    });
  }

  save() {
    studyProgramService.updateCourse(this.course, () => {
      history.push('/courses');
    });
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
    <Route path="/courses" component={CourseList} />
    <Route path="/courses/:id/edit" component={CourseEdit} />
    <Route exact path="/courses/:id" component={CourseDetails} />
  </HashRouter>
);
