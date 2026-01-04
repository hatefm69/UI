import { CellContainer, DropDown, Helpers, Table, TextBox } from "core";
import React from "react";
import react from "react";
import NotificationSystem from "react-notification-system";
import Button from "../../components/button";
import {
  inspectorEvaluationTermOptions,
  inspectorEvaluationYearOptions,
} from "../../utils/selectOptionUtils";

class InspectorEvaluationSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluationInspectionTermTitle: null,
      isNew: true
    };
    this.onCancel = this.onCancel.bind(this);
    this.notificationSystem = react.createRef();
  }
  onEditEvaluation(e) {
    this.setState(
      {
        selectedRow: e.filter((x) => x.name === "evaluationInspectionTermTitle")[0].value,
        isNew: false,
      }
    );
    this.props.onEditEvaluation(e);
  }
  onCancel() {
    this.setState(
      {
        selectedRow: null,
        isNew: true,
      }
    );
    this.props.onClearEvaluation();
  }

  render() {
    return (
      <>
        <CellContainer
          lgCol={12}
          mdCol={12}
          header=""
          key={"evaluation" + this.props.parentState.evaluationTermUpdateKey}
        >
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <DropDown
                context={this.props.parentContext}
                name="termEvaluation"
                title="دوره ارزیابی"
                options={inspectorEvaluationTermOptions()}
                notificationSystem={this.notificationSystem}
                required={!this.props.parentState.isReadOnly}
                lgCol={12}
                mdCol={12}
                changeHandler={(e) =>
                  this.props.onChangeInspectorEvaluationTerm(e)
                }
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
            <div className="col-lg-4 col-md-12">
              <TextBox
                context={this.props.parentContext}
                name="score"
                title="نمره"
                lgCol={12}
                mdCol={12}
                required={!this.props.parentState.isReadOnly}
                minLength={1}
                maxLength={6}
                validateHandler={[
                  Helpers.FloatNumberTypeValidator,
                  Helpers.MinMaxLengthValidator,
                ]}
                readOnly={this.props.parentState.isReadOnly}
              />
            </div>
            <div className="col-lg-4 col-md-12">
              <DropDown
                context={this.props.parentContext}
                name="year"
                title="سال"
                options={inspectorEvaluationYearOptions()}
                notificationSystem={this.notificationSystem}
                required={!this.props.parentState.isReadOnly}
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
              iconLeftClass={this.state.isNew || this.props.parentState.selectIndexEvaluation == -1 ? "ti ti-circle-plus me-1" : "ti ti-edit-circle me-1"}
              text={this.state.isNew || this.props.parentState.selectIndexEvaluation== -1 ? "افزودن" : "ویرایش"}
              onclick={(e) => this.props.onAddEvaluationTerm(this.state.isNew)}
            />
            {this.state.isNew || this.props.parentState.selectIndexEvaluation == -1 ? null :
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
              e.filter((x) => x.name === "evaluationInspectionTermTitle")[0].value === this.state.selectedRow
                ? "bg-info"
                : ""
            }
            hasDeleteButton={!this.props.parentState.isReadOnly}
            headers={[
              {
                title: "دوره",
                name: "evaluationInspectionTermTitle",
              },
              {
                title: "سال",
                name: "year",
              },
              { title: "نمره", name: "score" },
            ]}
            data={this.props.parentState.inspectionTermEvaluationList}
            removeBodyClass
            minHeightTableWrapper={200}
            onDeleteButton={(e) => this.props.onDeleteTermEvaluation(e)}
            key={
              "evaluationTableUpdateKey" +
              this.props.parentState.evaluationTermUpdateKey
            }
            rowOptions={[
              {
                title: "ویرایش",
                icon: "edit",
                func: (e) => this.onEditEvaluation(e),
                style: "small",
              },
            ]}
          />
        </CellContainer>

        <div className="row">
          <div className="text-start mb-2 col">
            <Button
              buttonClass={`btn btn-outline-primary col-lg-1.8`}
              iconLeftClass={`ti ti-arrow-right me-1`}
              text={`مرحله قبلی`}
              onclick={() => this.props.onChangeStepNumber(1)}
              style={{ width: "127px" }}
            />
          </div>
        </div>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}

export default InspectorEvaluationSection;
