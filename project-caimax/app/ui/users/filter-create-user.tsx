'use client';
import { Button } from '@nextui-org/react';
import Search from '@/app/ui/search';
import { useState } from 'react';
import { UsersTableComponent } from './table';
import { CreateUserForm } from './create-form';
import { motion, AnimatePresence } from 'framer-motion';

const FilterCreateUser = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const [activeForm, setActiveForm] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Search placeholder="Buscar usuarios" />
        <div className="mb-2 md:m-0">
          <Button
            color="success"
            onClick={() => {
              setActiveForm(!activeForm);
            }}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            }
          >
            Nuevo usuario
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {activeForm && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <CreateUserForm
              setActiveForm={setActiveForm}
              searchParams={searchParams}
            />
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative mt-3 overflow-x-auto overflow-y-hidden shadow-xl sm:rounded-lg">
        <UsersTableComponent searchParams={searchParams} />
      </div>
    </>
  );
};

export default FilterCreateUser;
