import { ErrorPage, Helpers, LoginPage, LogoutPage } from "core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Constants, { LogicType, NoAccessPermission } from "./utils/constants";
import { GetUrl, IsInRoles } from "./utils/generals";

// Css
import "./assets/app.css";

// Pages
import InspectionGroupAddPage from "./pages/baseInformation/inspectionGroup/inspectionGroupAddPage";
import InspectionGroupEditPage from "./pages/baseInformation/inspectionGroup/inspectionGroupEditPage";
import InspectionGroupListPage from "./pages/baseInformation/inspectionGroup/inspectionGroupListPage";
import InspectionSubGroupAddPage from "./pages/baseInformation/inspectionSubGroup/inspectionSubGroupAddPage";
import InspectionSubGroupEditPage from "./pages/baseInformation/inspectionSubGroup/inspectionSubGroupEditPage";
import InspectionSubGroupListPage from "./pages/baseInformation/inspectionSubGroup/inspectionSubGroupListPage";
import HomePage from "./pages/homePage";
import CalendarSettingPage from "./pages/systemSetting/calenderSolar/calendarSettingPage";
import LevelListPage from "./pages/baseInformation/Level/levelListPage";
import LevelEditPage from "./pages/baseInformation/Level/levelEditPage";
import LevelAddPage from "./pages/baseInformation/Level/levelAddPage";
import StudentAddPage from "./pages/baseInformation/Student/studentAddPage";
import StudentEditPage from "./pages/baseInformation/Student/studentEditPage";
import StudentListPage from "./pages/baseInformation/Student/studentListPage";

const YourSessionIsFinished =
  "شما به این بخش دسترسی ندارید یا مدت زمان نشست شما به پایان رسیده است";
// Constants.
const NoAccessMsg =
  "شما به این بخش دسترسی ندارید و یا زمان نشت شما به پایان رسیده است";
const NoAccessTitle = "عدم دسترسی";
const AdminRoles = [Constants.Roles.SuperAdmin, Constants.Roles.SupervisorAdmin, Constants.Roles.SystemAdmin];

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={GetUrl("login")}
          render={(props) => <LoginPage {...props} />}
        />
        <Route path="/logout" render={(props) => <LogoutPage {...props} />} />
        <Route
          exact
          path="/"
          render={(props) => {
            if (Helpers.IsUserAuthenticated()) {
              if (
                IsInRoles([...AdminRoles], LogicType.Or)
              ) {
                if (props.location.search.indexOf("?url=") > -1)
                  return (
                    <Redirect
                      to={decodeURIComponent(
                        props.location.search.substring("?url=".length)
                      )}
                    />
                  );
                return <HomePage {...props} />;
              } else {
                return (
                  <ErrorPage title={NoAccessTitle} description={NoAccessMsg} />
                );
              }
            } else {
              if (props.location.search.indexOf("?url=") > -1) {
                const r = decodeURIComponent(
                  props.location.search.substring("?url=".length)
                );
                sessionStorage.setItem("redirectUrl", r);
              }
              return <Redirect to={GetUrl("login")} {...props} />;
            }
          }}
        />

        {/* گروه بازرسی */}
        <Route
          exact
          path={GetUrl("inspectionGroupListPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionGroupListPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectionGroupAddPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionGroupAddPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectionGroupEditPage/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionGroupEditPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />

        {/* زیر گروه بازرسی */}
        <Route
          exact
          path={GetUrl("inspectionSubGroupListPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionSubGroupListPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectionSubGroupAddPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionSubGroupAddPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectionSubGroupEditPage/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectionSubGroupEditPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("calendarSettingPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <CalendarSettingPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectorProfileAddPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectorProfileAddPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />
        <Route
          exact
          path={GetUrl("showInspectorDetailInfo/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectorProfileDetailPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectorProfileEditPage/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <InspectorProfileEditPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />
        <Route
          exact
          path={GetUrl("inspectorProfileListPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              IsInRoles([...AdminRoles], LogicType.Or) ? (
              <InspectorProfileListPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />

        <Route
          exact
          path={GetUrl("levelListPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              IsInRoles([...AdminRoles], LogicType.Or) ? (
              <LevelListPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />


        <Route
          exact
          path={GetUrl("levelEditPage/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <LevelEditPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("levelAddPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              IsInRoles([...AdminRoles], LogicType.Or) ? (
              <LevelAddPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />

        <Route
          exact
          path={GetUrl("studentListPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              IsInRoles([...AdminRoles], LogicType.Or) ? (
              <StudentListPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />


        <Route
          exact
          path={GetUrl("studentEditPage/:id")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              (IsInRoles([...AdminRoles], LogicType.Or)) ? (
              <StudentEditPage {...props} />
            ) : (
              <ErrorPage title={NoAccessPermission} description="" />
            )
          }
        />
        <Route
          exact
          path={GetUrl("studentAddPage")}
          render={(props) =>
            Helpers.IsUserAuthenticated() &&
              IsInRoles([...AdminRoles], LogicType.Or) ? (
              <StudentAddPage {...props} />
            ) : (
              <ErrorPage
                title={NoAccessTitle}
                description={YourSessionIsFinished}
              />
            )
          }
        />

        <Route
          render={(props) => (
            <ErrorPage
              {...props}
              title="صفحه مورد نظر شما در سامانه یافت نشد"
              description="صفحه مورد نظر شما در سامانه حذف شده است یا احتمالا شما مجوز لازم جهت دسترسی به صفحه مذکور را ندارید"
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppWrapper;
