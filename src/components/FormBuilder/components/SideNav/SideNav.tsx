//components
import { Box, Typography } from "@mui/material";
import { QuestionType } from "../../../../constants/questionConstants";
import { AddQuestion } from "./components/AddQuestion";

//styles
import styles from "./SideNav.module.css";

//types
import { SideNavProps } from "../../../../types";

export const SideNav = ({ onAddQuestion }: SideNavProps) => {
  return (
    <Box className={styles["side-nav"]}>
      <Typography variant="h6" className={styles["side-nav-heading"]}>
        Add New Questions
      </Typography>
      <AddQuestion type={QuestionType.TEXT} onAddQuestion={onAddQuestion} />
      <AddQuestion type={QuestionType.NUMBER} onAddQuestion={onAddQuestion} />
      <AddQuestion type={QuestionType.SELECT} onAddQuestion={onAddQuestion} />
    </Box>
  );
};
