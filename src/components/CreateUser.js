import React from "react";
import { useForm } from "react-hook-form";

const CreateUser = (props) => {

  const { register, handleSubmit, watch } = useForm();
  const selectedChoice = watch('choice');

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="choice">Select a choice:</label>
        <select {...register('choice')}>
          <option value="choice1">Choice 1</option>
          <option value="choice2">Choice 2</option>
          <option value="choice3">Choice 3</option>
        </select>
      </div>

      {selectedChoice === 'choice1' && (
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" {...register('username')} />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password')} />
        </div>
      )}

      {selectedChoice === 'choice2' && (
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" {...register('fullName')} />
        </div>
      )}

      {selectedChoice === 'choice3' && (
        <div>
          <label htmlFor="number">Number:</label>
          <input type="number" {...register('number')} />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );

  // const form = useForm();
  // const { register, handleSubmit, formState } = form;
  // const { errors } = formState;
  // const authService = props;

  // const onSubmit = (data) => {
  //   authService.createUser(data);
  // };

  // return (
  //   <>
  //     <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //       <div className="form-container">
  //         <p>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           placeholder="Username..."
  //           {...register("username", {
  //             required: "Необходимо ввести имя пользователя",
  //           })}
  //         />
  //         <p className="form-text">{errors.username?.message}</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           placeholder="Full name..."
  //           {...register("fullName", {
  //             required: "Необходимо ввести ФИО пользователя",
  //           })}
  //         />
  //         <p className="form-text">{errors.fullName?.message}</p>
  //         <input
  //           className="form-input"
  //           type="text"
  //           {...register("password", {
  //             required: "Необходимо ввести пароль",
  //           })}
  //           placeholder="Password..."
  //         />
  //         <p className="form-text">{errors.password?.message}</p>
  //         <button className="button form-button">СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</button>
  //         <img src="images/logo.png" alt="logo" width="100px" />
  //       </div>
  //     </form>
  //   </>
  // );
};

export default CreateUser;
