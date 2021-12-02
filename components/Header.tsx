import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
  const [session] = useSession();

  let button;

  if (session) {
    console.log(session)
    button = <button className="underline" onClick={() => signOut()}>Logout</button>;
  } else {
    button = <button className="underline" onClick={()=> signIn()}>Login</button>;
  }

  let left = (
    <div className="m-5">
       {button} 
    </div>
  );

  let right = (session &&   
    <div className="m-5">
      <img 
        className="object-center object-cover rounded-full h-16 w-16" 
        src={session.user.image} alt="photo" />
      <p className="text-base text-gray-400 font-normal pt-2">{session.user.name}</p>
      <p className="text-base text-gray-400 font-normal">{session.user.email}</p>
      
    </div>);

  return (
    <nav className="flex flex-row justify-between items-start  w-full">
      {right}
      {left}
    </nav>
  );
};

export default Header;
