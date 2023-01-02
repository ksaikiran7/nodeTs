export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_BRANCH_TYPE = 'BRANCH';
export const DEFAULT_USER_TYPE = 'USER';
export const DEFAULT_LOGIN_AUTH_TYPE = 'LOGIN';
export const DEFAULT_FORGET_PASSWORD_TYPE = 'RESET_PASSWORD';
export const DEFAULT_OTP_EXPIRY_TIME = 600;
export const DEFAULT_OTP = 1234;
export const DEFAULT_LOGIN_TOKEN_EXPIRY_TIME = 24 * 60 * 60;
export const DEFAULT_REFRESH_TOKEN_EXPIRY_TIME = 30 * 24 * 60 * 60;
export const DEFAULT_RESEND_OTP_COUNT = 3;
export const DEFAULT_USER_ID_LENGTH = 7;
export const DEFAULT_JOINING_TYPE = 'LATER';
export const ENQUIRY_TO_WALK_IN_TYPE = `ENQUIRY_TO_WALK_IN`;
export const DEFAULT_SORT_FIELD = 'created_date';
export const DEFAULT_SORT_ORDER = 'desc';
export const DEFAULT_STATUS = 'ACTIVE';
export const DEFAULT_BASE_PROFILE_IMAGE_PATH = '/public';
export const DEFAULT_TAX_PERCENTAGE = 35;
export const DEFAULT_CONCESSION_PERCENTAGE = 60;
export const MASTER_MODULE = [{
    module: 'Home',
    route: '/home',
    childModules: [ {
            name: 'Student Dashboard',
            route: '/home/studentDashboard',
            order: 1,
        },
        {
            name: 'Finance Dashboard',
            route: '/home/financeDashboard',
            order: 2,
        }
    ],
    order: 1,
}, {
    module: 'Admissions',
    route: '/students',
    childModules: [
        {
            name: 'Admissions',
            route: '/students/admissions',
            order: 1,
        },
        {
            name: 'Cancel Admissions',
            route: '/students/cancel admission',
            order: 2,
        },
    ],
    order: 2,
}, {
    module: 'Leads',
    route: '/leads',
    childModules: [
        {
            name: 'Phone Enquiries',
            route: '/leads/phone enquiries',
            order: 1,
        },
        {
            name: 'Walkins',
            route: '/leads/walk-Ins',
            order: 2,
        },
    ],
    order: 3,
}, {
    module: 'User Management',
    route: '/user-management',
    childModules: [
        {
            name: 'Roles',
            route: '/user-management/roles',
            order: 1,
        },
        {
            name: 'Users',
            route: '/user-management/users',
            order: 2,
        },
    ],
    order: 4,
}, {
    module: 'Configuration',
    route: '/config',
    childModules: [
        {
            name: 'Master Data',
            route: '/config/master data/course categories',
            order: 1,
        },
        {
            name: 'Organizations',
            route: '/config/organizations',
            order: 2,
        },
        {
            name: 'Branches',
            route: '/config/branches',
            order: 3,
        },
        {
            name: 'Courses',
            route: '/config/courses',
            order: 4,
        },
        {
            name: 'Slots',
            route: '/config/slots',
            order: 5,
        },
        {
            name: 'Batches',
            route: '/config/batches',
            order: 6,
        },
    ],
    order: 5,
}, {
    module: 'User Logs',
    route: '/logs',
    childModules: [],
    order: 6,
}];

export const TEST_SERIES_MASTER_MODULE = [{
    module: 'Test Series',
    route: 'testSeries',
    childModules: [{
        name: 'Add Test Series',
        route: '/testSeries',
        order: 1,
    },
        {
            name: 'View Test Series',
            route: '/testSeries',
            order: 2,
        },
        {
            name: 'Update Test Series',
            route: '/testSeries',
            order: 3,
        },
        {
            name: 'Publish Test Series',
            route: '/testSeries',
            order: 4,
        },
        {
            name: 'Add Test',
            route: '/testSeries/tests',
            order: 5,
        },
        {
            name: 'View Test',
            route: '/testSeries/tests',
            order: 6,
        },
        {
            name: 'Update Test',
            route: '/testSeries/tests',
            order: 7,
        },
        {
            name: 'Offline Result Upload',
            route: '/test/offlineResult',
            order: 8,
        },
        {
            name: 'View Offline Result',
            route: '/test/offlineResult',
            order: 9,
        },
        {
            name: 'Test File Download',
            route: '/tests',
            order: 10,
        },
    ],
    order: 1,
}, {
    module: 'Scholarship',
    route: 'scholarship',
    childModules: [{
        name: 'Add Scholarship',
        route: '/scholarship',
        order: 1,
    },
        {
            name: 'View Scholarship',
            route: '/scholarship',
            order: 2,
        },
        {
            name: 'Update Scholarship',
            route: '/scholarship',
            order: 3,
        },
        {
            name: 'Publish Scholarship',
            route: '/scholarship',
            order: 4,
        },
        {
            name: 'View Scholarship Attempts',
            route: '/scholarship',
            order: 5,
        },
    ],
    order: 2,
}, {
    module: 'Open Tests',
    route: 'openTests',
    childModules: [{
        name: 'Add Open Test Details',
        route: '/openTests',
        order: 1,
    },
        {
            name: 'View Open Test Details',
            route: '/openTests',
            order: 2,
        },
        {
            name: 'Update Open Test Details',
            route: '/openTests',
            order: 3,
        },
        {
            name: 'Publish Open Tests',
            route: '/openTests',
            order: 4,
        },
        {
            name: 'Add Test(Open Test)',
            route: '/openTests/tests',
            order: 5,
        },
        {
            name: 'View Test(Open Test)',
            route: '/openTests/tests',
            order: 6,
        },
        {
            name: 'Update Test(Open Test)',
            route: '/openTests/tests',
            order: 7,
        },
        {
            name: 'Offline Result Upload(Open Test)',
            route: '/openTests/test/offlineResult',
            order: 8,
        },
        {
            name: 'View Offline Result(Open Test)',
            route: '/test/offlineResult',
            order: 9,
        },
        {
            name: 'Test File Download(Open Test)',
            route: '/openTests/tests',
            order: 10,
        },
        {
            name: 'View Open Test Attempts',
            route: '/openTests/tests',
            order: 11,
        },
    ],
    order: 3,
}, {
    module: 'Student',
    route: 'students',
    childModules: [{
        name: 'Add Scholarship',
        route: '/scholarship',
        order: 1,
    },
        {
            name: 'View Student Details',
            route: '/students',
            order: 2,
        },
        {
            name: 'View Student Purchase Details',
            route: '/students',
            order: 3,
        },
    ],
    order: 4,
},  {
        module: 'Configuration',
        route: 'configuration',
        childModules: [{
            name: 'Master Data',
            route: '/masterData',
            order: 1,
        },
            {
                name: 'Test Centers',
                route: '/testCenters',
                order: 2,
            },
            {
                name: 'Test Center Requests',
                route: '/testCenterRequests',
                order: 3,
            },
            {
                name: 'Fee Concessions',
                route: '/feeConcessions',
                order: 4,
            }],
        order: 5,
    }];
