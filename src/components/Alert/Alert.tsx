import { MdCheckCircle, MdError } from 'react-icons/md';

type Props = {
  type: 'success' | 'fail';
  message: string;
  className?: string;
};

export default function Alert({ type, message, className }: Props) {
  switch (type) {
    case 'success':
      return <SuccessAlert message={message} className={className} />;

    case 'fail':
      return <FailAlert message={message} className={className} />;

    default:
      return null;
  }
}

function SuccessAlert({ message, className }: Omit<Props, 'type'>) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-md border border-green-500 bg-green-100 p-2 ${className}`}
    >
      <MdCheckCircle fill="#52c41a" size={20} />
      <p className="grow">{message}</p>
    </div>
  );
}

function FailAlert({ message, className }: Omit<Props, 'type'>) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-md border border-red-500 bg-red-100 p-2 ${className}`}
    >
      <MdError fill="#ff4d4f" size={20} />
      <p className="grow">{message}</p>
    </div>
  );
}
