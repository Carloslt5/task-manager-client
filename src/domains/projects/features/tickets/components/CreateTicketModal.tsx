import React from "react";
import { useParams } from "react-router-dom";

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
    <div className="modal__form">
      <div className="flex justify-between">
        <h1 className="text-2xl text-white ">New Ticket</h1>
      </div>
      <hr className="mb-4" />
      <form className="flex flex-col gap-2 text-slate-500 " onSubmit={handleSubmit(submitHandler)}>
        <input
          autoFocus
          className="input-standard text-zinc-700 dark:text-zinc-700"
          type="text"
          placeholder="Insert title..."
          {...register("name")}
          required
        />
        <textarea
          className="input-standard min-h-[50px] max-h-32 text-zinc-700 dark:text-zinc-700 "
          placeholder="Insert description..."
          {...register("description")}
          required
        />
        <ul className="flex items-center gap-2 text-white">
          <p>Priority:</p>
          {PRIORITY_ARRAY.map((el, index) => (
            <li key={index}>
              <input id={`checkbox${index}`} type="radio" value={el} {...register("priority")} />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor={`checkbox${index}`}>
                {el}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex flex-row-reverse items-center gap-2 mt-4 items-strech">
          <button className="flex items-center btn btn__add">
            <span>Create Ticket</span>
          </button>
          <button className="btn btn__cancel" onClick={onClose}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};
