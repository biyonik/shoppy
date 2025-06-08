"use client";

import { FormResponse } from "@/common/interfaces/form-response.interface";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { CSSProperties } from "react";
import createProduct from "../actions/create-product";
import { CloudUpload } from "@mui/icons-material";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = React.useState<FormResponse>();
  const [fileName, setFileName] = React.useState<string>("");
  const [imageFile, setImageFile] = React.useState<File | null>(null); // Ayrı state

  const onClose = () => {
    setResponse(undefined);
    setImageFile(null);
    setFileName("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData: FormData) => {
            const response = await createProduct(formData, imageFile);
            setResponse(response);
            if (!response.error) {
              handleClose();
              setFileName("");
              setImageFile(null);
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              type="text"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              type="text"
              multiline={true}
              rows={4}
              maxRows={6}
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload File
               <input 
                type="file" 
                style={fileInputStyles} 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
            </Button>
            <Typography>{fileName}</Typography>
            <Button variant="contained" type="submit">
              Add Product
            </Button>
            <Button type="button" onClick={() => handleClose()}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
