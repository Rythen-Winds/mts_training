const ExpandButton = ({
  open,
  toggle,
}: {
  open: boolean;
  toggle?: () => void;
}) => {
  return (
    <button
      onClick={toggle}
      className='flex justify-center items-center text-3xl px-2 py-1 font-bold border border-primary rounded-lg hover:bg-secondary hover:bg-opacity-20'
    >
      {!open ? '+' : '-'}
    </button>
  );
};

export default ExpandButton;
