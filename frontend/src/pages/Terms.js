import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/terms.css";

const sections = [
    {
        title: "Acceptance of Terms",
        text:
            "By accessing Vido Prompt you agree to follow these Terms of Service and all applicable laws and regulations. If you disagree with any term, you should stop using the site immediately."
    },
    {
        title: "Eligibility & Accounts",
        text:
            "You must be at least 13 years old to create an account. When you register, provide accurate information and keep your credentials secure. You are responsible for all activity that occurs under your account."
    },
    {
        title: "Community Use",
        text:
            "Vido Prompt is a collaborative gallery. Use the service to share and learn—not to spam, harass, or otherwise disrupt the community. We reserve the right to suspend accounts that violate these rules or applicable laws.",
        bullets: [
            "Respect other creators and refrain from hateful, discriminatory, or explicit material.",
            "Do not post content that infringes copyrights, trademarks, or other third-party rights.",
            "Avoid automated scraping or attempts to circumvent security measures.",
            "Do not monetize prompts or charge other users for access."
        ]
    },
    {
        title: "Refunds",
        text:
            "Because Vido Prompt provides instant access to digital credits and services, refunds are limited.",
        bullets: [
            "Cancel subscriptions anytime in the Customer Portal; we don’t prorate partial periods",
            "Duplicate charges or unauthorized transactions are refunded once verified",
            "Credit packs are generally non‑refundable once delivered",
        ]
    },
    {
        title: "Intellectual Property",
        text:
            "All site design, copy, and code remain the property of Vido Prompt or our licensors. Except for content you submit, you may not copy, modify, distribute, or reverse engineer platform assets without prior written consent.",
    },
    {
        title: "Disclaimers",
        text:
            "Vido Prompt is provided “as is.” We do not guarantee uninterrupted service, accuracy of prompts, or suitability of gallery assets for your projects. Use your own judgment before applying shared prompts and workflows.",
    },
    {
        title: "Limitation of Liability",
        text:
            "To the fullest extent permitted by law, Vido Prompt and its contributors are not liable for any indirect, incidental, or consequential damages arising from your use of the platform or reliance on community submissions.",
    },
    {
        title: "Changes to These Terms",
        text:
            "We may update these Terms to reflect new features or legal requirements. When changes are significant we will post the revised version and update the effective date. Continued use of the platform signifies acceptance of the updated Terms.",
    },
    {
        title: "Contact",
        text:
            "Have questions about these Terms or need to report a problem? Reach out to us so we can help keep the gallery healthy for everyone.",
        text:
            "Email support@bananaprompts.xyz",
    },
    {
        title: "Need a quick summary?",
        text:
            "Vido Prompt exists to help artists learn from each other. Play fair, credit fellow creators, and use prompts at your own discretion. We can remove content that breaks the spirit of collaboration or infringes on others. Questions? Reach out and we will do our best to resolve them quickly.",
    }
];

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* HEADER */}
            <Header />

            {/* PAGE CONTENT */}
            <main className="terms-page container">
                {/* HERO */}
                <section className="terms-hero">
                    <span className="terms-badge">TERMS OF SERVICE</span>

                    <h1>
                        Understand the rules that keep <br />
                        <span>Vido Prompt collaborative.</span>
                    </h1>

                    <p>
                        These Terms describe your rights and responsibilities while <br />
                        using Vido Prompt. Please review them carefully so we can <br />
                        maintain a respectful, inspiring space for AI artists everywhere. <br />
                    </p>

                    <small>Effective date: September 25, 2025</small>
                </section>

                {/* SECTIONS */}
                <section className="terms-grid">
                    {sections.map((sec, i) => (
                        <div
                            key={i}
                            className="terms-card"
                            style={{ animationDelay: `${i * 0.12}s` }}
                        >
                            <h3>{sec.title}</h3>

                            {sec.text && <p>{sec.text}</p>}

                            {sec.bullets && (
                                <ul>
                                    {sec.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            </main>

            {/* FOOTER */}
            <Footer />
        </>
    );
};

export default Terms;
