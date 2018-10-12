import React, { Component } from "react";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";

class Store {
  @observable employeeList = [
    { name: "Patrick Crean", salary: 150 },
    { name: "Declan Magee", salary: 200 },
    { name: "Dave Clarke", salary: 300 }
  ];

  @computed get totalSum() {
    let sum = 0;
    this.employeeList.map( e => sum = sum + e.salary);
    return sum;
  }

  @computed get highEarnersCount () {
    return this.employeeList.filter( e => e.salary > 500).length
  }
}
const appStore = new Store();

const Row = props => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.salary}</td>
    </tr>
  );
};

@observer class Table extends Component {
  render() {
    const { store } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>Daily salary:</td>
          </tr>
        </thead>
        <tbody>
          {store.employeeList.map((e, i) => <Row key={i} data={e} />)}
        </tbody>
        <tfoot>
        <tr>
          <td>TOTAL:</td>
          <td>{store.totalSum}</td>
        </tr>
        <div className="fade">
          You have <u>{store.highEarnersCount} team members </u>that earn more that 500$/day.
        </div>
        </tfoot>
      </table>
    );
  }
}

class Controls extends Component {
  @action
  addEmployee = () => {
    const name = prompt("The Name:");
    let salary = prompt("The Salary:");
    if (typeof salary === 'string') {
      salary = parseInt(salary, 10);
    }
    this.props.store.employeeList.push({name, salary});
  }

  @action
  clearList = () => {
    this.props.store.employeeList = [];
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.clearList}>clear table</button>
        <button onClick={this.addEmployee}>add record</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>Mobx Table</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    );
  }
}

export default App;
