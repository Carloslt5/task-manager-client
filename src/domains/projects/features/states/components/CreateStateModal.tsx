import { useParams } from "react-router-dom";

import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ModalContent } from "@/shared/components/ModalContent";
import { ModalForm } from "@/shared/components/ModalForm";

import { useStateForm } from "../hooks/useStateForm";

type Props = {
  readonly modalTitle: string;
  readonly open: boolean;
  readonly onClose: () => void;
};

export const CreateStateModal = ({ modalTitle, onClose }: Props) => {
  const { id: projectId } = useParams();

  const { register, handleSubmit, submitHandler } = useStateForm({
    projectId: projectId!,
    onClose: onClose,
  });

  return (
    <ModalForm onClose={onClose}>
      <ModalContent>
        <div className="flex justify-between">
          <h1 className="text-2xl text-white ">{modalTitle}</h1>
        </div>
        <hr className="my-4" />
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            autoFocus
            variant="form"
            className="mb-4"
            type="text"
            placeholder="New State..."
            {...register("stateName", { required: "State name is required" })}
            required
          />
          <div className="flex flex-row-reverse items-center gap-2 items-strech">
            <Button variant="add">
              <span>Add State</span>
            </Button>
            <Button variant="cancel" onClick={onClose}>
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalForm>
  );
};
