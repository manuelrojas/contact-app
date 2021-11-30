import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from 'next-auth/client';

import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  let button;

  if (session) {
    console.log(session)
    button = <button className="btn btn-secondary" onClick={() => signOut()}>Logout</button>;
  } else {
    button = <button className="btn btn-primary" onClick={()=> signIn()}>Login</button>;
  }

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
       {button} 
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = (session && <div>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <Image
        src={session.user.image}
        alt="Picture of the author"
        width={30}
        height={30}
      />
    </div>);

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
