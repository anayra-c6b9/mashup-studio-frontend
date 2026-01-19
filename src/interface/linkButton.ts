import { MouseEvent } from "react";

export interface LinkButtonInterface {
  href: string;
  label: string;
  id: string;
  classes: string;
  key: number;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}
