// TODO: Move to style utils
// maps patternClass.name to custom color keys defined in tailwind.config.js
//  tailwind doesn't support templated class names, hence we need to use this lookup
export const backgroundColorClasses: any = {
  Rent: "bg-rent",
  Transfer: "bg-transfer",
  Administration: "bg-administration",
  Eligibility: "bg-eligibility",
  "Security of tenure": "bg-security",
  Develop: "bg-develop",
  Stewardship: "bg-stewardship",
  Use: "bg-use",
  Access: "bg-access",
}

export const hoverColorClasses: any = {
  Rent: "hover:bg-rent/70",
  Transfer: "hover:bg-transfer/70",
  Administration: "hover:bg-administration/70",
  Eligibility: "hover:bg-eligibility/70",
  "Security of tenure": "hover:bg-security/70",
  Develop: "hover:bg-develop/70",
  Stewardship: "hover:bg-stewardship/70",
  Use: "hover:bg-use/70",
  Access: "hover:bg-access/70",
}

export const descriptionBackgroundColorClasses: any = {
  Rent: "bg-rent/20",
  Transfer: "bg-transfer/20",
  Administration: "bg-administration/20",
  Eligibility: "bg-eligibility/20",
  "Security of tenure": "bg-security/20",
  Develop: "bg-develop/20",
  Stewardship: "bg-stewardship/20",
  Use: "bg-use/20",
  Access: "bg-access/20",
}
