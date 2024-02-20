"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { doc, getFirestore, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useSession, signIn, signOut } from "next-auth/react";
import app from './../Shared/firebaseConfig';
import { HiSearch, HiBell, HiChat, HiMoon } from "react-icons/hi";
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    saveUserInfo();
    // Fetch initial search results when component mounts
    fetchSearchResults();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Fetch updated search results as the user types
    fetchSearchResults();
  };

  const fetchSearchResults = async () => {
    if (searchQuery.trim() !== "") {
      const q = query(collection(db, "userID"), where("userName", "==", searchQuery));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  

  return(
    <div className='flex justify-between gap-3 md:gap-2 items-center p-6'>
       <Image src='/logo.png' alt='logo'
       width={60} height={60}
       onClick={()=>router.push('/')}
       className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'/>
       <button className='bg-black
         text-white p-3 px-6 rounded-full
         text-[25px]
          hidden md:block'onClick={()=> router.push('/')}>
        Home
       </button>
       <button className='font-semibold p-3 px-6
         rounded-full text-[25px] hidden md:block'onClick={()=>router.push('/pin-builder')}>
          Create
       </button>
       <div className='bg-[#e9e9e9] p-3 px-6 gap-3 items-center rounded-full w-full hidden md:flex'>
       <HiSearch className='text-[34px] text-gray-500' />
        <input
          type="text"
          placeholder='Search'
          value={searchQuery}
          onChange={handleSearchInputChange}
          className='bg-transparent outline-none w-full text-25[px]'
        />
       </div>
       <HiSearch className='text-[25px] text-gray-500 md:hidden'/>
      <HiBell className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer'/>
       <HiChat className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer'/>
       {session?.user?
      <>
      <Image src={session?.user?.image} 
       onClick={()=>router.push('/' + session.user.email)}
      alt='user-image' width={60} height={60}
        className='hover:bg-gray-300 p-2
        rounded-full cursor-pointer'/>
<button className='rounded-full hover:bg-slate-300 cursor-pointer text-[25px] md:text-[40px]'>
   <HiMoon /> 
       </button>
      </>
       :
       <button className='font-semibold p-3 px-6 rounded-full text-[25px]'onClick={() => signIn()}>
          Login
       </button>}
    </div>
    
  )
}

export default Header