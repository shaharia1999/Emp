const baseUrl='http://192.168.0.121:8001/'
// const baseUrl='http://127.0.0.1:8000/'
const ApiUrl={
    LoginUrl: `${baseUrl}login/`,
    ProfileUrl:`${baseUrl}profile/`,
    AttendUrl:`${baseUrl}attendance/`,
    ClockIn:`${baseUrl}clockin/`,
    ClockOut:`${baseUrl}clockout/`,
    GetEmployees:`${baseUrl}get-employees/`,
    GetEmployee:`${baseUrl}get-employee/`,
    GetInfo:`${baseUrl}get-info/`,
}

export default ApiUrl;
