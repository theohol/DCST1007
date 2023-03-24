import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

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
        {/* {' ' /* Add extra space between menu items */}
        <NavLink to="/courses" activeStyle={{ color: 'darkblue' }}>
          Studieprogram
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

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

class StudentDetails extends Component {
  student = null;
  course = '';

  render() {
    if (!this.student) return null;

    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>Course: {this.course}</li>
      </ul>
    );
  }

  mounted() {
    pool.query(
      'SELECT name, email FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.student = results[0];

        pool.query(
          'SELECT name FROM Courses WHERE id = ?',
          [this.student.studyProgramId],
          (error, results) => {
            if (error) return console.error(error);
            console.log(results);

            this.course = results[0].name;
          }
        );
      }
    );
  }
}

class Courses extends Component {
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
    pool.query('SELECT id, name FROM Courses', (error, results) => {
      if (error) return console.error(error);

      this.courses = results;
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
    pool.query(
      'SELECT courseAbbr, name FROM Courses WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.studyProgram = results[0];
      }
    );
    pool.query(
      'SELECT id, name FROM Students WHERE studyProgramId = ?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.students = results;
      }
    );
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/courses" component={Courses} />
      <Route exact path="/courses/:id" component={CourseDetails} />
    </div>
  </HashRouter>
);
