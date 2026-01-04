import React from "react";
import react from "react";
import NotificationSystem from "react-notification-system";
import InspectorInfoSection from "./inspectorInfoSection";
import { Card, Helpers } from "core";
import InspectorPositionSection from "./inspectorPositionSection";
import InspectorEvaluationSection from "./inspectorEvaluationSection";
import {
  IsValid,
  ValidFeedBack,
  inspectionStatus,
} from "../../utils/constants";
import TabSection from "../../components/tab";
import {
  FormatInput,
  GetUrl,
  HandleError,
  arrayValidation,
  convertEpochToDate,
  getEndDateTimeEpoch,
  getStartDateTimeEpoch,
} from "../../utils/generals";
import InspectorPosition from "../../models/inspectorPosition";
import InspectorEvaluationTerm from "../../models/inspectorEvaluation";
import {
  checkDataIsValid,
  setInspectorVisibleDatesState,
} from "../../utils/selectOptionUtils";

class InspectorProfileSection extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.state = {
      stepNumber: 0,
      isVisibleFromDate: false,
      isVisibleToDate: false,
      isNew: this.props.item == null,
      formData: {},
      isLoaded: false,
      positionList: [],
      positionKey: 1,
      evaluationInspectionTermTitle: "",
      lastPositionTitle: "",
      evaluationTermUpdateKey: 1,
      inspectionTermEvaluationList: [],
      personnelDetailUpdateKey: 1,
      fileList: [],
      isReadOnly: this.props.isReadOnly,
      subGroupUpdateKey: 1,
      groupUpdateKey: 1,
      subGroupList: [],
      lastSubGroupTitle: null,
      lastGroupTitle: null,
      selectIndexPosition: -1,
      selectIndexEvaluation: -1
    };
    this.notificationSystem = react.createRef();
  }

  componentDidMount = () => {
    if (!this.state.isNew && this.props.item != null) {
      this.setState(this.props.item);
      this.setState({
        isLoaded: true,
        mergedBank:
          this.props.item.mergedBank == 0
            ? ""
            : this.props.item.mergedBank.toString(),
        operationsExpertise: this.props.item.operationsExpertise.toString(),
        creditExpertise: this.props.item.creditExpertise.toString(),
        currencyExpertise: this.props.item.currencyExpertise.toString(),
        dayOff: this.props.item.dayOff.toString(),
        inspectionStatus: this.props.item.status.toString(),
        isActive: this.props.item.isActive,
        subGroupList: this.props.item.subGroupList,
      });
    }
  }

  onChangeStepNumber = (e) => {
    //Method 1
    if (this.state.stepNumber < e) {
      if (!this.validationFields(e)) {
        return;
      }
      this.setState({
        stepNumber: e,
      });
    } else {
      this.setState({
        stepNumber: e,
      });
    }
  }

  validationFields(pageNumber) {
    //if (pageNumber == 1 || pageNumber == 2) {
    if (!this.checkFileControlsIsValid()) {
      return false;
    }
    let errorMessage = "";
    let fields = [
      "inspectorPersonnelCode",
      "birthPlace",
      "location",
      "employementDate",
      "mergedBank",
      "accountNumber",
      "operationsExpertise",
      "creditExpertise",
      "currencyExpertise",
      "dayOff",
      "inspectionStatus",
      "educationDegree"
    ];

    fields.forEach((field) => {
      if (errorMessage !== "") {
        return;
      }

      if (!this.state[field + IsValid]) {
        errorMessage = this.state[field + ValidFeedBack];
        return;
      }
    });

    if (errorMessage !== "") {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, errorMessage);
      return false;
    }

    if (this.state.inspectionStatus != inspectionStatus.active) {
      if (!this.state["fromDateIsValid"]) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          this.state["fromDateValidFeedBack"]
        );
        return false;
      }

      if (
        this.state.inspectionStatus == inspectionStatus.leave ||
        this.state.inspectionStatus == inspectionStatus.agent ||
        this.state.inspectionStatus == inspectionStatus.availableCustomer
      ) {
        if (!this.state["toDateIsValid"]) {
          Helpers.DisplayErrorMessage(
            this.notificationSystem,
            null,
            this.state["toDateValidFeedBack"]
          );
          return false;
        }

        let miladiFromDate = new Date(convertEpochToDate(this.state.fromDate));
        let miladiToDate = new Date(convertEpochToDate(this.state.toDate));

        if (miladiFromDate > miladiToDate) {
          Helpers.DisplayErrorMessage(
            this.notificationSystem,
            null,
            "از تاریخ نباید بزرگتر از تا تاریخ باشد"
          );
          return false;
        }
      }
    }

    if (pageNumber == 1 && this.state.roles.length == 0) {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, "لطفا نوع کاربر را انتخاب نمایید");
      return false;
    }
    if (pageNumber == 1 && this.state.subGroupList.length == 0) {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, "لطفا حداقل یک زیر گروه انتخاب نمایید");
      return false;
    }
    else if (pageNumber == 2 && this.state.positionList.length == 0) {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, "لطفا حداقل یک سمت را وارد نمایید");
      return false;
    }
    return true;
  }

  checkFileControlsIsValid = () => {
    if (this.state["signaturePhoto"] === undefined) {
      if (this.state.isNew) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          "انتخاب امضا الزامی است"
        );
        return false;
      }
    } else {
      if (!this.state["signaturePhoto" + IsValid]) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          this.state["signaturePhoto" + ValidFeedBack]
        );
        return false;
      }
    } ``

    return true;
  }

  onChangeInspectionStatus = (e) => {
    let resultValues = setInspectorVisibleDatesState(e.value);

    this.setState({
      isVisibleFromDate: resultValues[0],
      isVisibleToDate: resultValues[1],
    });
  }

  onSubmitSuccess = (e) => {
    if (checkDataIsValid(e)) {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        "درخواست با موفقیت انجام شد ، در حال انتقال به فهرست بازرس / ارجاع گیرنده تعریف شده ....."
      );
      this.timer = setInterval(() => {
        window.location.href = GetUrl("inspectorProfileListPage");
      }, 3000);
      return true;
    } else {
      Helpers.DisplayErrorMessage(this.notificationSystem);
      return false;
    }
  }

  HandleError = (errorResponse) => {
    return HandleError(this.notificationSystem, errorResponse);
  }

  onBeforeSubmit = () => {
    let formData = this.state.formData;
    formData["inspectorPersonnelCode"] =
      this.state.inspectorPersonnelCode.split("#")[0];
    formData["birthDate"] = this.state.birthDate;
    formData["id"] = this.id;
    formData["birthPlace"] = this.state.birthPlace;
    formData["location"] = this.state.location;
    formData["group"] = this.state.group;
    formData["subGroup"] = this.state.subGroup;
    formData["employementDate"] = this.state.employementDate;
    formData["mergedBank"] = this.state.mergedBank;
    formData["isActive"] =
      this.state.isActive ||
        this.state.isActive === undefined ||
        this.state.isActive === null ||
        this.state.isActive === ""
        ? true
        : false;
    formData["accountNumber"] = this.state.accountNumber;
    formData["status"] = this.state.inspectionStatus;
    formData["fromDate"] =
      this.state.inspectionStatus == inspectionStatus.active
        ? null
        : this.state.fromDate;
    formData["toDate"] =
      this.state.inspectionStatus == inspectionStatus.active ||
        this.state.inspectionStatus == inspectionStatus.buyBack ||
        this.state.inspectionStatus == inspectionStatus.retired
        ? null
        : this.state.toDate;
    formData["operationsExpertise"] = this.state.operationsExpertise;
    formData["creditExpertise"] = this.state.creditExpertise;
    formData["currencyExpertise"] = this.state.currencyExpertise;
    formData["dayOff"] = this.state.dayOff;
    formData["educationDegree"] = this.state.educationDegree;
    formData["roles"] = Array.isArray(this.state.roles) ? this.state.roles : this.state.roles.split(",")
    formData["address"] = this.state.address;

    let positionList = [];
    this.state.positionList.forEach((pos, index) => {
      positionList.push(
        new InspectorPosition(
          pos.filter((p) => p.name === "lastPosition")[0].value,
          pos.filter((p) => p.name === "fromDatePosition")[0].value,
          pos.filter((p) => p.name === "toDatePosition")[0].value,
          index
        )
      );
    });
    formData["positionList"] = positionList;

    let termEvaluationList = [];
    this.state.inspectionTermEvaluationList.forEach((term) => {
      termEvaluationList.push(
        new InspectorEvaluationTerm(
          term.filter((t) => t.name === "termEvaluation")[0].value,
          term.filter((t) => t.name === "year")[0].value,
          term.filter((t) => t.name === "score")[0].value
        )
      );
    });
    formData["termEvaluationList"] = termEvaluationList;

    let subGroupIdsList = [];
    this.state.subGroupList.forEach((term) => {
      subGroupIdsList.push({
        groupId: term.filter((t) => t.name === "groupId")[0].value,
        subGroupId: term.filter((t) => t.name === "subGroupId")[0].value
      })
    });
    formData["groupList"] = subGroupIdsList;


    this.setState({
      formData,
    });
    return true;
  }
  positionValidation = () => {
    const positionFields = [
      "lastPosition",
      "fromDatePosition",
      "toDatePosition",
    ];
    let errorMessage = arrayValidation(this.state, positionFields);

    if (errorMessage !== "") {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, errorMessage);
      return false;
    }
    let startDate = getStartDateTimeEpoch(this.state.fromDatePosition);
    let endDate = null;
    if (this.state.toDatePosition != null)
      if (this.state.toDatePosition != undefined)
        endDate = getEndDateTimeEpoch(this.state.toDatePosition);

    for (let index = 0; index < this.state.positionList.length; index++) {

      //در حالت ویرایش خودش با خودش مقایسه نشود
      if (this.state.selectIndexPosition != index) {
        const p = this.state.positionList[index];
        let fromDatePosition = p.filter((pp) => pp.name === "fromDatePosition")[0].value;
        let toDatePosition = p.filter((pp) => pp.name === "toDatePosition")[0].value;

        if (fromDatePosition < startDate && startDate < toDatePosition
          || (endDate != null && fromDatePosition < endDate && endDate < toDatePosition)
          || (endDate != null && fromDatePosition > startDate && endDate > toDatePosition)
          || (endDate == null && fromDatePosition > startDate)) {
          Helpers.DisplayErrorMessage(
            this.notificationSystem,
            null,
            "تاریخ های ثبت شده نباید هم پوشانی داشته باشند"
          );
          return false;
        }
      }
    };
    if (this.state.toDatePosition != null) {
      if (this.state.fromDatePosition > this.state.toDatePosition) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          "از تاریخ نمی تواند بزرگتر از تا تاریخ باشد"
        );
        return false;
      }
    }
    return true;
  }

  onAddPosition = (isNew) => {
    if (!this.positionValidation()) {
      return false;
    }
    let record = [
      { name: "lastPosition", value: this.state.lastPosition },
      { name: "lastPositionTitle", value: this.state.lastPositionTitle },
      { name: "fromDatePosition", value: this.state.fromDatePosition },
      { name: "toDatePosition", value: this.state.toDatePosition },
      {
        name: "fromDateShamsi",
        value: FormatInput(Helpers.ToPersianJustDate(this.state.fromDatePosition)),
      },
      {
        name: "toDateShamsi",
        value: this.state.toDatePosition != null ? FormatInput(Helpers.ToPersianJustDate(this.state.toDatePosition)) : null,
      },
    ];
    let positionList = this.state.positionList;
    if (isNew) {
      positionList = positionList.concat([record]);

      //اگر بیش از یک رکورد وجود داشت
      // و تاریخ پایان رکورد قبلی خالی بود
      //تاریخ پایان رکود قبلی برابر می شود با تاریخ شروع رکورد جاری
      if (positionList.length > 1) {
        var index = positionList.length - 2;
        if (positionList[index].filter(x => x.name == "toDatePosition")[0].value == null) {
          var date = this.state.fromDatePosition;
          positionList[index].filter(x => x.name == "toDatePosition")[0].value = date;
          positionList[index].filter(x => x.name == "toDateShamsi")[0].value = FormatInput(Helpers.ToPersianJustDate(date));
        }
      }
    }
    else {
      positionList[this.state.selectIndexPosition] = record;

    }
    this.setState({
      positionList: positionList,
      lastPosition: null,
      fromDatePosition: null,
      toDatePosition: null,
      positionKey: this.state.positionKey + 1,
      lastPositionTitle: "",
      selectIndexPosition: -1
    });
  }

  onClearPosition = () => {
    this.setState({
      lastPosition: null,
      fromDatePosition: null,
      toDatePosition: null,
      positionKey: this.state.positionKey + 1,
      lastPositionTitle: "",
      selectIndexPosition: -1
    });
  }
  onClearEvaluation = () => {
    this.setState({
      termEvaluation: null,
      score: null,
      year: null,
      evaluationInspectionTermTitle: "",
      evaluationTermUpdateKey: this.state.evaluationTermUpdateKey + 1,
      selectIndexEvaluation: -1
    });
  }
  onDeletePosition = (e) => {
    e.modalOpen = false;
    this.setState({
      positionList: this.state.positionList.filter(
        (position) => position !== e.modalData
      ),
      positionKey: this.state.positionKey + 1,
    });
  }

  subGroupValidation = () => {

    const fields = [
      "groupId",
      "subGroupId",
    ];
    let errorMessage = arrayValidation(this.state, fields);

    if (errorMessage !== "") {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, errorMessage);
      return false;
    }
    for (var i = 0; i < this.state.subGroupList.length; ++i) {
      if (this.state.subGroupList[i][0].value == this.state.subGroupId) {
        Helpers.DisplayErrorMessage(this.notificationSystem, null, "زیر گروه انتخابی تکراری است");
        return false
      }
    }
    return true;
  }
  onAddSubGroup = () => {
    if (!this.subGroupValidation()) {
      return;
    }
    let subGroupList = this.state.subGroupList.concat([
      [
        { name: "subGroupId", value: this.state.subGroupId },
        { name: "groupId", value: this.state.groupId },
        { name: "groupTitle", value: this.state.lastGroupTitle },
        { name: "subGroupTitle", value: this.state.lastSubGroupTitle }
      ],
    ]);
    this.setState({
      subGroupList,
      subGroupId: null,
      groupId: null,
      subGroupUpdateKey: this.state.subGroupUpdateKey + 1,
      groupUpdateKey: this.state.groupUpdateKey + 1,
    });
  }
  onDeleteSubGroup = (e) => {
    e.modalOpen = false;
    this.setState({
      subGroupList: this.state.subGroupList.filter((x) => x !== e.modalData),
      subGroupUpdateKey: this.state.subGroupUpdateKey + 1,
    });
  }
  onChangeGroup = (e) => {
    if (e !== null && e !== undefined) {
      this.setState({
        groupId: e.value,
        lastGroupTitle: e.label,
        subGroupId: null,
        subGroupUpdateKey: this.state.subGroupUpdateKey + 1,
      });
    }
  }
  onChangeSubGroup = (e) => {
    if (e !== null && e !== undefined) {
      this.setState({
        subGroupId: e.value,
        lastSubGroupTitle: e.label,
      });
    }
  }
  evaluationTermValidation = () => {
    const fields = ["termEvaluation", "score", "year"];
    let errorMessage = arrayValidation(this.state, fields);

    if (errorMessage !== "") {
      Helpers.DisplayErrorMessage(this.notificationSystem, null, errorMessage);
      return false;
    }

    if (
      isNaN(this.state.score) ||
      this.state.score < 0 ||
      this.state.score > 100
    ) {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "نمره صحیح نمی باشد"
      );
      return false;
    }

    if (this.state.score.includes(".")) {
      let splitedScore = this.state.score.split(".");
      let decimalDigits = splitedScore[1];
      if (decimalDigits.length > 2 || decimalDigits.length == 0) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          "تعداد ارقام اعشار نمره صحیح نمی باشد"
        );
        return false;
      }

      if (decimalDigits == "00" || decimalDigits == 0) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          "ارقام اعشار صحیح نمی باشد"
        );
        return false;
      }
    }

    return true;
  }

  onAddEvaluationTerm = (isNew) => {
    if (!this.evaluationTermValidation()) {
      return;
    }

    let record = [
      {
        name: "evaluationInspectionTermTitle",
        value: this.state.evaluationInspectionTermTitle,
      },
      { name: "year", value: this.state.year },
      { name: "score", value: this.state.score },
      {
        name: "termEvaluation",
        value: this.state.termEvaluation,
      },
    ];
    let inspectionTermEvaluationList = this.state.inspectionTermEvaluationList;
    if (isNew) {
      inspectionTermEvaluationList = inspectionTermEvaluationList.concat([record]);

    }
    else {
      inspectionTermEvaluationList[this.state.selectIndexEvaluation] = record;

    }
    this.setState({
      inspectionTermEvaluationList: inspectionTermEvaluationList,
      termEvaluation: null,
      score: null,
      year: null,
      evaluationInspectionTermTitle: "",
      evaluationTermUpdateKey: this.state.evaluationTermUpdateKey + 1,
      selectIndexEvaluation: -1
    });
  }

  onChangeInspectorEvaluationTerm = (e) => {
    this.setState({
      evaluationInspectionTermTitle: e.label,
    });
  }

  onChangeLastPosition = (e) => {
    if (e !== null && e !== undefined) {
      this.setState({
        lastPositionTitle: e.label,
      });
    }
  }

  onChangeInspector = (e) => {
    let splitedValues = e.value.split("#");
    let mobileNumber = splitedValues[1];
    let nationalCode = splitedValues[2];
    let currentPosition = splitedValues[3];

    this.setState({
      mobileNumber,
      mobileNumberIsValid: true,
      mobileNumberValidFeedBack: "",
      nationalCode,
      nationalCodeIsValid: true,
      nationalCodeValidFeedBack: "",
      currentPosition,
      currentPositionIsValid: true,
      currentPositionValidFeedBack: "",
      personnelDetailUpdateKey: this.state.personnelDetailUpdateKey + 1,
    });
  }

  onDownloadFile = (e) => {
    let fileId = e.filter((ee) => ee.name == "id")[0].value;
    window.open("/api/finsp/attachment/Download/" + fileId, "_blank");
  }

  onDeleteTermEvaluation = (e) => {
    e.modalOpen = false;
    this.setState({
      inspectionTermEvaluationList:
        this.state.inspectionTermEvaluationList.filter(
          (termEvaluation) => termEvaluation !== e.modalData
        ),
      evaluationTermUpdateKey: this.state.evaluationTermUpdateKey + 1,
    });
  }
  onEditPosition = (e) => {
    let selectIndexPosition = this.state.positionList.findIndex(x => x == e);
    this.setState({
      selectIndexPosition: selectIndexPosition,
      lastPositionTitle: e.filter(x => x.name == "lastPositionTitle")[0].value,
      lastPosition: parseInt(e.filter(x => x.name == "lastPosition")[0].value),
      fromDatePosition: parseInt(e.filter(x => x.name == "fromDatePosition")[0].value),
      toDatePosition: parseInt(e.filter(x => x.name == "toDatePosition")[0].value),
      positionKey: this.state.positionKey + 1,
    })
  }
  onEditEvaluation = (e) => {

    let selectIndexEvaluation = this.state.inspectionTermEvaluationList.findIndex(x => x == e);
    this.setState({
      selectIndexEvaluation: selectIndexEvaluation,
      evaluationInspectionTermTitle: e.filter(x => x.name == "evaluationInspectionTermTitle")[0].value,
      year: e.filter(x => x.name == "year")[0].value,
      score: e.filter(x => x.name == "score")[0].value,
      termEvaluation: parseInt(e.filter(x => x.name == "termEvaluation")[0].value),
      evaluationTermUpdateKey: this.state.evaluationTermUpdateKey + 1,
    })
  }
  render = () => {
    return (
      <>
        {(this.state.isNew || this.state.isLoaded) && (
          <>
            <TabSection
              stepNumber={this.state.stepNumber}
              onChangeStepNumber={this.onChangeStepNumber}
              data={[
                { index: 0, title: "اطلاعات بازرس / ارجاع گیرنده" },
                { index: 1, title: "ارزیابی بازرس / ارجاع گیرنده" },
              ]}
            />
            <Card
              context={this}
              title={
                this.state.stepNumber == 0
                  ? "مشخصات بازرس / ارجاع گیرنده"
                  : this.state.stepNumber == 1
                    ? "مشخصات سمت های بازرس / ارجاع گیرنده"
                    : "مشخصات ارزیابی بازرس / ارجاع گیرنده"
              }
              icon=""
              submitUrl={
                this.state.isNew
                  ? "/api/finsp/InspectorProfile/Post"
                  : "/api/finsp/InspectorProfile/Update"
              }
              hasBackButton={!this.state.isReadOnly}
              hasDefaultSaveButton={!this.state.isReadOnly}
              statusColor="primary"
              cssClassName={`${this.state.stepNumber !== 2 ? "UnvisibleCardFooter" : ""
                }`}
              submitFields={"formData"}
              onSubmitSuccess={this.onSubmitSuccess}
              onSubmitError={this.HandleError}
              onBeforeSubmit={this.onBeforeSubmit}
            >
              <div className="tab-content" id="pills-tabContent">
                <div
                  className={`tab-pane fade ${this.state.stepNumber === 0 ? "show active" : ""
                    }`}
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <InspectorInfoSection
                    parentState={this.state}
                    onChangeStepNumber={this.onChangeStepNumber}
                    onChangeInspectionStatus={this.onChangeInspectionStatus}
                    parentContext={this}
                    onChangeInspector={this.onChangeInspector}
                    onDownloadFile={this.onDownloadFile}
                    onChangeGroup={(e) => this.onChangeGroup(e)}
                    onChangeSubGroup={this.onChangeSubGroup}
                    onAddSubGroup={this.onAddSubGroup}
                    onDeletePosition={this.onDeletePosition}
                    onDeleteSubGroup={this.onDeleteSubGroup}
                  />
                </div>
                <div
                  className={`tab-pane fade ${this.state.stepNumber === 1 ? "show active" : ""
                    }`}
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <InspectorEvaluationSection
                    onChangeStepNumber={this.onChangeStepNumber}
                    parentContext={this}
                    parentState={this.state}
                    onAddEvaluationTerm={(e) => this.onAddEvaluationTerm(e)}
                    onChangeInspectorEvaluationTerm={
                      this.onChangeInspectorEvaluationTerm
                    }
                    onDeleteTermEvaluation={this.onDeleteTermEvaluation}
                    onEditEvaluation={(e) => this.onEditEvaluation(e)}
                    onCleaEvaluation={() => this.onClearEvaluation()}
                  />
                </div>
              </div>
            </Card>
          </>
        )}
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}

export default InspectorProfileSection;
