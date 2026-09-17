"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString().trim() || "";
    const messageText = formData.get("message")?.toString().trim() || "";

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message: messageText }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Your message has been sent successfully! Thank you.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="php-email-form">
      <div className="row gy-4">
        <div className="col-12">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="col-12 ">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="col-12">
          <input
            type="text"
            className="form-control"
            name="subject"
            placeholder="Subject"
            required
          />
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            name="message"
            rows={6}
            placeholder="Message"
            required
          />
        </div>

        <div className="col-12 text-center">
          {status === "success" && (
            <div className="sent-message d-block bg-success-subtle text-success rounded-3 py-2 px-3 mb-3">
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="error-message d-block bg-danger-subtle text-danger rounded-3 py-2 px-3 mb-3">
              {message}
            </div>
          )}

          <button
            type="submit"
            aria-label="Send Message"
            disabled={status === "loading"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "52px",
              width: "100%",
              padding: "14px 30px",
              border: "none",
              borderRadius: "999px",
              backgroundColor: "#f97316",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              lineHeight: "1",
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(249, 115, 22, 0.25)",
              transition:
                "background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (status === "loading") return;
              e.currentTarget.style.backgroundColor = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(234, 88, 12, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 24px rgba(249, 115, 22, 0.25)";
            }}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}