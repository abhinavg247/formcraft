import { Box, Button } from "@mui/material";
import styles from "./Footer.module.css";

interface FooterProps {
  isBuilding: boolean;
  isRendering: boolean;
  validateBuilder: () => void;
  onEditBuild: () => void;
  submitForm: () => void;
  isSavingForm: boolean;
  onResetBuild: () => void;
}

export const Footer = ({
  isBuilding,
  isRendering,
  validateBuilder,
  onEditBuild,
  submitForm,
  isSavingForm,
  onResetBuild,
}: FooterProps) => {
  return (
    <Box className={styles.footer}>
      {isBuilding && (
        <>
          <Button onClick={onResetBuild} variant="outlined" color="warning">
            Reset
          </Button>
          <Button
            onClick={validateBuilder}
            sx={{ marginLeft: "1rem" }}
            variant="contained"
          >
            Build Form
          </Button>
        </>
      )}
      {isRendering && (
        <>
          <Button onClick={onEditBuild} color="warning" variant="outlined">
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
