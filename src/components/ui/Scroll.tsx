type Props = {
    children: React.ReactNode;
}

const Scroll = ({ children }: Props) => {
  return (
    <div
      style={{
              overflowY: "scroll",
                height: "auto",
      }}
    >
      {children}
    </div>
  );
}

export default Scroll;