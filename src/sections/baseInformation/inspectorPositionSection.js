import {
  AutoComplete,
  CellContainer,
  DatePicker,
  Delimiter,
  Table,
  TextBox,
} from "core";
import React from "react";
import react from "react";
import NotificationSystem from "react-notification-system";
import Button from "../../components/button";

class InspectorPositionSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPosition: null,
      isNew: true
    };
    this.onCancel = this.onCancel.bind(this);
    this.notificationSystem = react.createRef();
  }
  onEditPosition(e) {
    this.setState(
      {
        selectedRow: e.filter((x) => x.name === "lastPosition")[0].value,
        isNew: false,
      }
    );
    this.props.onEditPosition(e);
  }
  onCancel() {
    this.setState(
      {
        selectedRow: null,
        isNew: true,
      }
    );
    this.props.onClearPosition();
  }
  render() {
    return (
      <>
        <CellContainer
          lgCol={12}
          mdCol={12}
          header=""
          key={"position" + this.props.parentState.positionKey}
        >
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <AutoComplete
                context={this.props.parentContext}
                name="lastPosition"
                title="آخرین سمت تایید شده در سامانه بازرسی"
                notificationSystem={this.notificationSystem}
                remoteUrl="/api/finsp/inspector/searchPosition"
                lgCol={12}
                mdCol={12}
                required={!this.props.parentState.isReadOnly}
                changeHandler={(e) => this.props.onChangeLastPosition(e)}
                disabled={this.props.parentState.isReadOnly}
                externalData={[
                  {
                    label: this.props.parentState.lastPositionTitle,
                    value: this.props.parentState.lastPosition,
                  },
                ]
                }
              />
            </div>
            <div
              className="col-lg-6 col-md-12"
              key={
                "currentPosition" +
                this.props.parentState.personnelDetailUpdateKey
              }
            >
              <TextBox
                context={this.props.parentContext}
                name="currentPosition"
                title="آخرین سمت فراخوانی از سامانه پرسنلی"
                readOnly
                lgCol={12}
                mdCol={12}
                externalChangedValue={""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <DatePicker
                context={this.props.parentContext}
                name="fromDatePosition"
                title="از تاریخ"
                required={!this.props.parentState.isReadOnly}
                useEpoch
                lgCol={12}
                mdCol={12}
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <DatePicker
                context={this.props.parentContext}
                name="toDatePosition"
                title="تا تاریخ"
                // required={!this.props.parentState.isReadOnly}
                useEpoch
                lgCol={12}
                mdCol={12}
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
          </div>
          <div className="text-end mb-2">
            <Button
              buttonClass={`btn btn-outline-primary btn-sm col-lg-1 ${this.props.parentState.isReadOnly ? "d-none" : ""
                }`}
              iconLeftClass={this.state.isNew || this.props.parentState.selectIndexPosition == -1 ? "ti ti-circle-plus me-1" : "ti ti-edit-circle me-1"}
              text={this.state.isNew || this.props.parentState.selectIndexPosition == -1 ? "افزودن" : "ویرایش"}
              onclick={(e) => this.props.onAddPosition(this.state.isNew)}
            />
            {this.state.isNew || this.props.parentState.selectIndexPosition == -1 ? null :
              <Button
                buttonClass={`btn btn-outline-primary btn-sm col-lg-1 ${this.props.parentState.isReadOnly ? "d-none" : ""
                  }`}
                text={"انصراف"}
                onclick={() => this.onCancel()}
              />
            }
          </div>
          <Table
            rowStyle={(e) =>
              e.filter((x) => x.name === "lastPosition")[0].value === this.state.selectedRow
                ? "bg-info"
                : ""
            }
            hasDeleteButton={!this.props.parentState.isReadOnly}
            headers={[
              {
                title: "آخرین سمت تاییدشده در سامانه بازرسی",
                name: "lastPositionTitle",
              },
              { title: "از تاریخ", name: "fromDateShamsi" },
              { title: "تا تاریخ", name: "toDateShamsi" },
            ]}
            data={this.props.parentState.positionList}
            rowOptions={[
              {
                title: "ویرایش",
                icon: "edit",
                func: (e) => this.onEditPosition(e),
                style: "small",
              },
            ]}
            removeBodyClass
            minHeightTableWrapper={200}
            onDeleteButton={(e) => this.props.onDeletePosition(e)}
            key={"positionTableUpdateKey" + this.props.parentState.positionKey}
          />
        </CellContainer>

        <Delimiter style="solid" />

        <div className="row">
          <div className="text-start mb-2 col">
            <Button
              buttonClass={`btn btn-outline-primary col-lg-1.5`}
              iconLeftClass={`ti ti-arrow-right me-1`}
              text={`مرحله قبلی`}
              onclick={() => this.props.onChangeStepNumber(0)}
            />
          </div>
          <div className="text-end mb-2 col">
            <Button
              buttonClass={`btn btn-outline-primary col-lg-1.5`}
              iconRightClass={`ti ti-arrow-left ms-1`}
              text={`مرحله بعدی`}
              onclick={() => this.props.onChangeStepNumber(2)}
            />
          </div>
        </div>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}

export default InspectorPositionSection;
