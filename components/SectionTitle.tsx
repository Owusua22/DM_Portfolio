export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container section-title" data-aos="fade-up">
      <h2>{title}</h2>
      <div className="title-shape">
        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <p>{description}</p>
    </div>
  );
}
