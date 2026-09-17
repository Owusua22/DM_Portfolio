import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";

export default function Contact() {
  const contactMethods = [
    {
      icon: "bi-envelope-at",
      label: "Email Me",
      value: "nanaowusua1996@gmail.com",
      href: "mailto:nanaowusua1996@gmail.com",
      badge: "Fastest response",
    },
    {
      icon: "bi-whatsapp",
      label: "WhatsApp",
      value: "+233 54 411 1246",
      href: "https://wa.me/233544111246",
      badge: "Chat directly",
    },
    {
      icon: "bi-geo-alt",
      label: "Location",
      value: "Ghana (GMT / UTC+0)",
      href: null,
      badge: "Remote worldwide",
    },
  ];

  return (
    <section id="contact" className="contact section py-5 light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Top Header */}
        <div className="text-center mx-auto mb-5">
          <SectionTitle
            title="Contact Me"
            description="Have a project in mind? I'd love to help bring your ideas to life with creative designs that help your brand stand out and grow."
          />
        </div>

        <div className="row g-4 g-xl-5 align-items-start">
          {/* Left Column: Direct Info & Booking */}
          <div className="col-lg-5" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex flex-column h-100 pe-lg-3">
              {/* Availability Status Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill align-self-start mb-3 small fw-medium"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--accent-color), transparent 92%)",
                  color: "var(--accent-color)",
                  border: "1px solid color-mix(in srgb, var(--accent-color), transparent 85%)",
                }}
              >
                <span
                  className="spinner-grow spinner-grow-sm"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--accent-color)",
                  }}
                  role="status"
                />
                Available for new projects
              </div>

              <h2 className="display-6 fw-bold mb-3">
                Let's build something beautiful together
              </h2>
              <p className="text-secondary mb-4">
                Have a project in mind, need branding, or want to discuss a
                creative collaboration? Feel free to reach out or schedule a meeting with me.
        
              </p>

              {/* Contact Method Cards */}
              <div className="contact-methods d-flex flex-column gap-3 mb-4">
                {contactMethods.map((item, idx) => {
                  const Content = (
                    <div className="contact-card p-3 rounded-3 bg-white border d-flex align-items-center gap-3 transition-all"
                      style={{
                        borderColor: "color-mix(in srgb, var(--default-color), transparent 94%)",
                        boxShadow: "0 10px 40px -30px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        className="icon-wrapper d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{
                          width: "46px",
                          height: "46px",
                          backgroundColor: "color-mix(in srgb, var(--accent-color), transparent 92%)",
                          color: "var(--accent-color)",
                        }}
                      >
                        <i className={`bi ${item.icon} fs-5`} />
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex justify-content-between align-items-center mb-0 flex-wrap gap-1">
                          <span className="text-muted small text-uppercase tracking-wider fw-semibold">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="badge rounded-pill bg-light text-secondary border small fw-normal">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="mb-0 fw-medium text-dark text-truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-decoration-none text-reset"
                    >
                      {Content}
                    </a>
                  ) : (
                    <div key={idx}>{Content}</div>
                  );
                })}
              </div>

              {/* Calendly Booking Highlight Card */}
              <div
                className="booking-card p-4 rounded-4 position-relative overflow-hidden shadow-sm mt-auto"
                style={{
                  backgroundColor: "var(--accent-color)",
                }}
              >
                <div
                  className="d-flex align-items-start gap-3 position-relative"
                  style={{ zIndex: 1 }}
                >
                  <div className="p-2.5 rounded-3 bg-white bg-opacity-20 text-white flex-shrink-0">
                    <i className="bi bi-camera-video-fill fs-4" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white">
                      Prefer a One-on-One Meeting?
                    </h5>
                    <p className="small mb-3 text-white" style={{ opacity: 0.9 }}>
                      Schedule a 30-minute Google Meet discovery call to
                      discuss your project.
                    </p>
                    <a
                      href="https://calendly.com/nanaowusua1996"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light btn-sm px-4 py-2 fw-semibold rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
                      style={{ color: "var(--accent-color)" }}
                    >
                      <i className="bi bi-calendar-event" />
                      Schedule  Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
            <div
              className="contact-form-wrapper bg-white p-4 p-md-5 rounded-4 border shadow-sm position-relative"
              style={{
                borderColor: "color-mix(in srgb, var(--default-color), transparent 94%)",
              }}
            >
              <div className="border-bottom pb-3 mb-4">
                <h3 className="h4 fw-bold mb-1">Send Me a Message</h3>
                <p className="text-muted small mb-0">
                  <i className="bi bi-clock me-1" /> I usually reply within 24
                  hours
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}