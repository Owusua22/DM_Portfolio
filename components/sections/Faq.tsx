"use client";

import { useState } from "react";

import SectionTitle from "@/components/SectionTitle";

const FAQS = [
  {
    question: "Non consectetur a erat nam at lectus urna duis?",
    answer:
      "Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.",
  },
  {
    question: "Feugiat scelerisque varius morbi enim nunc faucibus?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  },
  {
    question: "Dolor sit amet consectetur adipiscing elit pellentesque?",
    answer:
      "Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis",
  },
  {
    question: "Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  },
  {
    question: "Tempus quam pellentesque nec nam aliquam sem et tortor?",
    answer:
      "Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in",
  },
  {
    question: "Perspiciatis quod quo quos nulla quo illum ullam?",
    answer:
      "Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et.",
  },
];

export default function Faq() {
  // The first item starts open, as in the original markup.
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggle = (index: number) =>
    setOpenItems((items) =>
      items.includes(index)
        ? items.filter((item) => item !== index)
        : [...items, index],
    );

  return (
    <section id="faq" className="faq section">
      <SectionTitle
        title="Frequently Asked Questions"
        description="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem"
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {FAQS.map((faq, index) => (
                <div
                  className={`faq-item${openItems.includes(index) ? " faq-active" : ""}`}
                  key={faq.question}
                >
                  <h3 onClick={() => toggle(index)}>{faq.question}</h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i
                    className="faq-toggle bi bi-chevron-right"
                    onClick={() => toggle(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
