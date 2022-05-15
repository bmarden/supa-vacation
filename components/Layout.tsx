/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Fragment, useState, useEffect, SVGProps, forwardRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import NextLink from './NextLink';
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useUser } from '@auth0/nextjs-auth0';

type MenuItemType = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
};

const menuItems: MenuItemType[] = [
  {
    label: 'List a new home',
    icon: PlusIcon,
    href: '/list'
  },
  {
    label: 'My homes',
    icon: HomeIcon,
    href: '/homes'
  },
  {
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites'
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    href: '/api/auth/logout'
  }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLoadingUser = status === 'loading';

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user != null) {
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>SupaVacation | The Modern Dev</title>
        <meta
          name="title"
          content="Learn how to Build a Fullstack App with Next.js, PlanetScale & Prisma | The Modern Dev"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="h-16 w-full shadow-md">
          <div className="h-full container mx-auto">
            <div className="h-full px-4 flex justify-between items-center space-x-4">
              <Link href="/" passHref>
                <a className="flex items-center space-x-1">
                  <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                  <span className="text-xl font-semibold tracking-wide">
                    Supa<span className="text-rose-600">Vacation</span>
                  </span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/create">
                  <a className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                    List your home
                  </a>
                </Link>
                {isLoading ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        {user?.picture ? (
                          <Image src={user?.picture} alt={user?.name || 'Avatar'} layout="fill" />
                        ) : (
                          <UserIcon className="text-gray-400 w-6 h-6" />
                        )}
                      </div>
                      <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                          <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                            {user?.picture ? (
                              <Image
                                src={user?.picture}
                                alt={user?.name || 'Avatar'}
                                layout="fill"
                              />
                            ) : (
                              <UserIcon className="text-gray-400 w-6 h-6" />
                            )}
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">{user?.email}</span>
                          </div>
                        </div>

                        <div className="py-2">
                          {menuItems.map(({ label, href, icon: Icon }) => (
                            <div key={label} className="px-2 last:border-t last:pt-2 last:mt-2">
                              <Menu.Item>
                                <NextLink
                                  href={href}
                                  className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                >
                                  <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                  <span>{label}</span>
                                </NextLink>
                              </Menu.Item>
                            </div>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link href="/api/auth/login">
                    <a className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition">
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto">
          <div className="px-4 py-12">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
