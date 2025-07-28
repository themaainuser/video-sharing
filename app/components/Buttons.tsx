import { IconName, SvgIcon } from './SvgIcon';

type ComponentType = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

type SVGProps = {
  ariaLabel: string;
  width: number;
  height: number;
  xmlns: string;
  viewBox: string;
  icon?: IconName
};

// export default function SVGIcon({ ariaLabel, width, height, xmlns, viewBox, icon }: SVGProps) {
//   return (
//     <svg
//       aria-label={ariaLabel}
//       width={width}
//       height={height}
//       xmlns={xmlns}
//       viewBox={viewBox}
//     >
//       {/* <SvgIcon icon={ icon } /> */}
//     </svg>
//   );
// };


export default function loginButton({
  children,
  type,
  onClick,
  className, }: ComponentType) {
  return (
    <button
      type= { type }
      onClick={ onClick }
      className={ className }>
      {children}
    </button>
  );
};
