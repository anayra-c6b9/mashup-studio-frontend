import React, { FC, ReactNode, useState, useRef, MouseEvent } from "react";
import catPaw from "../../assets/paw.png";
import catHead from "../../assets/logo_head.png";
import LinkButton from "../LinkButton/LinkButton";
import { LinkButtonInterface } from "../../interface/linkButton";
import { NavLink } from "react-router";

interface CatCardContainerProps {}

const CatCardContainer: FC<CatCardContainerProps> = () => {
  const [pawY, setPawY] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const optionTop = e.currentTarget.getBoundingClientRect().top;

    const relativeY = optionTop - containerTop - 50;
    setPawY(relativeY);
  };

  const options: Array<LinkButtonInterface> = [
    {
      href: "/room/324122",
      label: "Create Jam Room",
      id: "option1",
      classes: "",
      key: 1,
      onMouseEnter: handleHover,
      onClick: () => {},
    },
    {
      href: "#",
      label: "Join Jam Room",
      id: "option2",
      classes: "",
      key: 2,
      onMouseEnter: handleHover,
      onClick: () => {},
    },
    // {
    //   href: "#",
    //   label: "Option 3",
    //   id: "option3",
    //   classes: "",
    //   key: 3,
    //   onMouseEnter: handleHover,
    //   onClick: handleHover,
    // },
  ];

  return (
    <div
      className={
        "bg-white relative w-10/12 mx-auto border-4 border-black border-solid py-4 pt-12 flex flex-col gap-3 items-center"
      }
      ref={containerRef}
    >
      <img
        src={catPaw}
        alt="Cat Paw"
        className="absolute left-[-35px] w-14 transition-transform duration-200"
        style={{ transform: `translateY(${pawY}px)` }}
      />
      <img
        src={catHead}
        alt="Cat Head"
        className="absolute top-[-60px] left-4 w-24 z-[-1]"
      />
      <div className=" flex flex-col gap-2 items-start">
        {options.map((opt) => (
          <LinkButton
            id={opt.id}
            classes={"py-2 text-left font-jack text-xs"}
            key={opt.key}
            label={opt.label}
            onMouseEnter={opt.onMouseEnter}
            onClick={opt.onClick}
            href={opt.href}
          />
        ))}
      </div>
      <div className="text-[8px] underline underline-offset-4 pt-10 font-jack">
        <NavLink to="/about">About our stray cats!</NavLink>
      </div>
    </div>
  );
};

export default CatCardContainer;
