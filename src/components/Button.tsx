
interface prop {
  value: string;
  onClick: () => void;
}

export default function Button({ value, onClick }: prop) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-black border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transition-colors"
    >
      {value}
    </button>
  );
}
