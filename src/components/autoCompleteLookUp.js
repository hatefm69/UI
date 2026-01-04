import React from "react";
import { AutoComplete } from "core";
import NotificationSystem from "react-notification-system";
import LookUp from "../components/lookUp";

export default class AutoCompleteLookUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      externalData:this.props.externalData==undefined? []:this.props.externalData,
      updateKey: 1
    };

    this.notificationSystem = React.createRef();
  }
  onRecordSelect(e) {
    let value = e[this.props.value];
    let label = e[this.props.label];

    this.setState({
      externalData: [{ label: label, value: value }],
      updateKey: this.state.updateKey + 1
    })
    if (e.value == null)
      e.value = value;
    if (e.label == null)
      e.label = label;
    this.props.changeHandler(e);
  }

  render() {
    return (
      <>
        <div class="d-flex">
          <div class="d-inline-block" style={{ width: "100%" }}>
            <AutoComplete
              context={this.props.context}
              name={this.props.name}
              title={this.props.title}
              notificationSystem={this.notificationSystem}
              required={this.props.required}
              remoteUrl={this.props.autoCompleteApiUrl}
              lgCol={11}
              mdCol={11}
              externalData={this.state.externalData}
              disabled={this.props.disabled}
              changeHandler={(e) => this.props.changeHandler(e)}
              key={"autoComplete" + this.state.updateKey + this.props.key}
            /> </div>
          <div class="d-inline-block">
            <LookUp
              apiUrl={this.props.lookUpApiUrl}
              title={"جستجوی " + this.props.title}
              headers={this.props.headers}
              filterOptions={this.props.filterOptions}
              onRecordSelect={(e) => this.onRecordSelect(e)}
            //style={{"margin-right": "-20px"}}
            ></LookUp>
          </div>
        </div>

        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}