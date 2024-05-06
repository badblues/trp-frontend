const domainUrl = `http://${process.env.REACT_APP_SERVER_IP}:8080`;

const urls = {
  disciplinesUrl: domainUrl + "/api/v2/disciplines",
  groupsUrl: domainUrl + "/api/v2/groups",
  labWorksUrl: domainUrl + "/api/v2/lab-works",
  labWorkVariantsUrl: domainUrl + "/api/v2/lab-work-variants",
  labWorkVariantTestsUrl: domainUrl + "/api/v2/lab-work-variant-tests",
  codeReviewUrl: domainUrl + "/api/v2/code-reviews",
  teamsUrl: domainUrl + "/api/v2/teams",
  teamAppointmentsUrl: domainUrl + "/api/v2/team-appointments",
  teacherAppointmentsUrl: domainUrl + "/api/v2/teacher-appointments",
  studentsUrl: domainUrl + "/api/v2/students",
  teachersUrls: domainUrl + "/api/v2/teachers",
  adminUrl: domainUrl + "/admin",
  authUrl: domainUrl + "/auth",
};

export default urls;
