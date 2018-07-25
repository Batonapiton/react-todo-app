import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem";

class TodoContainer extends Component {
  state = {
    items: [],
    newItemText: "",
    newItemId: 0
  };

  componentDidMount() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  handleDelete = id => {
    const items = this.state.items.filter(i => i.id !== id);
    this.setState({ items });
    this.saveToLocalStorage(items);
  };

  handleAddNewItem = e => {
    const items = [
      ...this.state.items,
      {
        id: this.state.newItemId,
        value: this.state.newItemText,
        checked: false
      }
    ];
    this.setState({
      items,
      newItemText: "",
      newItemId: this.state.newItemId + 1
    });
    console.log(this.state.items);
    this.saveToLocalStorage(items);
  };
  handleDeleteFinished = () => {
    const items = this.state.items.filter(i => i.checked !== true);
    this.setState({ items });
    this.saveToLocalStorage(items);
  };

  handleCheckboxChange = id => {
    const index = this.state.items.findIndex(i => i.id === id);
    console.log(index);
    const items = this.state.items;
    items[index].checked = !items[index].checked;
    this.setState({ items });
    this.saveToLocalStorage(items);
  };


  updateInput = e => {
    this.setState({ newItemText: e.target.value });
    console.log(this.state.newItemText);
  };

  saveToLocalStorage = items => {
    console.log(this.state);
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("newItemText", "");
    localStorage.setItem("newItemId", this.state.newItemId + 1);
  };
   renderItems = items => {
    return (items.map(i => (

      <TodoItem
        key={i.id}
        id={i.id}
        checked={i.checked}
        value={i.value}
        onDelete={() => {
          this.handleDelete(i.id);
        }}
        onCheckboxChange={() => {
          this.handleCheckboxChange(i.id);
        }}
      />
        )))
  };
  render() {
    return (
      <div className="todo-container">
        <form className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.newItemText}
            onChange={this.updateInput}
            onSubmit={this.updateInput}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            onClick={this.handleAddNewItem}
          >
            Add
          </button>
        </form>
        {this.renderItems(this.state.items)}
        <div className="btn-group" role="group">

          <button
            type="button"
            className="btn "
            onClick={this.handleDeleteFinished}
          >
            Delete finished
          </button>
        </div>
      </div>
    );
  }
}

TodoContainer.propTypes = {};

export default TodoContainer;
