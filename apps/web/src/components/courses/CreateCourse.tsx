"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { api } from "@frosh/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export default function CreateCourse() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  const cancelButtonRef = useRef(null);

  const createCourse = useMutation(api.courses.createCourse);

  const createUserCourse = async () => {
    if (!name || !code || !instructor || !credits || !semester || !year) {
      alert("Please fill in all fields");
      return;
    }

    await createCourse({
      name,
      code,
      instructor,
      credits: parseInt(credits),
      semester,
      year: parseInt(year),
    });
    
    // Reset form
    setName("");
    setCode("");
    setInstructor("");
    setCredits("");
    setSemester("");
    setYear("");
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={() => setOpen(true)}
          className="button text-[#EBECEF] flex gap-4 justify-center items-center text-center px-8 sm:px-16 py-2"
        >
          <Image
            src={"/images/Add.png"}
            width={40}
            height={40}
            alt="add"
            className="float-right sm:w-[40px] sm:h-[40px] w-6 h-6"
          />
          <span className="text-[17px] sm:text-3xl not-italic font-medium leading-[79%] tracking-[-0.75px]">
            {" "}
            Add Course
          </span>
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <form className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[10px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[719px]">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-8 sm:pb-4">
                    <>
                      <div className="mt-3  sm:mt-0 text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-black text-center text-xl sm:text-left sm:text-[35px] pb-6 sm:pb-8 not-italic font-semibold leading-[90.3%] tracking-[-0.875px]"
                        >
                          Add New Course
                        </Dialog.Title>
                        <div className="mt-2 space-y-3">
                          <div className="pb-2">
                            <label
                              htmlFor="name"
                              className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                            >
                              Course Name
                            </label>
                            <div className="mt-2">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g., Introduction to Computer Science"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                              />
                            </div>
                          </div>

                          <div className="pb-2">
                            <label
                              htmlFor="code"
                              className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                            >
                              Course Code
                            </label>
                            <div className="mt-2">
                              <input
                                id="code"
                                name="code"
                                type="text"
                                placeholder="e.g., CS101"
                                autoComplete="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                              />
                            </div>
                          </div>

                          <div className="pb-2">
                            <label
                              htmlFor="instructor"
                              className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                            >
                              Instructor
                            </label>
                            <div className="mt-2">
                              <input
                                id="instructor"
                                name="instructor"
                                type="text"
                                placeholder="Professor's name"
                                autoComplete="instructor"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                                className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="pb-2">
                              <label
                                htmlFor="credits"
                                className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                              >
                                Credits
                              </label>
                              <div className="mt-2">
                                <input
                                  id="credits"
                                  name="credits"
                                  type="number"
                                  placeholder="3"
                                  autoComplete="credits"
                                  value={credits}
                                  onChange={(e) => setCredits(e.target.value)}
                                  className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                                />
                              </div>
                            </div>

                            <div className="pb-2">
                              <label
                                htmlFor="year"
                                className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                              >
                                Year
                              </label>
                              <div className="mt-2">
                                <input
                                  id="year"
                                  name="year"
                                  type="number"
                                  placeholder="2024"
                                  autoComplete="year"
                                  value={year}
                                  onChange={(e) => setYear(e.target.value)}
                                  className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pb-2">
                            <label
                              htmlFor="semester"
                              className=" text-black text-[17px] sm:text-2xl not-italic font-medium leading-[90.3%] tracking-[-0.6px]"
                            >
                              Semester
                            </label>
                            <div className="mt-2">
                              <select
                                id="semester"
                                name="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] bg-white w-full py-2.5 px-[14px] text-black text-[17px] not-italic font-light leading-[90.3%] tracking-[-0.425px] sm:text-2xl"
                              >
                                <option value="">Select Semester</option>
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  <div className=" px-4 py-3 mb-5 flex justify-center items-center">
                    <button
                      type="button"
                      className="button text-white text-center text-[17px] sm:text-2xl not-italic font-semibold leading-[90.3%] tracking-[-0.6px] px-[70px] py-2"
                      onClick={createUserCourse}
                    >
                      Add Course
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </form>
        </Dialog>
      </Transition.Root>
    </>
  );
} 
