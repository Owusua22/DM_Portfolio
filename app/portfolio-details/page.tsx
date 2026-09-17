import type { Metadata } from "next";

import BodyClass from "@/components/BodyClass";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Portfolio Details",
};

const GALLERY = [
  "/assets/img/portfolio/portfolio-1.webp",
  "/assets/img/portfolio/portfolio-10.webp",
  "/assets/img/portfolio/portfolio-7.webp",
  "/assets/img/portfolio/portfolio-4.webp",
  "/assets/img/portfolio/portfolio-5.webp",
  "/assets/img/portfolio/portfolio-11.webp",
  "/assets/img/portfolio/portfolio-8.webp",
];

export default function PortfolioDetailsPage() {
  return (
    <>
      <BodyClass className="portfolio-details-page" />

      <PageTitle
        title="Portfolio Details"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
      />

      <section id="portfolio-details" className="portfolio-details section">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4 g-lg-5">
            <div className="col-lg-6">
              {GALLERY.map((image) => (
                <img key={image} src={image} className="img-fluid mb-4" alt="" />
              ))}
            </div>

            <div className="col-lg-6">
              <div className="position-sticky" style={{ top: 40 }}>
                <div className="portfolio-description">
                  <h2>This is an example of portfolio details</h2>
                  <p>
                    Autem ipsum nam porro corporis rerum. Quis eos dolorem eos
                    itaque inventore commodi labore quia quia. Exercitationem
                    repudiandae officiis neque suscipit non officia eaque itaque
                    enim. Voluptatem officia accusantium nesciunt est omnis
                    tempora consectetur dignissimos. Sequi nulla at esse enim cum
                    deserunt eius.
                  </p>
                  <p>
                    Amet consequatur qui dolore veniam voluptatem voluptatem sit.
                    Non aspernatur atque natus ut cum nam et. Praesentium error
                    dolores rerum minus sequi quia veritatis eum. Eos et doloribus
                    doloremque nesciunt molestiae laboriosam.
                  </p>

                  <div className="testimonial-item">
                    <p>
                      <i className="bi bi-quote quote-icon-left" />
                      <span>
                        Export tempor illum tamen malis malis eram quae irure esse
                        labore quem cillum quid cillum eram malis quorum velit
                        fore eram velit sunt aliqua noster fugiat irure amet legam
                        anim culpa.
                      </span>
                      <i className="bi bi-quote quote-icon-right" />
                    </p>
                    <div>
                      <img
                        src="/assets/img/person/person-f-5.webp"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Sara Wilsson</h3>
                      <h4>Designer</h4>
                    </div>
                  </div>

                  <p>
                    Impedit ipsum quae et aliquid doloribus et voluptatem quasi.
                    Perspiciatis occaecati earum et magnam animi. Quibusdam non
                    qui ea vitae suscipit vitae sunt. Repudiandae incidunt cumque
                    minus deserunt assumenda tempore. Delectus voluptas
                    necessitatibus est.
                  </p>

                  <p>
                    Sunt voluptatum sapiente facilis quo odio aut ipsum repellat
                    debitis. Molestiae et autem libero. Explicabo et quod
                    necessitatibus similique quis dolor eum. Numquam eaque
                    praesentium rem et qui nesciunt.
                  </p>
                </div>

                <div className="portfolio-info mt-5">
                  <h3>Project information</h3>
                  <ul>
                    <li>
                      <strong>Category</strong> Web design
                    </li>
                    <li>
                      <strong>Client</strong> ASU Company
                    </li>
                    <li>
                      <strong>Project date</strong> 01 March, 2020
                    </li>
                    <li>
                      <strong>Project URL</strong> <a href="#">www.example.com</a>
                    </li>
                    <li>
                      <a href="#" className="btn-visit align-self-start">
                        Visit Website
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
