type SectionKickerProps = {
  n: string;
  label: string;
};

export default function SectionKicker({
  n,
  label,
}: SectionKickerProps) {
  return (
    <div className="kicker" data-draft="rule">
      <b>{n}</b>
      <span />
      <p>{label}</p>
    </div>
  );
}