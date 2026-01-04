import React from "react";

export default class TabSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <ul
          className="nav nav-pills mb-3"
          id="pills-tab"
          role="tablist"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "11px",
            justifyContent: "center",
          }}
        >
          {this.props.data.map((d, index) => {
            return (
              <li
                className="nav-item"
                role="presentation"
                style={{ padding: "5px" }}
                key={"nav" + index}
              >
                <button
                  className={`nav-link ${
                    this.props.stepNumber == d.index ? "active" : ""
                  }`}
                  id={"pills-home-tab" + index}
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() => this.props.onChangeStepNumber(d.index)}
                  style={{
                    fontWeight: "bold",
                    borderRadius:
                      this.props.stepNumber == d.index ? "10px" : "",
                    display: d?.disabled === true ? "none" : "flex",
                  }}
                  key={"button" + index}
                >
                  {d.title}
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
