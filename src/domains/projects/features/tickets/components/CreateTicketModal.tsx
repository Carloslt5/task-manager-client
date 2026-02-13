import React from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/shared/components/Button";
import { Input, TextArea } from "@/shared/components/Input";
import { ModalContent } from "@/shared/components/ModalContent";
import { ModalForm } from "@/shared/components/ModalForm";

import { useTicketForm } from "../hooks/useTicketForm";
import { PRIORITY_ARRAY } from "../tickets.type";

interface Props {
  readonly stateId: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export const CreateTicketModal: React.FC<Props> = ({ stateId, onClose }) => {
  const { id: projectId } = useParams();

  const { register, handleSubmit, submitHandler } = useTicketForm({
    stateId: stateId,
    projectId: projectId!,
    onClose: onClose,
  });

  return (
    <ModalForm onClose={onClose}>
      <ModalContent>
        <div className="flex justify-between">
          <h1 className="text-2xl text-white ">New Ticket</h1>
        </div>
        <hr className="mb-4" />
        <form
          className="flex flex-col gap-2 text-neutral-500 "
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            autoFocus
            variant="modal"
            type="text"
            placeholder="Insert title..."
            {...register("title")}
            required
          />
          <TextArea
            variant="modal"
            className="min-h-[50px] max-h-32"
            placeholder="Insert description..."
            {...register("description")}
            required
          />
          <ul className="flex items-center gap-2 text-white">
            <p>Priority:</p>
            {PRIORITY_ARRAY.map((el, index) => (
              <li key={index}>
                <input
                  id={`checkbox${index}`}
                  type="radio"
                  value={el}
                  {...register("priority")}
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor={`checkbox${index}`}
                >
                  {el}
                </label>
              </li>
            ))}
          </ul>

          <div className="flex flex-row-reverse items-center gap-2 mt-4 items-strech">
            <Button variant="add">
              <span>Create Ticket</span>
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
