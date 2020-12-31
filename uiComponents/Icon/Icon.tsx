import React from 'react';

export interface IIconProps {
  readonly className?: string;
  readonly height?: number;
  readonly icon: string;
  readonly color?: string;
  readonly style?: React.CSSProperties;
  readonly width?: number;
}

const IconComponent: React.SFC<IIconProps> = ({
  className,
  height,
  icon = '',
  color,
  style,
  width = 24,
}: IIconProps) => {
  const styles: React.CSSProperties = {
    fill: color || '#666',
    stroke: 'none',
    transition: 'fill .2s ease-out, transform .2s ease-out',
    ...style,
  };

  return (
    <svg
      className={className}
      height={height || width}
      style={styles}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg">
      <path d={icon} />
    </svg>
  );
};

export const Icon = React.memo(IconComponent);
