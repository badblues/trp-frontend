import http from "axios";

export default class StudentApiService {
  apiUrl = "http://212.20.47.147:8080/api/v2/students";

  async getStudents() {
    let url = this.apiUrl;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getStudent(id) {
    let url = this.apiUrl + `/${id}`;
    try {
      const response = await http.get(url);
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getStudentsByGroup(groupId) {
    const students = await this.getStudents();
    return students.filter((s) => (s.group.id = groupId));
  }

  async getStudentsWithTasksByGroup(groupId, tasks, studentAppointments) {
    const students = await this.getStudentsByGroup(groupId);

    return students.map((student) => {
      const updatedTasks = tasks.map((task) => {
        const isAppointed = studentAppointments.some(
          (a) => a.studentId === student.id && a.taskId === task.id
        );
        const appointment = isAppointed
          ? studentAppointments.find(
              (a) => a.studentId === student.id && a.taskId === task.id
            )
          : null;

        return {
          ...task,
          appointed: isAppointed,
          appointment: appointment,
        };
      });

      return { ...student, tasks: updatedTasks };
    });
  }
}
