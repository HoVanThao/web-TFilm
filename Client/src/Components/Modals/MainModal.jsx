import { Dialog, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

const MainModal = ({ modalOpen, setModalOpen, children }) => {
    const cancelButtonRef = useRef();
    return (
        <>
            <Transition show={modalOpen} as={Fragment} appear>
                <Dialog as='div' className='fixed inset-0 z-30 overflow-y-auto text-center' initialFocus={cancelButtonRef} onClose={() => setModalOpen(false)}>
                    <div className='min-h-screen px-4'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0'
                        >
                            <DialogBackdrop className="fixed inset-0 bg-black opacity-60" />
                        </TransitionChild>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <div className="inline-block relative transform sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
                                <div className="absolute right-1 top-1">
                                    <button
                                        ref={cancelButtonRef}
                                        onClick={() => setModalOpen(false)}
                                        type="button"
                                        className="transitions w-10 h-10 flex-colo text-base text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                                {children}
                            </div>
                        </TransitionChild>

                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MainModal;