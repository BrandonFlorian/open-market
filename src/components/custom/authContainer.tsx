"use client";
import React, { useState } from "react";
import { SignInForm } from "@/components/forms/signInForm";
import { SignUpForm } from "@/components/forms/signUpForm";
import { Card } from "@nextui-org/react";

type Props = {};
type FormType = "signIn" | "signUp";
export const AuthContainer = (props: Props) => {
  const [formType, setFormType] = useState<FormType>("signIn");

  const toggleForm = () => {
    setFormType((prevType) => (prevType === "signIn" ? "signUp" : "signIn"));
  };
  return (
    <Card className="p-8 space-y-4">
      {formType === "signIn" ? (
        <SignInForm toggleForm={toggleForm} />
      ) : (
        <SignUpForm toggleForm={toggleForm} />
      )}
    </Card>
  );
};

export default AuthContainer;
