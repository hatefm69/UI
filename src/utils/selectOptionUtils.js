import { dayOff, educationDegree, expertiseOption, expertiseOption2, inspectionStatus, inspectorEvaluationTerm, mergedBank } from "./constants";

export function isActiveOptions(isDefault) {
  let array = [];
  if (isDefault)
    array.push({ title: "انتخاب کنید", value: null, label: "انتخاب کنید" });
  array = array.concat([
    { title: "فعال", value: "true", label: "فعال" },
    { title: "غیرفعال", value: "false", label: "غیرفعال" },
  ]);
  return array;
}

export function sortOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "صعودی", value: "0", label: "صعودی" },
    { title: "نزولی", value: "1", label: "نزولی" },
  ]);
}
export function familyRelationshipOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "مادر", value: "0", label: "مادر" },
    { title: "پدر", value: "1", label: "پدر" },
    { title: "برادر", value: "2", label: "برادر" },
    { title: "خواهر", value: "3", label: "خواهر" },
    { title: "پدر بزرگ", value: "4", label: "پدر بزرگ" },
    { title: "مادر بزرگ", value: "5", label: "مادر بزرگ" },
  ]);
}

export function branchDegreeOptions() {
  var arrBranchDegree = [];
  arrBranchDegree.push({
    title: "انتخاب کنید",
    value: "",
    label: "انتخاب کنید",
  });
  arrBranchDegree.push({ title: "ممتاز الف", value: "1", label: "ممتاز الف" });
  arrBranchDegree.push({ title: "ممتاز ب", value: "2", label: "ممتاز ب" });
  arrBranchDegree.push({ title: "درجه1", value: "3", label: "درجه1" });
  arrBranchDegree.push({ title: "درجه2", value: "4", label: "درجه2" });
  arrBranchDegree.push({ title: "درجه3", value: "5", label: "درجه3" });
  arrBranchDegree.push({ title: "درجه4", value: "6", label: "درجه4" });
  arrBranchDegree.push({ title: "درجه5", value: "7", label: "درجه5" });
  arrBranchDegree.push({ title: "باجه", value: "8", label: "باجه" });
  return arrBranchDegree;
}

export function checkDataIsValid(e) {
  if (
    e !== null &&
    e !== undefined &&
    e !== "" &&
    e.data !== null &&
    e.data !== "" &&
    e.data !== undefined &&
    e.status !== null &&
    e.status !== undefined &&
    e.status === 200
  ) {
    return true;
  }
  return false;
}

export function typeDataEntryOptions() {
  return [
    { label: "دستی", value: "false", title: "دستی" },
    { label: "فایل", value: "true", title: "فایل" },
  ];
}

export function referralGroupOptions() {
  return [
    {
      title: "ناظر بر اداره مبارزه با پولشویی",
      value: "1",
      label: "ناظر بر اداره مبارزه با پولشویی",
    },
    { title: "تایید کننده نهایی", value: "2", label: "تایید کننده نهایی" },
    { title: "رییس اداره پولشویی", value: "3", label: "رییس اداره پولشویی" },
    { title: "راهبر منطقه", value: "4", label: "راهبر منطقه" },
    { title: "کارشناس پیگیری", value: "5", label: "کارشناس پیگیری" },
  ];
}

export function referralGroupTeamAllocationOptions() {
  let referralGroupsArr = referralGroupOptions();
  let resultArr = referralGroupsArr.filter((item) => {
    return item.value === "4" || item.value === "5";
  });
  return resultArr;
}


export function expertiseItemOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "مقدماتی", value: expertiseOption2.primary, label: "مقدماتی" },
    { title: "پایه", value: expertiseOption2.base, label: "پایه" },
    { title: "ارشد", value: expertiseOption2.senior, label: "ارشد" },
    { title: "خیره", value: expertiseOption2.connoisseur, label: "خبره" },
    { title: "عالی", value: expertiseOption2.great, label: "عالی" },
  ]);
}

export function inspectionStatusOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "فعال", value: inspectionStatus.active, label: "فعال" },
    { title: "بازخرید", value: inspectionStatus.buyBack, label: "بازخرید" },
    { title: "مامور", value: inspectionStatus.agent, label: "مامور" },
    // {
    //   title: "دراختیار مشتری",
    //   value: inspectionStatus.availableCustomer,
    //   label: "دراختیار مشتری",
    // },
    {
      title: "مرخصی بدون حقوق",
      value: inspectionStatus.leave,
      label: "مرخصی بدون حقوق",
    },
    {
      title: "مرخصی استعلاجی",
      value: inspectionStatus.leaveIllness,
      label: "مرخصی استعلاجی",
    },
    { title: "بازنشسته", value: inspectionStatus.retired, label: "بازنشسته" },
  ]);
}

