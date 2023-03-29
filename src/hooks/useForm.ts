import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';

type ErrorType = Record<string, string>;

type Props<T> = {
  initialValue: T;
  onSubmit: (values: T) => Promise<void>;
  validate: (values: T) => ErrorType;
  beforeSubmit?: ({ values, error }: { values: T; error: ErrorType }) => void;
};

export default function useForm<T>({
  initialValue,
  onSubmit,
  validate,
  beforeSubmit,
}: Props<T>) {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState<ErrorType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = typeof validate === 'function' ? validate(values) : {};
    setError(errors);

    beforeSubmit?.({ values, error: errors });

    if (Object.keys(errors).length === 0) {
      await onSubmit(values);
    }

    setIsLoading(false);
  };

  const reset = () => {
    setValues(initialValue);
  };

  return {
    values,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    reset,
  };
}
