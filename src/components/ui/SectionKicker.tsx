type SectionKickerProps = {
  n: string;
  label: string;
};

export default function SectionKicker({
  n,
  label,
}: SectionKickerProps) {
  return (
    <div className="kicker">
      <b>{n}</b>
      <span />
      <p>{label}</p>
    </div>
  );
}