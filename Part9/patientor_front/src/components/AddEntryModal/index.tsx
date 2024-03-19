import { Alert, Typography } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import {  NewEntry } from "../../types";
import Box from '@mui/material/Box';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({ onSubmit, onClose, error }: Props) => (
  <Box sx={{ marginTop: '10px', padding: '10px', border: 2, borderStyle: 'dashed'  }}>
    <Typography variant="h5" marginTop= {1} marginBottom={2}>
      New entry:
    </Typography>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
  </Box>
);

export default AddEntryModal;
