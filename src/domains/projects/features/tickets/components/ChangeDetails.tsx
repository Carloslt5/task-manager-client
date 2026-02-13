import type React from "react";

import { Button } from "@/shared/components/Button";
import { TextArea } from "@/shared/components/Input";
import { useEditing } from "@/shared/hooks/useEditingHook";

import { useTicketForm } from "../hooks/useTicketForm";
import type { Ticket } from "../tickets.type";

type Props = {
  readonly data: Ticket;
};

export const ChangeDetails: React.FC<Props> = ({ data }) => {
  const { isEditing, handlerEditClick } = useEditing();

  const { register, handleSubmit, submitHandler } = useTicketForm({
    stateId: data.stateId,
    projectId: data.projectId,
    ticket: data,
    onClose: handlerEditClick,
  });

  return (
    <>
      {!isEditing ? (
        <article className="p-2 text-white border border-neutral-400 rounded-sm bg-neutral-500 dark:bg-neutral-800">
          <p onClick={handlerEditClick}>{data.description}</p>
        </article>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextArea
            autoFocus
            variant="form"
            className="p-2 mb-2 text-base border-none max-h-40"
            placeholder={data.description}
            {...register("description")}
            required
          />

          <section className="flex flex-row-reverse items-center justify-start w-full gap-3">
            <Button type="submit" variant="add">
              Save Description
            </Button>
            <Button variant="cancel" onClick={handlerEditClick}>
              Cancel
            </Button>
          </section>
        </form>
      )}
    </>
  );
};
