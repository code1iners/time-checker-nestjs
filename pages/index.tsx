import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { v4 } from "uuid";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import HeaderComponent from "@/components/header.component";
import StampItem from "@/components/stamp-item";
import ResponsiveHorizontal from "@/components/responsive-horizontal.component";

interface Item {
  id: string;
  label: string;
  value: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const copiedItems = useRef();

  const onAddClick = (labelName: string) => {
    const isExists = items.some(({ label }) => label === labelName);
    if (isExists) {
      alert("이미 존재하는 항목입니다.");
      return;
    }

    setItems((curr) => [...curr, { id: v4(), label: labelName, value: 0 }]);
  };

  const onTimeCreateClick = (id: string) => {
    const foundItem = items.find((item) => item.id === id);
    if (!foundItem) return;

    foundItem.value = Date.now();
    setItems((curr) => [...curr]);
  };

  const onTimeRemoveClick = (id: string) => {
    const foundItem = items.find((item) => item.id === id);
    if (!foundItem) return;

    foundItem.value = 0;
    setItems((curr) => [...curr]);
  };

  const onItemDeleteClick = (id: string) => {
    const isConfirmed = confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const copied = [...items];
    const [removed] = copied.splice(source.index, 1);

    if (destination) {
      copied.splice(destination.index, 0, removed);
      setItems(copied);
    }
  };

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setItems(JSON.parse(items));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Time Stamper</title>
      </Head>
      <main className="h-screen p-10 flex flex-col items-center gap-5">
        <ResponsiveHorizontal>
          <HeaderComponent onClick={onAddClick} />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(droppableProvided, snapshot) => (
                <ul
                  className="w-full flex flex-col gap-5 overflow-y-scroll"
                  ref={droppableProvided.innerRef}
                >
                  {items.map(({ id, label, value }, index) => (
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
                          onItemDeleteClick={onItemDeleteClick}
                          onTimeCreateClick={onTimeCreateClick}
                          onTimeRemoveClick={onTimeRemoveClick}
                        />
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ResponsiveHorizontal>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
