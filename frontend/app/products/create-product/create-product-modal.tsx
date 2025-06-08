"use client";

import { FormResponse } from "@/common/interfaces/form-response.interface";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import React from "react";
import createProduct from "../actions/create-product";

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

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = React.useState<FormResponse>();

  const onClose = () => {
    setResponse(undefined);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form className="w-full max-w-xs" action={async (formData: FormData) => {
            const response = await createProduct(formData);
            setResponse(response);
            if (!response.error) {
                handleClose();
            }
        }}>
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
            <Button variant="contained" type="submit">
              Add Product
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
