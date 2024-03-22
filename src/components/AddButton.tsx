import { Add } from './icons';

type AddButtonProps = {
  text: string;
  onClick: () => void;
};

export const AddButton = ({ text, onClick }: AddButtonProps) => {
  return (
    <button className="gap-2 mb-6 btn btn__primary" onClick={onClick}>
      <Add />
      <p>{text}</p>
    </button>
  );
};
