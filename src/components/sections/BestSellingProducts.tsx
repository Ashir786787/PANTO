interface SectionProps {
  id: string;
}

export default function BestSellingProducts({ id }: SectionProps) {
  return <section id={id} />;
}
