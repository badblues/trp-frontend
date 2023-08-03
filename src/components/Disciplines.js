import React from 'react'

const Disciplines = (props) => {

  const { disciplines } = props;

  return (
    <>
      Disciplines:
      <ul>
        {disciplines.map((discipline) => (
          <li key={discipline.id}>
             {discipline.name},
             {discipline.year},
             {discipline.halfYear}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Disciplines