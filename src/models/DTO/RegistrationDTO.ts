export interface UserRegistrationDTO {
  id: number | null;
  username: string;
  fullName: string;
  password: string;
}

export interface TeacherRegistrationDTO extends UserRegistrationDTO {
}

export interface StudentRegistrationDTO extends UserRegistrationDTO {
  groupId: number;
}

export interface AdminRegistrationDTO extends UserRegistrationDTO {}
