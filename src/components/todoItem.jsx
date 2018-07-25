import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  render() {
    TodoItem.propTypes = {
      id: PropTypes.number,
      value: PropTypes.string,
      onDelete: PropTypes.func,
      onCheckboxChange: PropTypes.func,
      checked: PropTypes.bool
    };
    let { id, value, onDelete,onCheckboxChange,checked } = this.props;

    return (
      <div className="todo-item">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="checkbox"
                checked={checked}
                onChange={onCheckboxChange}
              />
            </div>
            <div className="input-group-text">
              {id}
            </div>
          </div>
          <p className="form-control"> {value}</p>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onDelete}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}



export default TodoItem;
