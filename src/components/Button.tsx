interface prop {
  value?: string;
  onClick: () => void;
  className?: string;
}

export default function Button({ value, onClick, className }: prop) {
  return (
    <button
      onClick={onClick}
      className={`mt-4  border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transition-colors
        ${className}`}
    >
      {value}
    </button>
  );
}
