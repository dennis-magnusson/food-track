import { ReactNode, useState } from "react";
import { BarcodeContext } from "./BarcodeContext";

interface BarcodeProviderProps {
  children: ReactNode;
}

export const BarcodeProvider: React.FC<BarcodeProviderProps> = ({
  children,
}): React.ReactNode => {
  const [barcode, setBarcode] = useState<string | null>(null);

  const updateBarcode = (newBarcode: string) => {
    setBarcode(newBarcode);
  };

  const clearBarcode = () => {
    setBarcode(null);
  };

  return (
    <BarcodeContext.Provider value={{ barcode, updateBarcode, clearBarcode }}>
      {children}
    </BarcodeContext.Provider>
  );
};
