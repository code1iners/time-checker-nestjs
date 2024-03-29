import { motion } from "framer-motion";
import { DateTime } from "luxon";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { clazz } from "@ce1pers/use-class";
import { useStampStore } from "@/stores/stamp.store";
import { withDateFormat } from "@/utilities";
import { StampObject } from "@/types";
import { useEffect } from "react";

export const actionButtonClassName =
  "grow flex justify-center text-gray-500 hover:text-red-500 hover:border-red-500 border rounded-md py-2";

interface StampItemProps extends StampObject {
  reference?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export default function StampItem({
  id,
  label,
  value,
  isAutoUpdateMode,
  reference,
  dragHandleProps,
  draggableProps,
}: StampItemProps) {
  const { updateStamp, deleteStamp, toggleStampAutoRefreshById } =
    useStampStore();

  const onItemDeleteClick = (id: string) => {
    const isConfirmed = confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteStamp(id);
  };

  /**
   * Update item value with automation.
   */
  useEffect(() => {
    if (isAutoUpdateMode) {
      const now = DateTime.now();
      // Obtains today start time as milliseconds.
      const toDayAsMilliSeconds = now.startOf("day").toMillis();
      // Is the item's value less than today?
      if (toDayAsMilliSeconds > value) {
        // Update value today
        updateStamp(id, true);
      }
    }
  }, [id, value, isAutoUpdateMode, updateStamp]);

  return (
    <li
      className="p-3"
      ref={reference}
      {...draggableProps}
      {...dragHandleProps}
    >
      <motion.div
        className="flex flex-col gap-2 border rounded-md shadow-md p-5 items-center"
        whileTap={{ scale: 0.975 }}
        whileHover={{ scale: 1.0175 }}
      >
        <span className="text-gray-500 tracking-widest font-light border-b text-center">
          {label}
        </span>

        <div className="flex p-2 tracking-wider">
          {value ? (
            <button
              className="flex items-center gap-3"
              onClick={() => updateStamp(id, false)}
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

              <span>{withDateFormat(value)}</span>
            </button>
          ) : (
            <button
              className="tracking-widest flex items-center gap-2"
              onClick={() => updateStamp(id, true)}
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

        <div className="w-full flex items-center gap-5">
          <button
            className={clazz(
              actionButtonClassName,
              isAutoUpdateMode ? "text-green-500" : ""
            )}
            onClick={() => toggleStampAutoRefreshById(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={clazz(
                "w-5 h-5",
                isAutoUpdateMode ? "animate-spin" : ""
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <button
            className={actionButtonClassName}
            onClick={() => onItemDeleteClick(id)}
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
        </div>
      </motion.div>
    </li>
  );
}
