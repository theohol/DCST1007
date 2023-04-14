import { pool } from './mysql-pool';

class StudentService {
  getStudents() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Students', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getStudent(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getGroup(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  updateStudent(student) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Students SET name=?, email=? WHERE id=?',
        [student.name, student.email, student.id],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }
}
export let studentService = new StudentService();

class GroupService {
  getGroups() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Groups', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getGroup(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getMembers(memberGroup) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Students WHERE groupID=?', [memberGroup], (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  updateGroup(group) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Groups SET name=?, description=?, image=? WHERE id=?',
        [group.name, group.description, group.image, group.id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

export let groupService = new GroupService();
