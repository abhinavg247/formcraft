import { Box, Button } from "@mui/material";
import styles from "./Footer.module.css";

interface FooterProps {
  isBuilding: boolean;
  isRendering: boolean;
  validateBuilder: () => void;
  onEditBuild: () => void;
  submitForm: () => void;
}

export const Footer = ({
  isBuilding,
  isRendering,
  validateBuilder,
  onEditBuild,
  submitForm,
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
            className={styles["submit-button"]}
            variant="contained"
          >
            Submit Form
          </Button>
        </>
      )}
    </Box>
  );
};
