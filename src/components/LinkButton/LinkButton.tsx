import React, { FC, MouseEvent } from "react";
import { NavLink } from "react-router";

interface LinkButtonProps {
  href: string;
  label: string;
  id: string;
  classes: string;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const LinkButton: FC<LinkButtonProps> = ({
  href,
  label,
  id,
  classes,
  onMouseEnter,
  onClick,
}) => (
  <NavLink
    to={href}
    className={`${classes}`}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    id={id}
  >
    {label}
  </NavLink>
);

export default LinkButton;
