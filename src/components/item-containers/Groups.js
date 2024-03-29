import React, { useContext } from "react";
import { UiContext } from "../../contexts/UiContext";
import "../../styles/item-list.css";

const Groups = ({ groups, onGroupSelect }) => {
  const { theme } = useContext(UiContext);

  return (
    <>
      <div className={`item-list ${theme}`}>
        <h2 className="caption">
          Группы:
        </h2>
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
    </>
  );
};

export default Groups;
