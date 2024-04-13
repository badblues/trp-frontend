import React, { useContext } from "react";
import { Team } from "../../models/domain/Team";
import "../../styles/teams.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";

interface Props {
  teams: Team[];
}

const Teams: React.FC<Props> = ({ teams }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  teams.sort((t1, t2): number => {
    return t1.id - t2.id;
  })

  return (
    <div className={`teams ${theme}`}>
      {teams.map((team) => (
        <div key={team.id} className="team">
          <p className="team-name">Бригада {team.id}:</p>
          {team.students.map((student) => (
            <p className="student-name" key={student.id}>
              {student.fullName}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Teams;
