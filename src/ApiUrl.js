// const baseUrl='http://192.168.0.112:8001/'
// const baseUrl='http://127.0.0.1:8000/'
const baseUrl='http://192.168.0.121:8001/'
const ApiUrl={
    BaseUrl:`${baseUrl}`,
    LoginUrl: `${baseUrl}login/`,
    ProfileUrl:`${baseUrl}profile/`,
    AttendUrl:`${baseUrl}attendance/`,
    ClockIn:`${baseUrl}clockin/`,
    ClockOut:`${baseUrl}clockout/`,
    GetEmployees:`${baseUrl}get-employees/`,
    GetEmployee:`${baseUrl}get-employee/`,
    GetInfo:`${baseUrl}get-info/`,
    Invoice:`${baseUrl}invoice-generator/`,
    getStudentInfo:'https://arenawebsecurity.net/admission-api/V5n9e9FXU8kZ/',
    getStudentInfoPdf:`${baseUrl}invoice-generator-student/`,
    Type:`${baseUrl}get-aws`
}

export default ApiUrl;
