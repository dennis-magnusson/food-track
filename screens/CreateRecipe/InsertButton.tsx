import MyButton from "../../shared/MyButton";

interface InsertButtonProps {}

const InsertButton: React.FC<InsertButtonProps> = () => {
  return (
    <>
      <MyButton
        text="Create"
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default InsertButton;
