"use client";

import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import createUser from "./create-user";
import { useActionState } from "react";

export default function Signup() {
  const [state, formAction] = useActionState(createUser, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name="email"
          label="E-Mail"
          variant="outlined"
          type="email"
          helperText={state.error}
          error={!!state.error}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button variant="contained" type="submit">
          Signup
        </Button>
        <Link href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  );
}
