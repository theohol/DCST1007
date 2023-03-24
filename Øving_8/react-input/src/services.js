import { pool } from './mysql-pool';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class StudyProgramService {
  getCourses(success) {
    pool.query('SELECT * FROM Courses', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getCourse(id, success) {
    pool.query('SELECT * FROM Courses WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateCourse(course, success) {
    pool.query(
      'UPDATE Courses SET name=?, courseAbbr=? WHERE id=?',
      [course.name, course.courseAbbr, course.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  getDetails(success) {
    pool.query(
      'SELECT courseAbbr, name FROM Courses WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        success(results[0]);
      }
    );

    pool.query(
      'SELECT id, name FROM Students WHERE studyProgramId = ?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        success(results);
      }
    );
  }
}

export let studyProgramService = new StudyProgramService();
export let studentService = new StudentService();
