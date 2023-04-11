const { strikethrough } = require("chalk");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticket = mongoose.Schema(
  {
    // feedskipstop:{
    //   type:Boolean,
    //   default:false,
    // },
    // feedAgain:{
    //   type: Boolean,
    //   default: false,
    // },
    Feedskip: {
      type: Boolean,
      default: false,
    },
    FeedbackMobile: {
      type: Boolean,
      default: false,
    },
    issueCategory_new: {
      type: String,
    },
    issueSubCategory_new: {
      type: String,
    },
    actionTaken_new: {
      type: String,
    },
    typeOfRequest_new: {
      type: String,
    },
    department_new: {
      type: String,
    },
    isTrcSpareRequested: {
      type: Number,
    },
    accountmanageremail: {
      type: String,
    },
    SLA_Mail_Sent: {
      type: Boolean,
      default: false,
    },
    additionalCommentDate: {
      type: Date,
    },
    additionalComment: {
      type: String,
    },
    statndByDate: {
      type: Date,
    },
    isStandBy: {
      type: Boolean,
    },
    standByDuration: {
      type: Number,
    },
    isScript: {
      type: Boolean,
    },
    response_Consumed: {
      type: Number,
    },
    respones_given_date: {
      type: Date,
    },
    voltageAttachment: [],
    earth_neutral: {
      type: Number,
      required: false,
    },
    neutral_power: {
      type: Number,
      required: false,
    },
    earth_power: {
      type: Number,
      required: false,
    },
    curr_lat: {
      type: String,
    },
    curr_long: {
      type: String,
    },
    autoCsrMailSent: {
      type: Boolean,
    },
    mono_page_count: {
      type: Number,
    },
    color_page_count: {
      type: Number,
    },
    total_sla_consumed: {
      type: Number,
    },
    buCategory: {
      type: String,
    },
    initialBU: {
      type: String,
      required: true,
    },
    storeId: {
      /////current owner code
      type: Schema.Types.ObjectId,
    },
    isPartApproved: {
      type: Boolean,
    },
    sla_remaning_seconds_after_hold: {
      type: Number,
    },
    sla_hold_duration_final: {
      type: Number,
    },
    sla_Breached: {
      type: Boolean,
      default: false,
    },
    sla_Consumed: {
      type: Number,
      default: false,
    },
    isStandByInstall: {
      type: Number,
    },
    erpUpdate: {
      type: Boolean,
      default: false,
    },
    isNewTicket: {
      type: Boolean,
    },
    erpTicketUpdated: {
      type: Boolean,
    },
    contractNo: {
      type: String,
    },
    partComment: {
      type: String,
    },
    pendingComment: {
      type: String,
    },
    lastRemark: {
      type: String,
    },
    lastRemarkDate: {
      type: Date,
    },

    lastEngineer: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    currentOwner: {
      type: String,
    },
    isCurrentOwner: {
      type: Boolean,
    },
    dateTm: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        date: {
          type: String,
        },
        commentBy: {
          type: String,
        },
        userName: {
          type: String,
        },
      },
    ],
    acceptInfo: [
      {
        comment: {
          type: String,
        },
        dateTime: {
          type: String,
        },
        // remark: {
        //   type: String,
        // },
        userName: {
          type: String,
        },
        userId: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    isAccepted: {
      type: String,
    },
    ticketCategory: {
      type: String,
    },
    assetIdCount: {
      type: Number,
    },
    isPartRequested: {
      type: Number,
    },
    contactno: {
      type: String,
    },
    isVIP: {
      type: Boolean,
    },
    scheduledDate: {
      type: String,
    },
    ticketDate: {
      type: String,
    },
    userName: {
      type: String,
    },
    source: {
      type: String,
    },
    clusterId: {
      type: String,
    },
    assetId: {
      type: String,
      required: false,
    },
    sla_start_time: {
      type: Date,
    },
    sla_end_time: {
      type: Date,
    },
    hold_start_time: {
      type: Date,
    },
    hold_duration: {
      type: Number,
    },
    onHold: {
      type: Boolean,
    },
    oemId: {
      type: String,
    },
    assetType: {
      type: String,
      required: true,
    },
    callMode: {
      type: String,
      required: true,
    },
    callType: {
      type: String,
    },
    status: {
      type: String,
    },
    lastStatus: {
      type: String,
    },
    statusDept: {
      type: String,
    },
    dept_history: [
      {
        type: String,
      },
    ],
    statusHistory: [
      {
        type: Object,
      },
    ],
    ticketattachments: {
      type: [String],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    address: {
      line1: {
        type: String,
      },
      line2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalcode: {
        type: String,
      },
    },
    engineer: {
      type: Schema.Types.ObjectId,
      ref: "Engineer",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    custName: {
      type: String,
    },

    contactPerson: {
      type: String,
    },
    assestWarranty: {
      type: String,
    },
    serviceType: {
      type: String,
    },
    serviceItemNo: {
      type: String,
    },
    severity: {
      type: String,
    },
    accountManager: {
      type: String,
    },
    scheduleDate: {
      type: Date,
    },
    scheduledTime: {
      type: String,
    },
    issue: {
      type: String,
    },
    issueCategory: {
      type: String,
    },
    issueSubCategory: {
      type: String,
    },
    typeOfRequest: {
      type: String,
    },
    email: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedAdmin: {
      type: Schema.Types.ObjectId,
      ref: "Admin_user",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin_user",
    },
    partnerEngId: {
      type: Schema.Types.ObjectId,
      ref: "partnerEng",
    },

    purchaseOrderNo: {
      type: String,
    },
    serviceCharges: {
      type: String,
    },
    TA: {
      type: String,
    },
    partnerImId: {
      type: Schema.Types.ObjectId,
      ref: "Admin_user",
    },
    tcplTrc: {
      type: Schema.Types.ObjectId,
      ref: "Admin_user",
    },
    trcId: {
      type: Schema.Types.ObjectId,
      ref: "Trc_users",
    },
    department: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    extension: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    assetMake: {
      type: String,
    },
    assetModel: {
      type: String,
    },
    auditTrail: [
      {
        type: Schema.Types.ObjectId,
        ref: "PartReq",
      },
    ],
    partReq: [
      {
        type: String,
        ref: "AuditTrail",
      },
    ],
    ticketSerialNo: {
      type: String,
    },
    assetSerial: {
      type: String,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    contractType: {
      type: String,
    },
    contractCalllimit: {
      type: String,
    },
    contractEnddate: {
      type: String,
    },
    contractExpired: {
      type: String,
    },
    contractlineno: {
      type: String,
    },
    contractStartdate: {
      type: String,
    },
    custCode: {
      type: String,
    },
    mon: {
      type: String,
    },
    tue: {
      type: String,
    },
    wed: {
      type: String,
    },
    thu: {
      type: String,
    },
    fri: {
      type: String,
    },
    sat: {
      type: String,
    },
    sun: {
      type: String,
    },
    postalcode: {
      type: String,
    },
    resolutiontime_Hours: {
      type: Number,
    },
    responsetime_Hours: {
      type: Number,
    },
    secNdslaresolution_Hours: {
      type: Number,
    },
    serviceCount: {
      type: String,
    },
    swStarttime: {
      type: String,
    },
    swEndtime: {
      type: String,
    },
    priority: {
      type: String,
    },
    sla_percentage: {
      type: Number,
      default: 0,
    },
    sla_remaning_seconds: {
      type: Number,
      // default: 0,
    },
    sla_response_percent: {
      type: Number,
      default: 0,
    },
    sla_response_remaning_seconds: {
      type: Number,
      //default: 0,
    },
    sla_response_given: {
      type: Number,
      default: 0,
    },
    on_hold: {
      type: Number,
      default: 0,
    },
    phoneNo: {
      type: Number,
    },
    phoneNoext: {
      type: Number,
    },
    assginStatus: {
      type: String,
    },
    remark: {
      type: String,
    },
    imEmail: {
      type: String,
    },
    engAssigndate: {
      type: String,
    },
    partnerAssigndate: {
      type: String,
    },
    reopenStatus: {
      type: Boolean,
      default: false,
    },
    reOpenCount: {
      type: Number,
      default: 0,
    },
    isPdcStCheck: {
      type: String,
      default: "",
    },
    isDTC: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },

    reopenRquestedDept: {
      type: String,
    },
    reasonForReopen: {
      type: String,
    },
    storeMpsUser: {
      type: Number,
    },
    ticketResolvedDate: {
      type: Date,
    },
    ticketCancelDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    reopenAttachments: [],
    cancelledAttachments: [],
    csrAttachments: [],
    csrAttachmentshtml: [],
    isFinalCsr: {
      type: Boolean,
    },
    courtesycontract: {
      type: Boolean,
    },
    customerPAN: {
      type: String,
    },
    projectCode: {
      type: String,
    },
    feedbackReceived: {
      type: Boolean,
      default: false,
    },
    feedbackMailed: {
      type: Boolean,
      default: false,
    },
    additionalAttachment: {
      type: [String],
    },
    breachedDate: {
      type: Date,
    },
    resolvedSlaCalculated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticket);
