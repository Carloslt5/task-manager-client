import React from "react";

type ActionButtonProps = {
  readonly ctaText: string;
  readonly icon: JSX.Element;
  readonly onClick: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  ctaText,
  icon,
  onClick,
}) => {
  return (
    <button
      className="flex items-center gap-1 mt-3 mb-6 btn btn__add"
      onClick={onClick}
    >
      {icon}
      <span>{ctaText}</span>
    </button>
  );
};
