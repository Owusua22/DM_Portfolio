import Link from "next/link";

export default function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="page-title">
      <div className="breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <i className="bi bi-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#">Category</Link>
            </li>
            <li className="breadcrumb-item active current">{title}</li>
          </ol>
        </nav>
      </div>

      <div className="title-wrapper">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
