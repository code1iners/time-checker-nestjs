import { useForm } from "react-hook-form";

interface HeaderComponentProps {
  onClick: (labelName: string) => void;
}

interface Form {
  labelName: string;
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
    props.onClick(form.labelName);

    // Clear input text.
    setValue("labelName", "");
  };
  return (
    <section className="w-full flex flex-col">
      <form
        onSubmit={handleSubmit(onAddClick)}
        className="relative flex items-center gap-5"
      >
        <input
          {...register("labelName", { required: "제목은 필수입니다." })}
          className="flex-1 border-b p-2 outline-indigo-500 tracking-widest text-slate-600"
          type="text"
          placeholder="출근한 시간"
          maxLength={20}
          autoCapitalize="off"
          autoComplete="off"
        />
        <button
          className="absolute right-2 bg-white border border-slate-500 hover:border-indigo-500 text-slate-500 hover:text-indigo-500 transition hover:scale-110 rounded-md"
          onClick={handleSubmit(onAddClick)}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </form>
      <p className="mt-2 text-red-400 text-sm tracking-widest">
        {errors.labelName?.message || ""}
      </p>
    </section>
  );
}
