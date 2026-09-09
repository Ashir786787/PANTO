interface SectionProps {
  id: string;
}

export default function Hero({ id }: SectionProps) {
  return <section id={id} />;
}
