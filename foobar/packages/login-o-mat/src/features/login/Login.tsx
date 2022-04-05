
import React, { ChangeEvent, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { UserFormValues } from "../../app/models/user";

export default function Login() {
   const [user, setUser] = useState<UserFormValues>(getUser());

   useEffect(() => {

   }, []);

   function getUser() {
      return {
         email: "",
         password: "",
         displayName: "",
         username: "",
      }
   }

   function handleSubmit() {
      agent.Account.login(user)
   }

   function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const name = e.target.name;
      const value = e.target.value;
      setUser(values => ({ ...values, [name]: value }));
   }

   return (
      <>
         <h1>Login</h1>
         {/* <input type="text" name="username" value={user.username} onChange={handleInputChange} placeholder="Benutzername" /> */}
         <input type="email" name="email" value={user.email} onChange={handleInputChange} placeholder="Email" />
         <input type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="Passwort" />
         <button type="submit" onClick={() => handleSubmit()}>Login</button>
      </>
   );
}