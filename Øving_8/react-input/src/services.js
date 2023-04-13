import { pool } from './mysql-pool';

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

  addStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, groupId) VALUES (?, ?, ?)',
      [student.name, student.email, student.groupId],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  removeStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, groupId=? WHERE id=?',
      [student.name, student.email, student.groupId, student.id],
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

  getStudents(groupId, success) {
    pool.query('SELECT * FROM Students WHERE groupId = ?', [groupId], (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      success(results);
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

  addCourse(student, success) {
    pool.query(
      'INSERT INTO Courses (name, code) VALUES (?, ?)',
      [student.name, student.code],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  removeCourse(id, success) {
    pool.query('DELETE FROM Courses WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

export let studyProgramService = new StudyProgramService();
export let studentService = new StudentService();
