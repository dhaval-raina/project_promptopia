"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { usePathname } from 'next/navigation';
const Nav = () => {
    const pathName = usePathname();
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };
    return (
        <nav className='flex flex-between w-full md-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image alt='logo' src="/assets/images/logo.svg" width={32} height={32} className='object-contain'></Image>
                <p className='logo_text'>Promptopia</p>
            </Link>
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' className='outline_btn' onClick={handleSignOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src={session?.user?.image} width={37} height={37} className='rounded-fill' alt='profile' />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* {providers && Object.values(providers).map((provider) => (
                            <button type="button" className="black_btn" onClick={() => signIn(provider.id)}>
                                Sign In
                            </button>
                        ))} */}
                        {pathName !== '/login' && (
                            <Link className='black_btn' href="/login">Sign In</Link>
                        )}
                    </>
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image src={session?.user?.image} width={37} height={37} className='rounded-fill' alt='profile' onClick={() =>
                            setToggleDropdown((prev) => !prev)
                        } />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button className='black_btn w-full mt-3' onClick={() => {
                                    setToggleDropdown(false);
                                    handleSignOut();
                                }}>Sign Out</button>
                            </div>
                        )}
                    </div>

                ) : (
                    <>
                        {/* {providers && Object.values(providers).map((provider) => (
                            <button type="button" className="black_btn" onClick={() => signIn(provider.id)}>
                                Sign In
                            </button>
                        ))} */}
                        {pathName !== '/login' && (
                            <Link className='black_btn' href="/login">Sign In</Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
