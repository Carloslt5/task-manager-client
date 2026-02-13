import React, { JSX } from "react";

import { Button } from "./Button";

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
    <Button variant="add" className="gap-1 mt-3 mb-6" onClick={onClick}>
      {icon}
      <span>{ctaText}</span>
    </Button>
  );
};
