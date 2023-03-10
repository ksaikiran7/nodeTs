export enum AdmissionStatus {
    'INPROGRESS' = 1, 'COMPLETED' = 2, 'CANCELLED' = 3,
}

export enum ApplicationType {
    'ERP'= 'ERP', 'ERP_TEST_SERIES' = 'ERP_TEST_SERIES', 'TEST_SERIES' = 'TEST_SERIES'
}

export enum StudentPaymentStatus {
    'OPEN' = 1, 'CLOSE' = 2, 'PARTIAL' = 3,
}

export enum PaymentModes {
    'CASH' = 1, 'POS' = 2, 'CHEQUE' = 3, 'UPI' = 4, 'NET BANKING' = 5, 'PAYMENT GATEWAY' = 6, 'DEPOSIT' = 7,
}

export enum PaymentTxnStatus {
    'PAID' = 1, 'UNPAID' = 2,
}

export enum CommonStatus {
    'INACTIVE' = 0, 'ACTIVE' = 1, 'SUSPENDED' = 2, 'DELETED' = 3, 'CANCELLED' = 4,
}

export enum LeadType {
    'ENQUIRY' = 1, 'WALKIN' = 2, 'ENQUIRY_TO_WALKIN' = 3,
}

export enum AddressType {
    'USER' = 'USER', 'BRANCH' = 'BRANCH', 'LEAD' = 'LEAD', 'STUDENT' = 'STUDENT', 'ORGANIZATION' = 'ORGANIZATION',
    'ENQUIRY' = 'ENQUIRY',
}

export enum Role {
    'SUPER_ADMIN' = 'SUPER_ADMIN',
    'BRANCH_HEAD' = 'BRANCH_HEAD',
    'FRONT_OFFICE_EXECUTIVE' = 'FRONT_OFFICE_EXECUTIVE',
    'FINANCE_EXECUTIVE' = 'FINANCE_EXECUTIVE',
    'ACADEMIC_EXECUTIVE' = 'ACADEMIC_EXECUTIVE',
    'BACK_OFFICE_EXECUTIVE' = 'BACK_OFFICE_EXECUTIVE',
}

export enum Permissions {
    'ADD_BRANCHES' = 'ADD_BRANCHES',
    'VIEW_BRANCHES' = 'VIEW_BRANCHES',
    'UPDATE_BRANCHES' = 'UPDATE_BRANCHES',
    'ADD_COURSES' = 'ADD_COURSES',
    'VIEW_COURSES' = 'VIEW_COURSES',
    'UPDATE_COURSES' = 'UPDATE_COURSES',
    'ADD_SLOTS' = 'ADD_SLOTS',
    'VIEW_SLOTS' = 'VIEW_SLOTS',
    'UPDATE_SLOTS' = 'UPDATE_SLOTS',
    'ACTIVE/INACTIVE_SLOTS' = 'ACTIVE/INACTIVE_SLOTS',
    'ADD_BATCHES' = 'ADD_BATCHES',
    'VIEW_BATCHES' = 'VIEW_BATCHES',
    'ACTIVE/INACTIVE_BATCHES' = 'ACTIVE/INACTIVE_BATCHES',
    'ADD_USERS' = 'ADD_USERS',
    'VIEW_USERS' = 'VIEW_USERS',
    'UPDATE_USERS' = 'UPDATE_USERS',
    'ACTIVE/INACTIVE_USERS' = 'ACTIVE/INACTIVE_USERS',
    'ADD_ENQUIRIES' = 'ADD_ENQUIRIES',
    'VIEW_MY_BRANCH_ENQUIRIES' = 'VIEW_MY_BRANCH_ENQUIRIES',
    'UPDATE_ENQUIRIES' = 'UPDATE_ENQUIRIES',
    'ADD_FOLLOWUPS' = 'ADD_FOLLOWUPS',
    'SCHEDULE_FOLLOWUPS' = 'SCHEDULE_FOLLOWUPS',
    'VIEW_FOLLOWUPS' = 'VIEW_FOLLOWUPS',
    'DELETE_FOLLOWUPS' = 'DELETE_FOLLOWUPS',
    'ADD_WALKINS' = 'ADD_WALKINS',
    'VIEW_MY_WALKINS' = 'VIEW_MY_WALKINS',
    'UPDATE_WALKINS' = 'UPDATE_WALKINS',
    'SELECT_LEAD' = 'SELECT_LEAD',
    'CONVERT_TO_ADMISSION' = 'CONVERT_TO_ADMISSION',
    'VIEW_STUDENTS' = 'VIEW_STUDENTS',
    'UPDATE_STUDENT' = 'UPDATE_STUDENT',
    'UPDATE_STUDENT_COURSE_AND_PAYMENT_DETAILS' = 'UPDATE_STUDENT_COURSE_AND_PAYMENT_DETAILS',
    'CANCEL_ADMISSION' = 'CANCEL_ADMISSION',
    'VIEW_CANCEL_ADMISSIONS' = 'VIEW_CANCEL_ADMISSIONS',
    'ACTIVE/INACTIVE_COURSES' = 'ACTIVE/INACTIVE_COURSES',
    'EDIT_PROFILE' = 'EDIT_PROFILE',
    'VIEW_MY_ENQUIRIES' = 'VIEW_MY_ENQUIRIES',
    'VIEW_MY_BRANCH_WALKINS' = 'VIEW_MY_BRANCH_WALKINS',
    'VIEW_WALKINS_HISTORY' = 'VIEW_WALKINS_HISTORY',
    'DISCARD_WALKIN' = 'DISCARD_WALKIN',
    'COUNSELLING' = 'COUNSELLING',
    'UPDATE_MASTER_DATA' = 'UPDATE_MASTER_DATA',
    'ADD_MASTER_DATA' = 'ADD_MASTER_DATA',
    'VIEW_MASTER_DATA' = 'VIEW_MASTER_DATA',
}

export enum FeeBalanceComponent {
    'MATERIAL_FEE' = 'balanceMaterialFee',
    'TUITION_FEE' = 'balanceTuitionFee',
    'HOSTEL_FEE' = 'balanceHostelFee',
    'OTHER_FEE' = 'balanceOtherFee',
    'OPTIONAL_FEE' = 'balanceOptionalFee',
}

export enum FeePaidComponent {
    'MATERIAL_FEE' = 'materialFeeAmount',
    'TUITION_FEE' = 'tuitionFeeAmount',
    'HOSTEL_FEE' = 'hostelFeeAmount',
    'OTHER_FEE' = 'otherFeeAmount',
    'OPTIONAL_FEE' = 'OptionalFeeAmount',
}

export enum attachmentType {
    'USER' = 'USER', 'LEAD' = 'LEAD',
}

export enum AdmissionStatusKeyEnum {
    'INPROGRESS' = 'INPROGRESS', 'COMPLETED' = 'COMPLETED', 'CANCELLED' = 'CANCELLED',
}

export enum ApplicationTypesEnum {
    'ERP' = 'ERP',
    'TEST_SERIES' = 'TEST SERIES',
}