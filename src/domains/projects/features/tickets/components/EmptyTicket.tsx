import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

import { State } from "../../states/states.type";

type Props = {
  readonly stateId: State["id"];
};

export const EmptyTicket: React.FC<Props> = ({ stateId }) => {
  const ref = useRef<HTMLOListElement | null>(null);
  const [aboutToDrop, setAboutToDrop] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const dragConfig = {
      element,
      onDragEnter() {
        setAboutToDrop(true);
      },
      onDragLeave() {
        setAboutToDrop(false);
      },
      onDrop() {
        setAboutToDrop(false);
      },
    };

    return dropTargetForElements(dragConfig);
  }, []);

  return (
    <ol
      className={`p-4 flex flex-col gap-4 rounded-sm ${aboutToDrop ? "bg-blue-chill-600 dark:bg-zinc-800" : ""}`}
      data-test-id={stateId}
      ref={ref}
    >
      <li className={`relative p-2 hover:cursor-grab h-4`} />
    </ol>
  );
};
