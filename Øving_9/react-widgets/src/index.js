import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, groupService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/groups">Groups</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to StudAdm</Card>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    studentService
      .getStudents()
      .then((students) => {
        this.students = students;
      })
      .catch((error) => Alert.danger('Error getting students'));
  }
}

class StudentDetails extends Component {
  student = null;
  group = null;

  render() {
    if (!this.student || !this.group) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Gruppe:</Column>
            <Column>
              <NavLink to={'/groups/' + this.group.id}>{this.group.name}</NavLink>
            </Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then((student) => {
        this.student = student;
      })
      .then((student) => {
        studentService
          .getGroup(this.student.groupId)
          .then((group) => {
            this.group = group;
          })
          .catch((error) => Alert.danger('Error! Failed to get group'));
      })
      .catch((error) => console.error(error));
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;
    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then((student) => {
        this.student = student;
      })
      .catch((error) => Alert.danger('Error getting students'));
  }

  save() {
    studentService
      .updateStudent(this.student)
      .then((response) => {
        history.push('/students/' + this.props.match.params.id);
      })
      .catch((error) => Alert.danger('An error occurred while updating'));
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

class GroupList extends Component {
  groups = [];

  render() {
    return (
      <Card title="Groups">
        {this.groups.map((group) => (
          <Row key={group.id}>
            <Column>
              <NavLink to={'/groups/' + group.id}>{group.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    groupService
      .getGroups()
      .then((groups) => {
        this.groups = groups;
      })
      .catch((error) => Alert.danger('Error getting group'));
  }
}

class GroupDetails extends Component {
  group = null;
  members = [];

  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Group details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.group.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Beskrivelse:</Column>
            <Column>{this.group.description}</Column>
          </Row>
          <Row>
            <Column width={2}>Bilde:</Column>
          </Row>
          <Row>
            <Column>
              <img src={this.group.image}></img>
            </Column>
          </Row>
          <Row>
            <Column width={2}>Medlemmer:</Column>
          </Row>
          {this.members.map((member) => (
            <Row key={member.id}>
              <Column>
                <NavLink to={'/students/' + member.id}>{member.name}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    groupService
      .getGroup(this.props.match.params.id)
      .then((group) => (this.group = group))
      .catch((error) => Alert.danger('Error getting group'));

    groupService
      .getMembers(this.props.match.params.id)
      .then((members) => (this.members = members))
      .catch((error) => Alert.danger('Error getting members'));
  }

  edit() {
    history.push('/groups/' + this.group.id + '/edit');
  }
}

class GroupEdit extends Component {
  group = null;

  render() {
    if (!this.group) return null;

    return (
      <div>
        <Card title="Edit group">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event) => (this.group.name = event.currentTarget.value)}
          />
          <Form.Label>Details:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.description}
            onChange={(event) => (this.group.description = event.currentTarget.value)}
          />
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.image}
            onChange={(event) => (this.group.image = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    groupService
      .getGroup(this.props.match.params.id)
      .then((group) => (this.group = group))
      .catch((error) => Alert.danger('Error getting group'));
  }

  save() {
    groupService
      .updateGroup(this.group)
      .then((response) => {
        history.push('/groups/' + this.props.match.params.id);
      })
      .catch((error) => Alert.danger('An error occured while updating'));
  }

  cancel() {
    history.push('/groups/' + this.props.match.params.id);
  }
}

createRoot(document.getElementById('root')).render(
  <div>
    <Alert />
    <HashRouter>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/groups" component={GroupList} />
      <Route exact path="/groups/:id" component={GroupDetails} />
      <Route exact path="/groups/:id/edit" component={GroupEdit} />
    </HashRouter>
  </div>
);
