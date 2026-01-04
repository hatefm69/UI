import { Helpers } from "core";
import React from "react";
import { LogicType } from "./constants";

export function HandleError(notificationSystem, error) {
  try {
    if (notificationSystem == null) notificationSystem = React.createRef();
    if (error.response == undefined) {
      var message = Helpers.IsDebug() ? error.toString() : "خطا در سیستم";

      Helpers.DisplayErrorMessage(notificationSystem, null, message);
      return;
    }
    if (error.response == null || error.response.status == null) {
      Helpers.DisplayErrorMessage(notificationSystem, null, error);
      return;
    }

    var response = error.response;

    if (response.status == 400 || response.status == 500)
      Helpers.DisplayErrorMessage(
        notificationSystem,
        null,
        response.data.message
      );
    else
      Helpers.DisplayErrorMessage(
        notificationSystem,
        null,
        "بروز خطا کد پاسخ : " + response.status
      );
  } catch (error) {
    Helpers.DisplayErrorMessage(notificationSystem, null, "بروز خطا در سیستم");
  }
  return true;
}

export function GetUrl(url) {
  return "/UI/" + url;
}
export function GetPostSubmitUrl(param) {
  return "/api/cmi/" + param + "/Post";
}
export function GetUpdateSubmitUrl(param) {
  return "/api/cmi/" + param + "/Update";
}
export function GetListSubmitUrl(param) {
  return "/api/cmi/" + param + "/GetList";
}
export function GetDeleteSubmitUrl(param) {
  return "/api/cmi/" + param + "/Delete";
}

export function ConvertEpochToGregorianDate(input) {
  var d = new Date(input * 1000);

  let fullYear = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();

  if (month.toString().length == 1) {
    month = "0" + month;
  }

  if (date.toString().length == 1) {
    date = "0" + date;
  }

  const currentdate = `${fullYear}-${month}-${date}`;
  return currentdate;
  //return new Date(currentdate)
}

export function GetDropDownValues(dropDownId, dropDowns) {
  if (dropDowns == null) return [];
  var temp = dropDowns.filter((drp) => drp.id == dropDownId);

  return temp == null || temp.length <= 0 ? [] : temp[0].values;
}

export function IsValid(contorlName, state, helpers, notificationSystem) {
  if (state[contorlName + "IsValid"] == false) {
    helpers.DisplayErrorMessage(
      notificationSystem,
      null,
      state[contorlName + "ValidFeedBack"]
    );
    return false;
  }
  return true;
}

export function Backward(e) {
  e.preventDefault();
  history.back();
}

export function DownloadBlobFile(response, fileName) {
  const blob = new Blob([response], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  if (document.body.contains(link)) document.body.removeChild(link);
}

export function getLastShamsiDayByYear(year) {
  const y = year % 33;
  const day = [1, 5, 9, 13, 17, 22, 26, 30].includes(y) ? 30 : 29;
  return day;
}


export function arrayValidation(state, fields) {
  let errorMessage = "";
  fields.forEach((field) => {
    if (errorMessage !== "") {
      return errorMessage;
    }

    if (!state[field + IsValid]) {
      errorMessage = state[field + ValidFeedBack];
      return;
    }
  });
  return errorMessage;
}


export function getEndDateTimeEpoch(epochDate) {
  let miladiDate = convertEpochToDate(epochDate);
  let endDate = new Date(miladiDate + " 23:59:59");
  return convertDateToEpoch(endDate);
}

export function getStartDateTimeEpoch(epochDate) {
  let miladiDate = convertEpochToDate(epochDate);
  let startDate = new Date(miladiDate + " 00:00:00");
  let startDateEpoch = convertDateToEpoch(startDate);
  return startDateEpoch;
}

export function FormatInput(input) {
  if (input != "") {
    let inputArray = input.split("/");
    if (inputArray[1].length == 1) {
      inputArray[1] = "0" + inputArray[1];
    }

    if (inputArray[2].length == 1) {
      inputArray[2] = "0" + inputArray[2];
    }

    let finalResult = "";
    inputArray.forEach((d) => {
      finalResult += d + "/";
    });

    return finalResult.slice(0, -1);
  }
  return "";
}

export function IsInRoles(roles = [], logicType) {
  const exists = roles.map(Helpers.IsInRole);

  if (logicType === LogicType.Or) {
    return exists.some(Boolean);
  }

  if (logicType === LogicType.And) {
    return exists.every(Boolean);
  }

  return false;
}

export function convertEpochToDate(input) {
  var d = new Date(input * 1000);

  let fullYear = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();

  if (month.toString().length == 1) {
    month = "0" + month;
  }

  if (date.toString().length == 1) {
    date = "0" + date;
  }

  const currentdate = `${fullYear}-${month}-${date}`;
  return currentdate;
}