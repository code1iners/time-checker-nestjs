import Head from "next/head";
import { v4 } from "uuid";
import HeaderComponent from "@/components/header.component";
import BodyComponent from "@/components/body.component";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  label: string;
  value: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  const onAddClick = (labelName: string) => {
    const isExists = items.some(({ label }) => label === labelName);
    if (isExists) {
      alert("이미 존재하는 항목입니다.");
      return;
    }

    setItems((curr) => [...curr, { id: v4(), label: labelName, value: 0 }]);
  };

  const onGenerateTimeClick = (id: string) => {
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

  const onDeleteClick = (id: string) => {
    const isConfirmed = confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };

  const parsedValue = (value: number) => {
    const date = new Date(value);
    const formatted = new Intl.DateTimeFormat("ko-kr", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
    return formatted;
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
      <main className="h-screen p-10 flex flex-col gap-5">
        <HeaderComponent onClick={onAddClick} />
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-y-scroll">
          {items.map(({ id, label, value }) => (
            <li
              className="flex flex-col gap-2 border rounded-md shadow-md p-5 items-center"
              key={id}
            >
              <span className="text-gray-500 tracking-widest font-light border-b text-center">
                {label}
              </span>

              <div className="flex p-2 text-md tracking-wider">
                {value ? (
                  <button
                    className="flex items-center gap-3"
                    onClick={() => onTimeRemoveClick(id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <span>{parsedValue(value)}</span>
                  </button>
                ) : (
                  <button
                    className="tracking-widest flex items-center gap-2"
                    onClick={() => onGenerateTimeClick(id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-orange-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                      />
                    </svg>
                    시간 찍기
                  </button>
                )}
              </div>

              <button
                className="w-full flex justify-center text-gray-500 hover:text-red-500 hover:border-red-500 border rounded-md py-2"
                onClick={() => onDeleteClick(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
