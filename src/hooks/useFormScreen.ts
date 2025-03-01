import { useCallback, useState } from "react";
import { UseFormScreenReturn } from "../types";

export const useFormScreen = (): UseFormScreenReturn => {
  const [isBuilding, setIsBuilding] = useState<boolean>(true);

  const openBuilder = useCallback(() => {
    setIsBuilding(true);
  }, []);

  const openRenderer = useCallback(() => {
    setIsBuilding(false);
  }, []);

  const onBuilderValidationSuccess = useCallback(() => {
    openRenderer();
  }, [openRenderer]);

  return {
    isBuilding,
    isRendering: !isBuilding,
    openBuilder,
    openRenderer,
    onBuilderValidationSuccess,
  };
};
