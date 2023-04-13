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
  course = null;
  students = [];

  render() {
    if (!this.course) return null;

    return (
      <div>
        Details:
        <ul>
          <li>Name: {this.course.name}</li>
          <li>Course Abbreviation: {this.course.courseAbbr}</li>
          <li>
            Students:
            <ul>
              {this.students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </li>
        </ul>
        <button type="button" onClick={this.edit}>
          Edit
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studyProgramService.getCourse(this.props.match.params.id, (course) => (this.course = course));
    studyProgramService.getStudents(
      this.props.match.params.id,
      (students) => (this.students = students)
    );
  }

  edit() {
    history.push('/courses/' + this.course.id + '/edit');
  }

  delete() {
    studyProgramService.removeCourse(this.props.match.params.id, () => history.push('/courses'));
  }
}

class CourseEdit extends Component {
  course = null;
  studentList = null;

  render() {
    if (!this.course) return null;

    return (
      <div>
        Course Name:{' '}
        <input
          type="text"
          value={this.course.name}
          onChange={(event) => (this.course.name = event.currentTarget.value)}
        />
        <br></br>
        Course Code:{' '}
        <input
          type="text"
          value={this.course.courseAbbr}
          onChange={(event) => (this.course.courseAbbr = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.remove}>
          Remove Course
        </button>
        <br></br>
        Students: {this.studentList}
      </div>
    );
  }

  mounted() {
    studyProgramService.getCourse(this.props.match.params.id, (course) => {
      this.course = course;
    });
  }

  save() {
    studyProgramService.updateCourse(this.course, () => {
      history.push('/courses');
    });
  }

  remove() {
    studyProgramService.removeCourse(this.props.match.params.id, () => {
      history.push('/courses');
    });
  }
}

class StudentList extends Component {
  students = [];

  newStudentName = null;
  newStudentEmail = null;
  newStudentCourseID = null;

  render() {
    return (
      <div>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}>
              <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
            </li>
          ))}
        </ul>
        <br />
        Name:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentName = event.currentTarget.value)}
        />
        <br></br>
        Email:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentEmail = event.currentTarget.value)}
        />
        <br></br>
        Course ID:{' '}
        <input
          type="text"
          onChange={(event) => (this.newStudentCourseID = event.currentTarget.value)}
        />
        <br></br>
        <button type="button" onClick={this.add}>
          Add Student
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }

  add() {
    studentService.addStudent(
      this.newStudentName,
      this.newStudentEmail,
      this.newStudentCourseID,
      () => {
        history.push('/students');
      }
    );
    this.mounted();
  }
}

class StudentEdit extends Component {
  student = null;
  newCourseName = null;
  newCourseCode = null;
  newCourseGroup = null;

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
        <button type="button" onClick={this.remove}>
          Remove Student
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

  remove() {
    studentService.removeStudent(this.props.match.params.id, () => {
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
    <Route exact path="/courses" component={CourseList} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route path="/courses/:id/edit" component={CourseEdit} />
  </HashRouter>
);
