"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Signin() {
  const [showPass, setShowPass] = useState(false);
  return (
    <section className="wrapper bg-light !bg-[#ffffff]">
      <div className="container !pb-[4.5rem] xl:!pb-24 lg:!pb-24 md:!pb-24">
        <div className="flex flex-wrap mx-[-15px]">
          <div className="lg:w-7/12 xl:w-6/12 xxl:w-5/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto !mt-[-10rem]">
            <div className="card">
              <div className="card-body !p-12 !text-center">
                <h2 className="!mb-3 text-left">Welcome Back</h2>
                <p className="lead text-[0.9rem] font-medium !leading-[1.65] !mb-6 text-left">
                  Fill your email and password to sign in.
                </p>
                <form
                  className="text-left !mb-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-floating !relative !mb-4">
                    <input
                      id="loginEmail"
                      type="email"
                      name="email"
                      className="form-control relative block w-full text-[.75rem] font-medium !text-[#60697b] bg-[#fefefe] bg-clip-padding border shadow-[0_0_1.25rem_rgba(30,34,40,0.04)] rounded-[0.4rem] border-solid border-[rgba(8,60,130,0.07)] transition-[border-color] duration-[0.15s] ease-in-out focus:shadow-[0_0_1.25rem_rgba(30,34,40,0.04),unset] focus-visible:!border-[rgba(63,120,224,0.5)] placeholder:!text-[#959ca9] placeholder:opacity-100 m-0 !pr-9 p-[.6rem_1rem] h-[calc(2.5rem_+_2px)] min-h-[calc(2.5rem_+_2px)] !leading-[1.25]"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="loginEmail"
                      className="!text-[#959ca9] !mb-2 !inline-block text-[.75rem] !absolute !z-[2] h-full overflow-hidden text-start text-ellipsis whitespace-nowrap pointer-events-none border origin-[0_0] px-4 py-[0.6rem] border-solid border-transparent left-0 top-0 font-Manrope"
                    >
                      Email
                    </label>
                  </div>
                  <div className="form-floating !relative password-field !mb-4">
                    <input
                      id="loginPassword"
                      type={showPass ? "text" : "password"}
                      className="form-control relative block w-full text-[.75rem] font-medium !text-[#60697b] bg-[#fefefe] bg-clip-padding border shadow-[0_0_1.25rem_rgba(30,34,40,0.04)] rounded-[0.4rem] border-solid border-[rgba(8,60,130,0.07)] transition-[border-color] duration-[0.15s] ease-in-out focus:shadow-[0_0_1.25rem_rgba(30,34,40,0.04),unset] focus-visible:!border-[rgba(63,120,224,0.5)] placeholder:!text-[#959ca9] placeholder:opacity-100 m-0 !pr-9 p-[.6rem_1rem] h-[calc(2.5rem_+_2px)] min-h-[calc(2.5rem_+_2px)] !leading-[1.25]"
                      placeholder=""
                      required
                    />
                    <span
                      className="password-toggle absolute -translate-y-2/4 cursor-pointer text-[0.9rem] !text-[#959ca9] right-3 top-2/4"
                      onClick={() => setShowPass((pre) => !pre)}
                    >
                      <i className={`uil uil-eye${showPass ? "-slash" : ""}`} />
                    </span>
                    <label
                      htmlFor="loginPassword"
                      className="!text-[#959ca9] !mb-2 !inline-block text-[.75rem] !absolute !z-[2] h-full overflow-hidden text-start text-ellipsis whitespace-nowrap pointer-events-none border origin-[0_0] px-4 py-[0.6rem] border-solid border-transparent left-0 top-0 font-Manrope"
                    >
                      Password
                    </label>
                  </div>
                  <a className="btn btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] !rounded-[50rem] btn-login w-full !mb-2">
                    Sign In
                  </a>
                </form>
                {/* /form */}
                <p className="!mb-1">
                  <a href="#" className="hover">
                    Forgot Password?
                  </a>
                </p>
                <p className="!mb-0">
                  Don't have an account?
                  <Link href={`/signup`} className="hover">
                    Sign up
                  </Link>
                </p>
                <div className="divider-icon !my-4">or</div>
                <nav className="nav social justify-center !text-center">
                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-google hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)] !text-white !bg-[#e44134] !w-[1.8rem] !h-[1.8rem] !text-[0.8rem] !inline-flex !items-center !justify-center !leading-none !mx-[0.35rem] !my-0 !p-0 !rounded-[100%] !border-transparent"
                  >
                    <i className="uil uil-google text-[0.85rem] before:content-['\eb50']" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-facebook-f hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)] !text-white !bg-[#4470cf] !w-[1.8rem] !h-[1.8rem] !text-[0.8rem] !inline-flex !items-center !justify-center !leading-none !mx-[0.35rem] !my-0 !p-0 !rounded-[100%] !border-transparent"
                  >
                    <i className="uil uil-facebook-f text-[0.85rem] before:content-['\eae2']" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-twitter hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)] !text-white !bg-[#5daed5] !w-[1.8rem] !h-[1.8rem] !text-[0.8rem] !inline-flex !items-center !justify-center !leading-none !mx-[0.35rem] !my-0 !p-0 !rounded-[100%] !border-transparent"
                  >
                    <i className="uil uil-twitter text-[0.85rem] before:content-['\ed59']" />
                  </a>
                </nav>
                {/*/.social */}
              </div>
              {/*/.card-body */}
            </div>
            {/*/.card */}
          </div>
          {/* /column */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container */}
    </section>
  );
}
