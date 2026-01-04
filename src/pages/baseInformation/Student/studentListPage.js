import { PageMain, SimpleGrid, Helpers } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MinGridHeight } from "../../../utils/constants";
import { GetUrl, HandleError } from "../../../utils/generals";
import { isActiveOptions } from "../../../utils/selectOptionUtils";


export default class StudentListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      isLoading: false

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

  render() {
    return (
      <>
        <PageMain
          title="فهرست دانش آموز ها"
          icon="list-search"
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
              />
            </div>
          </div>
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
