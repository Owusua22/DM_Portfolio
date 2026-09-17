import type { Metadata } from "next";

import BodyClass from "@/components/BodyClass";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Starter Page",
};

export default function StarterPage() {
  return (
    <>
      <BodyClass className="starter-page-page" />

      <PageTitle
        title="Starter Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
      />

      <section id="starter-section" className="starter-section section">
        <SectionTitle
          title="Starter Section"
          description="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem"
        />

        <div className="container" data-aos="fade-up">
          <p>Use this page as a starter for your own custom pages.</p>
        </div>
      </section>
    </>
  );
}
