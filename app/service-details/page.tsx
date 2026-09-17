import type { Metadata } from "next";

import BodyClass from "@/components/BodyClass";
import PageTitle from "@/components/PageTitle";
import ServiceDetailsSlider from "@/components/ServiceDetailsSlider";

export const metadata: Metadata = {
  title: "Service Details",
};

const FEATURES = [
  { title: "Search Engine Optimization", delay: "100" },
  { title: "Social Media Marketing", delay: "200" },
  { title: "Content Marketing Strategy", delay: "300" },
  { title: "Email Marketing Campaigns", delay: "400" },
];

const SERVICE_INFO = [
  { icon: "bi-clock", title: "Project Duration", value: "3-6 months" },
  { icon: "bi-person-check", title: "Project Manager", value: "Sarah Johnson" },
  { icon: "bi-telephone", title: "Contact Support", value: "+1 (555) 123-4567" },
];

const RELATED_SERVICES = [
  {
    icon: "bi-bar-chart",
    title: "Business Analytics",
    description:
      "Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere",
  },
  {
    icon: "bi-briefcase",
    title: "Business Consulting",
    description:
      "Sit sint consectetur velit quisquam cupiditate impedit suscipit alias",
  },
  {
    icon: "bi-graph-up",
    title: "Financial Planning",
    description:
      "Sed perspiciatis omnis iste natus error sit voluptatem doloremque",
  },
];

export default function ServiceDetailsPage() {
  return (
    <>
      <BodyClass className="service-details-page" />

      <PageTitle
        title="Service Details"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
      />

      <section id="service-details" className="service-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-8">
              <ServiceDetailsSlider />

              <div className="content mt-5">
                <h3>Digital Marketing Solutions</h3>
                <p>
                  Qui laudantium consequatur laborum sit qui ad sapiente dila
                  parde sonata raqer a videna mareta paulona marka. Aut quiatem.
                  Ut earum tempore quidem qui recusandae distinctio quo.
                </p>
                <p>
                  Et officiis id est ad voluptates sint quia architecto aut soluta
                  eum voluptatum rerum illo mara. Ut earum tempore quidem qui
                  recusandae distinctio quo. Veniam maiores eos cumque distinctio.
                </p>

                <div className="features mt-4">
                  <div className="row gy-4">
                    {FEATURES.map((feature) => (
                      <div
                        className="col-md-6"
                        key={feature.title}
                        data-aos="fade-up"
                        data-aos-delay={feature.delay}
                      >
                        <div className="feature-box d-flex align-items-center">
                          <i className="bi bi-check" />
                          <h4>{feature.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4">
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-info">
                <h4>Service Information</h4>
                {SERVICE_INFO.map((info) => (
                  <div className="info-item" key={info.title}>
                    <i className={`bi ${info.icon}`} />
                    <h5>{info.title}</h5>
                    <p>{info.value}</p>
                  </div>
                ))}
              </div>

              <div className="related-services mt-5">
                <h4>Related Services</h4>
                {RELATED_SERVICES.map((service) => (
                  <div className="service-item" key={service.title}>
                    <i className={`bi ${service.icon}`} />
                    <h5>
                      <a href="#">{service.title}</a>
                    </h5>
                    <p>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
