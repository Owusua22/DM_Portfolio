"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type NavDropdownProps = {
  label: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/**
 * A navmenu dropdown. On desktop the submenu opens on hover (handled by CSS);
 * on mobile the chevron toggles it, which is what this state tracks.
 */
export default function NavDropdown({ label, children }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropdown">
      <Link
        href="#"
        className={open ? "active" : undefined}
        onClick={(event) => event.preventDefault()}
      >
        <span>{label}</span>{" "}
        <i
          className="bi bi-chevron-down toggle-dropdown"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen((value) => !value);
          }}
        />
      </Link>
      <ul className={open ? "dropdown-active" : undefined}>{children}</ul>
    </li>
  );
}
