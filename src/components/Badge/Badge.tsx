type Props = {
  text: string;
};

export default function Badge({ text }: Props) {
  return (
    <div className="rounded-md bg-[#13c2c2] px-2 py-[1px] text-xs font-semibold text-white">
      {text}
    </div>
  );
}
