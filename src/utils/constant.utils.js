module.exports = {

    ENVIRONMENT: {
        DEVELOPMENT: 'development',
        PRODUCTION: 'production',
        TEST: 'test'
    },

    FILE_SIZE_LIMIT: {
        //5000000 means 5mb
        IMAGE: 5000000,
        PDF: 5000000,
    },

    PER_PAGE_LIMIT: 10,

    RESUME_STATUS: {
        APPROVED: 'approved',
        CREATED: 'created',
        FAILED: 'failed',
        PENDING: 'pending',
        REJECTED: 'rejected'
    },

    STATUS_CODES : {
        ACCESS_DENIED: 401,
        BAD_REQUEST: 400,
        INTERNAL_SERVER_ERROR: 500,
        OK: 200
    },

    URI_PREFIX : {
        development: "",
        test: "",
        production: "/resume-evaluator-ai"
    },

    USER_STATUS: {
        ACTIVE: 'Active',
        BLOCKED: 'Blocked',
        DELETED: 'Deleted'
    },
}