import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateForm from "./CreateForm";
import MemberForm from "./MemberForm";
import DateForm from "./DateForm";

const steps = ["Create a project", "Add Members", "Set Deadline"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CreateForm />;
    case 1:
      return <MemberForm />;
    case 2:
      return <DateForm />;
    default:
      throw new Error("Unknown step");
  }
}

// const theme = createTheme();

export default function ProjectForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 2 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Task Creation
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Task has Been Created.
                </Typography>
                <Typography variant="subtitle1">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dignissimos sint incidunt fugit doloremque quia assumenda
                  provident, labore cupiditate est cum dolores voluptatem nihil
                  ab itaque distinctio delectus? Deleniti, natus officiis.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Create Project"
                      : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </Container>
    </>
  );
}
