import {
  AutoComplete,
  AlertBox,
  Card,
  DropDown,
  Helpers,
  TextBox,
  DatePicker,
  CellContainer,
  Delimiter,
  Table,
  FileUploader
} from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { GetUrl, HandleError } from "../../utils/generals";
import { familyRelationshipOptions, isActiveOptions } from "../../utils/selectOptionUtils";
import TableHeader from "../../utils/tableHeader";
import Button from "../../components/button";

export class StudentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 1000,
      cities: [],
      familyRelationshipsTableData: [],
      familyRelationships: [],
      isLoading: true,
      relationUpdateKey: 50000,
      cardUpdateKey: 60000,
    };
    this.notificationSystem = React.createRef();
    this.onAddFamilyRelationship = this.onAddFamilyRelationship.bind(this);
  }

  componentDidMount = () => {
    this.getCities();
    if (this.props.record) {
      this.setState({
        ...this.props.record,
        isActive: this.props.record.isActive.toString(),
        cityId: this.props.record.cityId,
        familyRelationshipsTableData: this.props.record.familyRelationshipsTableData,
        updateKey: this.state.updateKey + 1,
        isLoading: false,
      });
      this.refreshDataForServer();
    }
  };

  getCities = () => {
    Helpers.CallServer(
      "/api/cmi/City/GetList",
      {},
      (response) => {
        this.setState({
          cities: response.data.map(x => ({ label: x.title, value: x.id, title: x.title })),

        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false }),
      "POST"
    );
  }
  // onChangeInspectionStatus = (e) => {
  //   let resultValues = setInspectorVisibleDatesState(e.value);

  //   this.setState({
  //     isVisibleFromDate: resultValues[0],
  //     isVisibleToDate: resultValues[1],
  //   });
  // }

  onValidation = () => {
    if (
      this.state.familyRelationshipfullName == null ||
      this.state.familyRelationshipfullName == undefined ||
      this.state.familyRelationshipfullName == ""
    )
      return Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "لطفا نام و نام خانوادگی خویشاوند را وارد کنید"
      );
    if (
      this.state.familyRelationshipfullName.length <= 3
    )
      return Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "لطفا نام و نام خانوادگی خویشاوند را بیشتر از 3 کاراکتر وارد کنید"
      );

    return true;
  };

  onAddFamilyRelationship() {




    if (!this.onValidation()) return false;

    let familyRelationshipsTableData = this.state.familyRelationshipsTableData;

    if (this.state.familyRelationshipfullName === undefined ||
      this.state.familyRelationshipfullName === "" ||
      this.state.familyRelationshipfullName === null
    ) {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        `برای خویشاوند نام و نام خانوادگی وارد نمایید.`
      );
      return;
    }


    var validFamilyRelationship = familyRelationshipOptions()
      .filter(type => type >= 2)
      .map(type => type.value);

    if (this.state.familyRelationships.filter(x => !validFamilyRelationship.includes(x)).some(x => x.familyRelationshipId == this.state.familyRelationshipId)) {
      var title = familyRelationshipOptions().filter(x => x.value == this.state.familyRelationshipId)[0].title
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        `نسبت ${title} قبلا وارد شده است`
      );
      return;
    }

    // if (!this.isNew) {
    familyRelationshipsTableData = familyRelationshipsTableData.concat([
      [
        {
          name: "familyRelationshipfullName",
          value: this.state.familyRelationshipfullName,
        },
        {
          name: "familyRelationshipId",
          value: this.state.familyRelationshipId,
        },
        {
          name: "familyRelationshipTitle",
          value: familyRelationshipOptions().filter(x => x.value == this.state.familyRelationshipId)[0].title,
        },
        {
          name: "id",
          value: -1,
        },
      ],
    ]);

    console.log("Changing test props");

    this.setState({
      familyRelationshipsTableData,
      familyRelationshipfullName: "",
      familyRelationshipId: "",
      //relationUpdateKey: this.state.relationUpdateKey + 1,
      //updateKey: this.state.updateKey + 1,
      //cardUpdateKey: this.state.cardUpdateKey + 1
    }, () => this.setState({ relationUpdateKey: this.state.relationUpdateKey + 1 }));

    this.refreshDataForServer();
    return true;
  }
  onDeleteFamilyRelationships = (option) => {
    option.modalOpen = false;
    this.setState({
      familyRelationshipsTableData: this.state.familyRelationshipsTableData.filter(
        (e) => e !== option.modalData
      ),
      updateKey: this.state.updateKey + 1,
    });
    this.refreshDataForServer();
  };

  onBeforeSubmit = () => {
    if (this.state.familyRelationships.length <= 0) {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        `خویشاوندان را وارد نمایید.`
      );
      return false;
    }
    return true;
  }

  refreshDataForServer = () => {



    this.setState(prevState => ({
      familyRelationships: prevState.familyRelationshipsTableData.map(x => ({
        familyRelationshipId: x[1].value,
        familyRelationshipfullName: x[0].value
      })),
      updateKey: this.state.updateKey + 1,
    }));

    // this.setState({
    //   familyRelationships: this.state.familyRelationshipsTableData.map(x => ({
    //     // id:null,
    //     familyRelationshipId: x[1].value,
    //     familyRelationshipfullName: x[0].value
    //   })),
    //   relationUpdateKey: this.state.relationUpdateKey + 1,
    // });
  }

  onSubmitSuccess = (response) => {
    // Add
    if (this.props.record == null) {
      this.setState({
        id: "",
        familyRelationshipfullName: "",
        firstName: "",
        lastName: "",
        //levelId: "",
        levelId: null,
        cityId: "",
        isActive: "",
        birthDate: "",
        familyRelationshipsTableData: [],
        familyRelationships: [],
        //updateKey: this.state.updateKey + 1,
        cardUpdateKey: this.state.cardUpdateKey + 1,
      });
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        response.message
      );
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("studentListPage");
      }, 3000);
    }
  };

  render() {
    return !this.state.isLoading && (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت دانش آموز جدید"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.cardUpdateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/Student/Post"
              : "/api/cmi/Student/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
          onBeforeSubmit={this.onBeforeSubmit}
        >
          <AutoComplete
            context={this}
            name="levelId"
            title="پایه"
            remoteUrl="/api/cmi/LevelByHatef/GetAllForAutoComplete/"
            required
            externalData={
              this.props.record
                ? [
                  {
                    value: this.props.record.levelId,
                    label: this.props.record.levelTitle,
                  },
                ]
                : []
            }
            notificationSystem={this.parentNotification}
          />
          {this.props.record && (
            <TextBox context={this} name="id" title="کد" readOnly initialValue={this.state.id} />
          )}
          <TextBox
            context={this}
            name="firstName"
            title="نام"
            required
            minLength={2}
            maxLength={50}

            validateHandler={[Helpers.MinMaxLengthValidator]}
          />
          <TextBox
            context={this}
            name="lastName"
            title="نام خانوادگی"
            required
            minLength={2}
            maxLength={50}


            validateHandler={[Helpers.MinMaxLengthValidator]}
          />
          <TextBox
            context={this}
            name="fullName"
            title="نام و نام خانوادگی"
            readOnly
            minLength={2}
            maxLength={100}
            // key={this.state.updateKey}
            initialValue={`${this.state.firstName} ${this.state.lastName}`}
            externalChangedValue={`${this.state.firstName} ${this.state.lastName}`}
            validateHandler={[Helpers.MinMaxLengthValidator,
            Helpers.MaxLengthValidator


            ]}
          />
          <DropDown
            context={this}
            name="cityId"
            title="شهر"
            options={this.state.cities}
            notificationSystem={this.notificationSystem}
            required={true}
            lgCol={4}
            mdCol={4}
          // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
          // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
          //initialValue={this.props.cityId}
          // disabled={this.props.familyRelationshipsTableDatatate.isReadOnly}
          />
          <DropDown
            context={this}
            name="isActive"
            title="وضعیت"
            options={isActiveOptions()}
            notificationSystem={this.notificationSystem}
            required={true}
            lgCol={4}
            mdCol={4}
            // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
            // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
            initialValue="true"
          // disabled={this.props.familyRelationshipsTableDatatate.isReadOnly}
          />
          <DatePicker
            context={this}
            name="birthDate"
            title="تاریخ تولد"
            required={true}
            lgCol={4}
            mdCol={4}
          // disabled={this.props.familyRelationshipsTableDatatate.isReadOnly}
          />
          <FileUploader
            context={this}
            name="files"
            title="بارگزاری اطلاعات"
            lgCol={4}
            // key={this.state.updateKey}
            validExtensions={[".xlsx", ".xls"]}
            maxLength={1048576 * 5}
            required={(!this.props.record)}
          />
          <Delimiter />
          <CellContainer
            lgCol={12}
            mdCol={12}
            header="خویشاوندان"
          // key={"familyRelationshipCellContainer" + this.state.updateKey}
          >
            <div className="row " key={this.state.relationUpdateKey}>
              <TextBox
                context={this}
                name="familyRelationshipfullName"
                title="نام و نام خانوادگی"
                // readOnly={true}
                lgCol={4}
                mdCol={4}
                notificationSystem={this.notificationSystem}
                minLength={3}
                // validateHandler={[
                //   Helpers.MinLengthValidator,
                // ]}

                validateHandler={[Helpers.MinMaxLengthValidator
                ]}
              />
              {/* <TextBox
                context={this}
                name="typeId"
                title="نسبت"
                readOnly={this.props.isShow || this.state.isSample}
                lgCol={4}
                mdCol={4}
                regex="^(?:[1-9]\d{0,20}|99999999)$"
                maxLength={20}
                validateHandler={[
                  Helpers.RegexValidator,
                  Helpers.MaxLengthValidator,
                ]}
                notificationSystem={this.notificationSystem}
              /> */}

              <DropDown
                context={this}
                name="familyRelationshipId"
                title="نسبت"
                options={familyRelationshipOptions()}
                notificationSystem={this.notificationSystem}
                required={true}
                lgCol={4}
                mdCol={4}
                // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
                initialValue="true"
              // disabled={this.props.familyRelationshipsTableDatatate.isReadOnly}
              />

            </div>
            {this.props.isShow || this.state.isSample ? null : (
              <div className="text-end mb-2">
                <Button
                  buttonClass="btn btn-outline-primary btn-sm col-lg-1  m-2"
                  iconLeftClass={`ti ti-circle-plus me-1`}
                  text={`افزودن`}
                  onclick={this.onAddFamilyRelationship}
                />
              </div>
            )}
            <Table
              hasDeleteButton={true}
              key={"table" + this.state.relationUpdateKey}
              onDeleteButton={(e) => this.onDeleteFamilyRelationships(e)}
              data={this.state.familyRelationshipsTableData}
              minHeightTableWrapper={250}
              headers={[
                new TableHeader("familyRelationshipfullName", "نام و نام خانوادگی"),
                new TableHeader("familyRelationshipTitle", "نسبت"),
              ]}
            // tableClassName={
            //   !this.isNew && this.props.item != null && this.props.isChange
            //     ? this.props.item.isChangeInstruction
            //       ? "   border border-danger"
            //       : ""
            //     : ""
            // }
            />
          </CellContainer>
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