export function userTypeOptions(hasDefault) {
  let resultArray = [];
  if (hasDefault) {
    resultArray.push({ title: "انتخاب کنید", value: null, label: "انتخاب کنید" },);
  }
  return resultArray.concat([
    { title: "بازرس", value: 1, label: "بازرس" },
    { title: "ارجاع کننده", value: 2, label: "ارجاع کننده" },
  ]);
}

export function mergedBankOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "انصار", value: mergedBank.ansar, label: "انصار" },
    { title: "قوامین", value: mergedBank.ghavamin, label: "قوامین" },
    { title: "کوثر", value: mergedBank.kosar, label: "کوثر" },
    { title: "حکمت", value: mergedBank.hekmat, label: "حکمت" },
    { title: "مهراقتصاد", value: mergedBank.mehrEghtesad, label: "مهراقتصاد" },
    { title: "سپه", value: mergedBank.sepah, label: "سپه" },
    { title: "-", value: mergedBank.tash, label: "-" },
  ]);
}

export function educationDegreeOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "دیپلم", value: educationDegree.diploma, label: "دیپلم" },
    { title: "کاردانی", value: educationDegree.associate, label: "کاردانی" },
    { title: "کارشناسی", value: educationDegree.bachelor, label: "کارشناسی" },
    {
      title: "کارشناسی ارشد",
      value: educationDegree.masters,
      label: "کارشناسی ارشد",
    },
    { title: "دکتری", value: educationDegree.doctorate, label: "دکتری" },
    {
      title: "دکتری ارشد",
      value: educationDegree.seniorDoctorate,
      label: "دکتری ارشد",
    },
  ]);
}

export function dayOffOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "ندارد", value: dayOff.haveNot, label: "ندارد" },
    { title: "شنبه", value: dayOff.saturday, label: "شنبه" },
    { title: "یکشنبه", value: dayOff.sunday, label: "یکشنبه" },
    { title: "دوشنبه", value: dayOff.monday, label: "دوشنبه" },
    { title: "سه شنبه", value: dayOff.tuesday, label: "سه شنبه" },
    { title: "چهارشنبه", value: dayOff.wednesday, label: "چهارشنبه" },
    { title: "پنج شنبه", value: dayOff.thursday, label: "پنج شنبه" },
  ]);
}

export function inspectorEvaluationTermOptions() {
  let resultArray = [];
  return resultArray.concat([
    { label: "بهار", value: inspectorEvaluationTerm.spring },
    { label: "تابستان", value: inspectorEvaluationTerm.summer },
    { label: "پاییز", value: inspectorEvaluationTerm.fall },
    { label: "زمستان", value: inspectorEvaluationTerm.winter },
    {
      label: "6 ماهه اول سال",
      value: inspectorEvaluationTerm.firstSixMonthYear,
    },
    {
      label: "6 ماهه دوم سال",
      value: inspectorEvaluationTerm.secondSixMonthYear,
    },
    { label: "سالانه", value: inspectorEvaluationTerm.yearly },
  ]);
}

export function inspectorEvaluationYearOptions() {
  return yearOptions(1395, 1403);
}

export function yearOptions(fromYear, toYear) {
  let resultArray = [];
  for (let index = fromYear; index <= toYear; index++) {
    let year = index.toString();
    resultArray.push({ label: year, value: year });
  }
  return resultArray;
}

export function setInspectorVisibleDatesState(value) {
  let result = [];

  switch (value) {
    case inspectionStatus.buyBack:
    case inspectionStatus.retired:
      result.push(true);
      result.push(false);
      break;
    case inspectionStatus.agent:
    case inspectionStatus.availableCustomer:
    case inspectionStatus.leave:
    case inspectionStatus.leavePaid:
    case inspectionStatus.leaveIllness:
      result.push(true);
      result.push(true);
      break;
    default:
      result.push(false);
      result.push(false);
      break;
  }
  return result;
}
export function expertiseOptions() {
  let resultArray = [];
  return resultArray.concat([
    { title: "خوب", value: expertiseOption.good, label: "خوب" },
    { title: "متوسط", value: expertiseOption.medium, label: "متوسط" },
    { title: "ضعیف", value: expertiseOption.weak, label: "ضعیف" },
    { title: "خبره", value: expertiseOption.connoisseur, label: "خبره" },
  ]);
}