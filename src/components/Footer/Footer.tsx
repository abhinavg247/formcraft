import { Box, Button } from "@mui/material";
import styles from "./Footer.module.css";

interface FooterProps {
  isBuilding: boolean;
  isRendering: boolean;
  validateBuilder: () => void;
  onEditBuild: () => void;
  submitForm: () => void;
  isSavingForm: boolean;
}

export const Footer = ({
  isBuilding,
  isRendering,
  validateBuilder,
  onEditBuild,
  submitForm,
  isSavingForm,
}: FooterProps) => {
  return (
    <Box className={styles.footer}>
      {isBuilding && (
        <Button onClick={validateBuilder} variant="contained">
          Build
        </Button>
      )}
      {isRendering && (
        <>
          <Button onClick={onEditBuild} variant="contained">
            Edit Build
          </Button>
          <Button
            onClick={submitForm}
            loading={isSavingForm}
            loadingPosition="end"
            sx={{ marginLeft: "1rem" }}
            variant="contained"
          >
            Submit Form
          </Button>
        </>
      )}
    </Box>
  );
};
