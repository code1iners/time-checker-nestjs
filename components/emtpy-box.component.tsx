export default function EmptyBox() {
  return (
    <div className="flex flex-col gap-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-30 h-30 text-indigo-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
        />
      </svg>

      <div className="flex flex-col items-center gap-2 tracking-wider">
        <h1 className="text-2xl font-semibold text-slate-600">
          항목이 없습니다.
        </h1>
        <small className="text-sm text-gray-400">
          타임 스탬프를 추가해볼까요?
        </small>
      </div>
    </div>
  );
}
