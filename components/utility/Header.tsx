import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { socialLinks } from "@/data/socials";
const socialLinks = [
  { icon: "uil-twitter", unicode: "\\ed59", color: "#5daed5", href: "#" },
  { icon: "uil-facebook-f", unicode: "\\eae2", color: "#4470cf", href: "#" },
  { icon: "uil-dribbble", unicode: "\\eaa2", color: "#e94d88", href: "#" },
  { icon: "uil-instagram", unicode: "\\eb9c", color: "#d53581", href: "#" },
  { icon: "uil-youtube", unicode: "\\edb5", color: "#c8312b", href: "#" },
];



export default function Header32({
  parentClass = "relative wrapper !bg-[#fff8ee]",
  navClass = "flex items-center justify-between w-full  flex-col bg-transparent",
}) {
  return (
    <header className={parentClass}>
      <nav className={navClass}>
        <div className="mx-auto w-full px-[15px] max-w-[1320px]  flex-col flex  items-center  flex-nowrap">
          <div className="w-full">
            <Link href={`/`}>
              <Image
                // srcSet="/assets/img/logo-dark@2x.png 2x"
                alt="image"
                src="/assets/img/logo-dark.png"
                width={134}
                height={26}
              />
            </Link>
          </div>
          <div className="w-full lg:w-auto">
            <div className="flex items-center justify-between lg:hidden p-6">
              <h3 className="text-white text-2xl mb-0">
                Sandbox
              </h3>
              <button
                type="button"
                className="text-[#343f52] transition-all duration-200 ease-in-out border-0 motion-reduce:transition-none hover:no-underline bg-inherit"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="lg:ml-auto flex flex-col h-full">
              <div className="lg:hidden">
                <div>
                  <a
                    href="mailto:first.last@email.com"
                    className="text-inherit hover:text-[#3f78e0]"
                  >
                    info@email.com
                  </a>
                  <br />
                  00 (123) 456 78 90 <br />
                  <nav className="flex mt-4">
                    {socialLinks.map((elm, i) => (
                      <a
                        key={i}
                        className="text-[#cacaca] text-base transition-all duration-200 ease-in-out hover:-translate-y-0.5 mx-[0.7rem_0_0]"
                        href={elm.href}
                      >
                        <i
                          className={`uil ${elm.icon} text-white text-base`}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex ml-auto">
            <ul className="flex flex-row items-center ml-auto">
              <li className="hidden lg:block md:block">
                <Link
                  href={`/signin`}
                  className="inline-block px-5 py-2 text-sm text-white bg-[#3f78e0] border border-[#3f78e0] rounded-full hover:translate-y-[-0.15rem] hover:shadow-lg transition-all duration-200"
                >
                  Login
                </Link>
              </li>
              <li className="hidden lg:block md:block">
                <Link
                  href={`/signup`}
                  className="inline-block px-5 py-2 text-sm text-white bg-[#3f78e0] border border-[#3f78e0] rounded-full hover:translate-y-[-0.15rem] hover:shadow-lg transition-all duration-200"
                >
                  Register
                </Link>
              </li>

              <li className="lg:hidden">
                <button className="p-2">
                  <span className="block w-6 h-0.5 bg-current mb-1"></span>
                  <span className="block w-6 h-0.5 bg-current mb-1"></span>
                  <span className="block w-6 h-0.5 bg-current"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
