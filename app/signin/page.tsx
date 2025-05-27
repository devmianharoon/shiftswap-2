// import Footer5 from "@/components/footers/Footer5";
import Header from "@/components/utility/Header";
import Footer from "@/components/utility/footer";
import Signin from "@/components/utility/Signin";
export const metadata = {
  title:
    "Signin || Sandbox - Modern & Multipurpose React Next.js Template with Tailwind CSS",
  description:
    "Sandbox - Modern & Multipurpose React Next.js Template with Tailwind CSS",
};
export default function Page() {
  return (
    <>
      <div className="grow shrink-0">
        <Header
          parentClass="relative wrapper bg-soft-primary !bg-[#edf2fc]"
          navClass="navbar navbar-expand-lg center-nav transparent position-absolute navbar-light xl:pt-[6px] lg:pt-[6px]"
        />
        <section
          className="wrapper image-wrapper bg-image bg-overlay bg-overlay-light-600 !text-white !bg-fixed bg-no-repeat bg-[center_center] bg-cover relative z-0 before:content-[''] before:block before:absolute before:z-[1] before:w-full before:h-full before:left-0 before:top-0 before:bg-[rgba(255,255,255,.6)]"
          style={{ backgroundImage: "url(/assets/img/photos/bg18.png)" }}
        >
          <div className="container pt-28 pb-40 xl:pt-36 lg:pt-36 md:pt-36 xl:pb-[12.5rem] lg:pb-[12.5rem] md:pb-[12.5rem] !text-center">
            <div className="flex flex-wrap mx-[-15px]">
              <div className="xl:w-8/12 lg:w-8/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto">
                <h1 className="!text-[calc(1.365rem_+_1.38vw)] font-bold !leading-[1.2] xl:!text-[2.4rem] !mb-3">
                  Sign In
                </h1>
                <nav className="inline-block" aria-label="breadcrumb">
                  <ol className="breadcrumb flex flex-wrap bg-[none] !mb-4 p-0 !rounded-none list-none">
                    <li className="breadcrumb-item flex !text-[#60697b]">
                      <a
                        className="!text-[#60697b] hover:!text-[#3f78e0]"
                        href="#"
                      >
                        Home
                      </a>
                    </li>
                    <li
                      className="breadcrumb-item active flex !text-[#60697b] !pl-2 before:font-normal before:!flex before:items-center before:text-[rgba(96,105,123,0.35)] before:content-['\e931'] before:text-[0.9rem] before:-mt-px before:!pr-2 before:font-Unicons"
                      aria-current="page"
                    >
                      Sign In
                    </li>
                  </ol>
                </nav>
                {/* /nav */}
              </div>
              {/* /column */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </section>
        <Signin />
      </div>
      <Footer hasMarginTop={false} />
    </>
  );
}
