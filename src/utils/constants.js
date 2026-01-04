export const Roles = {
  /// <summary>
  /// ادمین کلی سیستم
  /// </summary>
  SuperAdmin: "admin",

  /// <summary>
  /// ادمین سیستم
  /// </summary>
  SystemAdmin: "cmi.admin",

  /// <summary>
  /// ناظر امنیت بانک سپه
  /// </summary>
  SupervisorAdmin: "",
};

export const mergedBank = {
  ansar: "2",
  ghavamin: "3",
  mehrEghtesad: "4",
  kosar: "5",
  hekmat: "6",
  sepah: "7",
  tash: "191",
};
export const expertiseOption = {
  good: "8",
  medium: "9",
  weak: "10",
  connoisseur: "11",
};

export const foundInspectionStatus = {
  compliance: {
    label: "رعایت",
    title: "رعایت",
    value: "1",
  },
  nonCompliance: {
    label: "عدم رعایت",
    title: "عدم رعایت",
    value: "2",
  },
  violation: {
    label: "تخلف",
    title: "تخلف",
    value: "3",
  },
};

export const expertiseOption2 = {
  primary: "113",
  base: "114",
  senior: "115",
  connoisseur: "116",
  great: "117",
};

export const inspectorEvaluationTerm = {
  spring: 32,
  summer: 29,
  fall: 31,
  winter: 30,
  firstSixMonthYear: 33,
  secondSixMonthYear: 34,
  yearly: 35,
};
export const educationDegree = {
  diploma: 119,
  associate: 120,
  bachelor: 121,
  masters: 122,
  doctorate: 123,
  seniorDoctorate: 124,
};
export const LogicType = {
  And: 0,
  Or: 1
};

export const ReferralGroup = {
  ///<summary>
  ///ناظر بر اداره مبارزه با پولشویی
  ///</summary>
  SupervisorOfTheAntiMoneyLaunderingDepartment: 1,

  ///<summary>
  ///تایید کننده نهایی
  ///</summary>
  FinalApprover: 2,

  ///<summary>
  ///رییس اداره پولشویی
  ///</summary>
  HeadOfTheAntiMoneyLaunderingDepartment: 3,

  ///<summary>
  ///راهبر منطقه
  ///</summary>
  RegionalLeader: 4,

  ///<summary>
  ///کارشناس پیگیری
  ///</summary>
  TrackingExpert: 5,
}

export const afraMethodUrls = {
  getBranchManagements: "/api/cmi/config/getBranchManagements",
  getBranchs: "/api/cmi/config/getBranchs",
  getBracnhAndBranchManagements:
    "/api/cmi/config/getBranchAndBranchManagements",
  getOffices: "/api/cmi/config/getOffices",
  getBranchsByBranchManagementId:
    "/api/cmi/config/getBranchsByBranchManagementId",
  getCompanies: "/api/cmi/config/GetCompanies",
  getOfficesAndBranchManagements:
    "/api/cmi/distance/GetOfficesAndBranchManagements",
  getRegionAll: "/api/cmi/distance/getRegionAll",
  getUnitAll: "/api/cmi/distance/getUnitAll",
  getCityAll: "/api/cmi/config/GetCityAll",
  getIndependentBranch: "/api/cmi/config/GetIndependentBranch",
};

export const MinGridHeight = 250;
export const NoAccessPermission = "عدم دسترسی";
export const MaxLengthDescription = 256;
export const IsValid = "IsValid";
export const ValidFeedBack = "ValidFeedBack";
export const inspectionStatus = {
  buyBack: "23", //بازخرید
  retired: "24", // بازنشسته
  agent: "25", //مامور
  availableCustomer: "26", // دراختیار مشتری
  leave: "27", // مرخصی
  leavePaid: "110", //مرخصی با حقوق
  leaveIllness: "111", //مرخصی استعلاجی
  active: "22", //فعال
};

export const ProfileTypes = {
  Inspector: 1, // بازرس 
  Referred: 2, // ارجاع گیرنده
};
export const userType = {
  inspector: 104,
  referal: 105,
};
export const dayOff = {
  haveNot: "13",
  saturday: "14",
  sunday: "15",
  monday: "16",
  tuesday: "17",
  wednesday: "18",
  thursday: "19",
};

export default { Roles };