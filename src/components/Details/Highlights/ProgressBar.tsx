export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="relative mt-7 h-2 w-[14.25rem] rounded-full bg-app-gray-2">
      <div
        className="h-2 rounded-full bg-app-yellow"
        style={{ width: `${value}%` }}
      />
      <span className="absolute top-[-1.1rem] text-[0.75rem] font-bold text-app-gray-4">
        0
      </span>
      <span className="absolute top-[-1.1rem] left-[6.3rem] text-[0.75rem] font-bold text-app-gray-4 ">
        50
      </span>
      <span className="absolute top-[-1.1rem] left-[12.6rem] text-[0.75rem] font-bold text-app-gray-4">
        100
      </span>
      <span className="absolute left-[13.5rem] text-[0.75rem] font-bold text-app-gray-4">
        %
      </span>
    </div>
  );
}
