'use client';

import useForm from '@/hooks/useForm';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Alert from '@/components/Alert';
import { sendContactEmail } from '@/service/contact';

export default function EmailForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { values, error, handleChange, handleSubmit, reset } = useForm({
    initialValue: {
      from: '',
      subject: '',
      message: '',
    },
    onSubmit: async (value) => {
      await sendContactEmail(value);
      formRef.current?.reset();
      reset();
    },
    validate: ({ from, subject, message }) => {
      const errors: Record<string, string> = {};

      if (!from) errors.from = '이메일을 입력해주세요.';
      if (!subject) errors.subject = '제목을 입력해주세요.';
      if (!message) errors.message = '이메일 본문을 입력해주세요.';
      if (!errors.from && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(from))
        errors.from = '올바른 이메일을 입력해주세요.';

      return errors;
    },
    onSuccess: () => {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    },
    onFail: () => {
      setShowFailAlert(true);
      setTimeout(() => {
        setShowFailAlert(false);
      }, 2000);
    },
  });

  useEffect(() => {
    console.log('values: ', values);
  }, [values]);

  useEffect(() => {
    console.log('errors: ', error);
  }, [error]);

  return (
    <div className="grid w-96 gap-2">
      <section className="rounded-md bg-slate-600 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1"
          ref={formRef}
        >
          <label className="font-semibold text-white" htmlFor="from">
            Your Email
          </label>
          <input
            className="rounded-sm p-1"
            onChange={handleChange}
            id="from"
            type="email"
            name="from"
          />
          <label className="font-semibold text-white" htmlFor="subject">
            Subject
          </label>
          <input
            className="rounded-sm p-1"
            onChange={handleChange}
            id="subject"
            type="text"
            name="subject"
          />
          <label className="font-semibold text-white" htmlFor="message">
            Message
          </label>
          <textarea
            className="h-40 resize-none rounded-sm p-1"
            onChange={handleChange}
            id="message"
            name="message"
          />
          <button className="mt-2 rounded-sm bg-amber-200 py-1" type="submit">
            Submit
          </button>
        </form>
      </section>
      {showSuccessAlert && (
        <Alert type="success" message="이메일을 보냈습니다." />
      )}
      {showFailAlert && (
        <Alert type="fail" message="이메일, 제목, 본문을 확인해주세요." />
      )}
    </div>
  );
}
