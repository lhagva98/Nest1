import React, { Component } from "react";
import { FormCheck } from "react-bootstrap";
class Question extends Component {
  render() {
    const {
      question,
      selected,
      options,
      onClick,
      groupId,
      disabled,
    } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">
            {groupId + 1}){question}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          {options.map((item, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex align-items-center">
                <input
                  disabled={disabled}
                  name="isGoing"
                  type="checkbox"
                  checked={index === selected}
                  onChange={() => onClick(groupId, index)}
                />
                <h5 className="ml-5">{item}</h5>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Question;
