// SvgIcon.tsx
import React from 'react';
import { iconMap } from './icon';

export type IconName = keyof typeof iconMap;

interface SvgIconProps {
  icon: IconName;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  width?: number | string;
  height?: number | string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  icon,
  className,
  onClick,
  width = 16,
  height = 16,
}) => {
  const iconContent = iconMap[icon];
  if (!iconContent) {
    throw new Error(`Icon ${icon} not found in icon map`);
  }

  return (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${ icon } logo`}
    >
      {iconContent}
    </svg>
  );
};
