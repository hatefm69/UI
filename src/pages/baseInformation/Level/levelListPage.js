import { PageMain, SimpleGrid } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MinGridHeight } from "../../../utils/constants";
import { GetUrl, HandleError } from "../../../utils/generals";

export default class LevelListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.notificationSystem = React.createRef();
  }

  render() {
    return (
      <>
        <PageMain
          title="فهرست پایه ها"
          icon="list-search"
          topButtons={[
            {
              title: "افزودن پایه",
              url: GetUrl("levelAddPage"),
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
                name="gridLevelListPage"
                title="فهرست"
                listApiUrl="/api/cmi/LevelByHatef/GetList"
                deleteApiUrl="/api/cmi/LevelByHatef/Delete"
                onDeleteErrorFunc={(error) =>
                  HandleError(this.notificationSystem, error)
                }
                editPageUrl={GetUrl("LevelEditPage")}
                // isFilterCollapsed={true}
                enableAutoFetch={true}
                notificationSystem={this.notificationSystem}
                headers={[
                  { title: "کد", name: "id" },
                  { title: "عنوان", name: "title" },
                ]}
                filterOptions={[
                  {
                    type: "number",
                    name: "id",
                    title: "کد",
                  },
                  {
                    type: "text",
                    name: "title",
                    title: "عنوان",
                  },
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
