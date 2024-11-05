import React from "react";
import Logo from "@components/Logo";
import config from "@config/config.json";
import Link from "next/link";

const Header = () => {
  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  return (
    <header className="header bg-theme-light shadow-lg">
      <nav className="navbar container">
        {/* logo */}
        <Link href={"/"}>
          <div className="order-0 flex items-center">
            <Logo src={logo} />
            <div>
              <h2 className="text-primary drop-shadow-xl ">Study Timer</h2>
              <p className="italic mt-[-4px] ml-1 text-[14px] font-mono">Keep focused.</p>
            </div>
          </div>
        </Link>

        {enable && (
          <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:order-2 md:ml-0 md:flex">
            <Link className="btn btn-primary z-0 py-[14px]" href={link} rel="">
              {label}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
