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

    if (!name || !email || !subject || !messageText) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // 100% front-end: no /api/contact, no Resend, no nodemailer, no SSR.
    // We simulate a successful send and store the inquiry in localStorage
    // so the user sees a demo inbox, then offer a mailto fallback.
    try {
      await new Promise((res) => setTimeout(res, 900));

      // Save to localStorage as a static "inbox" demo for the portfolio owner
      try {
        const inboxKey = "sn_inbox";
        const entry = { name, email, subject, message: messageText, at: new Date().toISOString() };
        const existing = JSON.parse(localStorage.getItem(inboxKey) || "[]");
        localStorage.setItem(inboxKey, JSON.stringify([entry, ...existing].slice(0, 50)));
      } catch {}

      setStatus("success");
      setMessage(
        "Message saved locally (static demo). In production this would email via your preferred client — click below to open your mail app if you want to send it for real."
      );
      form.reset();

      // Optional: also open mailto as a real fallback (user can cancel if they don't want to)
      // We delay slightly so the success UI is seen first.
      setTimeout(() => {
        const mailto = `mailto:nanaowusua1999@gmail.com?subject=${encodeURIComponent(
          `[Portfolio] ${subject}`
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${messageText}`)}`;
        // We do not auto-navigate to avoid surprising the user; instead we expose a mailto button below.
      }, 400);
    } catch {
      setStatus("error");
      setMessage("Something went wrong locally. Please try again or email nanaowusua1996@gmail.com directly.");
    }
  };

  const buildMailto = () => {
    // Fallback mailto built from last success — we keep it generic if no data
    return `mailto:nanaowusua1996@gmail.com?subject=${encodeURIComponent("[Portfolio] Inquiry")}`;
  };

  return (
    <form onSubmit={onSubmit} className="php-email-form">
      <div className="row gy-4">
        <div className="col-12">
          <input type="text" name="name" className="form-control" placeholder="Your Name" required />
        </div>

        <div className="col-12 ">
          <input type="email" className="form-control" name="email" placeholder="Your Email" required />
        </div>

        <div className="col-12">
          <input type="text" className="form-control" name="subject" placeholder="Subject" required />
        </div>

        <div className="col-12">
          <textarea className="form-control" name="message" rows={6} placeholder="Message" required />
        </div>

        <div className="col-12 text-center">
          {status === "success" && (
            <>
              <div className="sent-message d-block bg-success-subtle text-success rounded-3 py-2 px-3 mb-3">
                {message}
              </div>
              <a
                href={buildMailto()}
                className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none small fw-semibold"
                style={{ color: "#f97316" }}
              >
                <i className="bi bi-envelope-arrow-up" /> Open in your email app
              </a>
            </>
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
              transition: "background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (status === "loading") return;
              e.currentTarget.style.backgroundColor = "#ea580c";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(249, 115, 22, 0.25)";
            }}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          <p className="small text-muted mt-2 mb-0">
            Static front-end demo — no server required. Your message is kept in this browser only.
          </p>
        </div>
      </div>
    </form>
  );
}
