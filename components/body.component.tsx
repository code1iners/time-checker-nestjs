import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import StampItem from "@/components/stamp-item";
import { useStampStore } from "@/stores/stamp.store";
import EmptyBox from "./emtpy-box.component";

export default function BodyComponent() {
  const { stamps, moveStamp } = useStampStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    moveStamp(source.index, destination?.index);
  };

  if (!stamps.length) return <EmptyBox />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, snapshot) => (
          <ul
            className="w-full h-full flex flex-col overflow-y-auto"
            ref={droppableProvided.innerRef}
          >
            {stamps.map(({ id, label, value, isAutoUpdateMode }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(draggableProvided, snapshot) => (
                  <StampItem
                    reference={draggableProvided.innerRef}
                    draggableProps={draggableProvided.draggableProps}
                    dragHandleProps={draggableProvided.dragHandleProps}
                    key={id}
                    id={id}
                    label={label}
                    value={value}
                    isAutoUpdateMode={isAutoUpdateMode}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
