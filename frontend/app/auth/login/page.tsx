"use client";

import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "./login";

export default function Login() {
  const [state, formAction] = useActionState(loginUser, { error: "" });

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
          Login
        </Button>
        <Link href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
}
