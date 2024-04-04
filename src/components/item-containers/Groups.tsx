import React, { FC, useContext } from "react";
import { UiContext, UiContextType } from "../../contexts/UiContext.tsx";
import "../../styles/item-list.css";
import { Group } from "../../models/domain/Group.ts";

interface Props {
  groups: Group[];
  onGroupSelect: (group: Group) => void;
}

const Groups: FC<Props> = ({ groups, onGroupSelect }) => {
  const { theme } = useContext(UiContext) as UiContextType;

  return (
    <div className={`item-list ${theme}`}>
      <h2 className="caption">Группы:</h2>
      {groups.map((group) => (
        <div
          className="item-with-border"
          onClick={() => {
            onGroupSelect(group);
          }}
          key={group.id}
        >
          <p>{group.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Groups;
