import { PageMain, SimpleGrid, Helpers } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MinGridHeight } from "../../../utils/constants";
import { GetUrl, HandleError } from "../../../utils/generals";
import { isActiveOptions } from "../../../utils/selectOptionUtils";
import { AttachmentModalSection } from "../../../sections/baseInformation/attachmentModalSection";


export default class StudentListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      isLoading: false,
      updateKey: 0,
      showModal: false,
      id: null,

    };
    this.notificationSystem = React.createRef();
  }
  componentDidMount() {
    this.getCities();
  }

  getCities = () => {
    Helpers.CallServer(
      "/api/cmi/City/GetList",
      {},
      (response) => {
        this.setState({
          cities: response.data.map(x => ({ value: x.id, label: x.title, title: x.title })),
        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false }),
      "POST"
    );
  }

  onDownloadFile = (e) => {
    window.open(
      '/api/cmi/Attachment/DownloadFirst/' + e['id'],
      '_blank'
    );
  };


  OnClickDelete = (e) => {
    const _this = this;
    Helpers.CallServer(
      "/api/cmi/Attachment/DeleteAttachmentWithTableId/" + e['id'],
      {
        searchTerm: e['id'],
        Id: e['id'],
      }
      ,
      (res) => {
        _this.setState({
          updateKey: this.state.updateKey + 1,
        });
        Helpers.DisplaySuccessMessage(this.notificationSystem, 'فایل با موفقیت حذف شد.');
      },
      (error) => HandleError(error, this.notificationSystem, Helpers),
      () => this.setState({ isLoading: false }), 'POST'
    );

  };


  openDetailModal = (e) => {
    this.setState({ showModal: true, updateKey: this.state.updateKey + 1, id: e['id'] });
  }


  render() {
    return (
      <>
        <PageMain
          title="فهرست دانش آموز ها"
          icon="list-search"
          key={this.state.updateKey}
          topButtons={[
            {
              title: "افزودن دانش آموز",
              url: GetUrl("studentAddPage"),
              color: "outline-primary",
              icon: "circle-plus",
            },
          ]}
          footerLinks={[{ href: "/", text: "صفحه اصلی" }]}
        >
          <div className="card">
            <div className="card-body">
              <SimpleGrid
                hideExportButton
                context={this}
                dataKey="id"
                key={this.state.updateKey}
                minHeightTableWrapper={MinGridHeight}
                filterBgColor="primary"
                name="gridStudentListPage"
                title="فهرست"
                listApiUrl="/api/cmi/Student/GetList"
                deleteApiUrl="/api/cmi/Student/Delete"
                onDeleteErrorFunc={(error) =>
                  HandleError(this.notificationSystem, error)
                }
                editPageUrl={GetUrl("StudentEditPage")}
                // isFilterCollapsed={true}
                enableAutoFetch={true}
                notificationSystem={this.notificationSystem}
                headers={[
                  { title: "کد", name: "id" },
                  { title: "نام", name: "firstName" },
                  { title: "نام خانوادگی", name: "lastName" },
                  { title: "نام و نام خانوادگی", name: "fullName" },
                  { title: "پایه", name: "levelTitle" },
                  { title: "شهر", name: "cityTitle" },
                  { title: "وضعیت", name: "isActiveStatus" },
                  { title: "تاریخ", name: "birthDatePersianDate" },

                  // BirthDateGorgianDate



                  // { title: "شهر", name: "IsActive" },
                ]}
                filterOptions={[
                  {
                    type: "number",
                    name: "id",
                    title: "کد",
                  },
                  {
                    type: "text",
                    name: "firstName",
                    title: "نام",
                  },
                  {
                    type: "text",
                    name: "lastName",
                    title: "نام خانوادگی",
                  },
                  {
                    type: "auto-complete",
                    name: "levelId",
                    title: "پایه",
                    lookupApiUrl:
                      "/api/cmi/LevelByHatef/GetAllForAutoComplete",
                  },
                  {
                    type: "select",
                    name: "cityId",
                    title: "شهر",
                    selectOptions: this.state.cities
                  },
                  {
                    type: "select",
                    name: "isActive",
                    title: "وضعیت",
                    selectOptions: isActiveOptions()
                  }
                ]}
                moreInfoLinks={[
                  {
                    title: 'جزِیات دانش آموز',
                    icon: 'list',
                    func: (e) => this.openDetailModal(e),
                    // url: GetUrl("attachmentModalSection"),
                  },

                  {
                    title: 'حذف فایل',
                    icon: 'file-remove',
                    func: (e) => this.OnClickDelete(e),
                    url: '',
                  },

                  {
                    title: 'دریافت فایل',
                    icon: 'download',
                    func: (e) => this.onDownloadFile(e),
                    enable: (e) => {
                      return true;
                      // return e.hasFileTitle == 'دارد';
                    },
                  },
                ]}
              />
            </div>
            {this.state.showModal &&
              <AttachmentModalSection
                showModal={this.state.showModal}
                record={this.state.id}
              />
            }
          </div>
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
