import { Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import {  Diagnosis, PatientFormValues } from "../../types";
import Box from '@mui/material/Box';

interface Props {
  diagnoses : Diagnosis[];
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ diagnoses, onClose, onSubmit, error }: Props) => (
  <Box sx={{ marginTop: '10px', padding: '10px', border: 2, borderStyle: 'dashed' }}>
    <h4>New HealthCheck entry</h4>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onCancel={onClose}/>
  </Box>
  // <Dialog fullWidth={true} open={inputOpen} onClose={() => onClose()}>
  //   <DialogTitle>Add a new patient</DialogTitle>
  //   <Divider />
  //   <DialogContent>
  //     {error && <Alert severity="error">{error}</Alert>}
  //     
  //   </DialogContent>
  // </Dialog>
);

export default AddEntryModal;
