import { useState } from "react";
import { useForm } from "react-hook-form";

interface HeaderComponentProps {
  onClick: (inputText: string) => void;
}

interface Form {
  inputText: string;
}

export default function HeaderComponent(props: HeaderComponentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const onAddClick = (form: Form) => {
    // Execute callback.
    props.onClick(form.inputText);

    // Clear input text.
    setValue("inputText", "");
  };
  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center gap-5">
        <input
          {...register("inputText", { required: "제목은 필수입니다." })}
          className="flex-1 border-b p-2"
          type="text"
          placeholder="출근한 시간"
        />
        <button
          className="border border-slate-500 text-slate-500 rounded-md"
          onClick={handleSubmit(onAddClick)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <p className="mt-2 text-red-400 text-sm tracking-widest">
        {errors.inputText?.message || ""}
      </p>
    </section>
  );
}
