import { pool } from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
}

export class Group {
  id: number = 0;
  name: string = '';
  description: string = '';
  image: string = '';
}

class StudentService {
  getStudents() {
    return new Promise<Student[]>((resolve, reject) => {
      pool.query('SELECT * FROM Students', (error: any, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Student[]);
      });
    });
  }

  getStudent(id: number) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM Students WHERE id=?',
        [id],
        (error: any, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Student);
        }
      );
    });
  }

  getGroup(id: number) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM Groups WHERE id=?',
        [id],
        (error: any, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}
export let studentService = new StudentService();

class GroupService {
  getGroups() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Groups', (error: any, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getGroup(id: number) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM Groups WHERE id=?',
        [id],
        (error: any, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  getMembers(memberGroup: number) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM Students WHERE groupID=?',
        [memberGroup],
        (error: any, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }

  updateGroup(group: Group) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Groups SET name=?, description=?, image=?, WHERE id=?',
        [group.name, group.description, group.image, group.id],
        (error: any, results: any) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}
export let groupService = new GroupService();
