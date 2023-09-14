import React from "react";
import ReactDOM from "react-dom";

export default class TodoList extends React.Component {

    state = {
        tasks: [{isComplete: false, msg: 'message'}
             , {isComplete : false, msg: 'message2'}],
        tasksMessage: ""   
    };

    handleUpdate = e => {
        this.setState({
            tasksMessage: e.target.value
        });
    };

    handleOnSub = e => {
    if (Boolean(this.state.tasksMessage) === false) return false;

        this.setState(state => {
           let newTasks  =  state.tasks.concat({
                     isComplete: false,
                     msg: state.tasksMessage
                 });
          return {
            tasks: newTasks,
            tasksMessage: ""
          };
        });
        e.preventDefault();
   };

   handleTasks = sn => {
    this.setState(state => {
      let newTasks = state.tasks.map((task, i) => {
        if (i === sn) {
          return { isComplete: !task.isComplete, msg: task.msg };
        }
        return task;
      });
      return {
        tasks: newTasks
      };
    });
  };

    render() {
        return (
            <>
                <div>
                    <Title>Todo List</Title>
                            <form onSubmit={this.handleOnSub}>
                                <TaskInputText value={this.state.tasksMessage} handleUpdate={this.handleUpdate} />
                                <Submission>Add Task</Submission>
                            </form>
                  <CurrentStatus tasks={this.state.tasks} />
                  <ShowTasks tasks={this.state.tasks} manage={this.handleTasks} />
                </div>
                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </>
        );
    }
}

const Title = ({ children }) => <h2>{children}</h2>;

const Submission = ({ children }) => (
   <button type="submit" value="Submit">{children}</button>
);

const TaskInputText = ({ val, handleUpdate }) => {
  return <input type="text" value={val} onChange={handleUpdate} />;
};

const CurrentStatus = ({ tasks }) => {
  const isNotComplete = tasks.filter(task => task.isComplete !== true);
  return (
    <p>{isNotComplete.length} remaining out of {tasks.length} tasks</p>
  );
};

const ShowTasks = ({ tasks, manage }) => {
  return (
    <ul>
      {tasks.map((e, i) => (
        <li key={i} onClick={() => manage(i)} className={e.isComplete ? "is-done" : "is-not-done"}>{e.msg}</li>
      ))}
    </ul>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoList />, rootElement);
