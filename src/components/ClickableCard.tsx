interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const ClickableCard = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    className="rounded-md border border-brand-secondary bg-transparent p-4 text-center text-lg drop-shadow-lg"
  >
    {children}
  </button>
);

export default ClickableCard;
