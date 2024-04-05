import React, { useContext } from "react";
import { Team } from "../../models/domain/Team";
import "../../styles/item-list.css";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";

interface Props {
  teams: Team[];
}

const Teams: React.FC<Props> = ({ teams }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`item-list ${theme}`}>
      {teams.map((team) => (
        <div key={team.id} className="item">
          <p>Бригада {team.id}:</p>
          {team.students.map((student) => (
            <p key={student.id}>{student.fullName}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Teams;
