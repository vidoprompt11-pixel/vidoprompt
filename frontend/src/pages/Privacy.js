import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/terms.css";

const sections = [
    {
        title: "Data Sharing and Disclosure",
        text:
            "We do not sell your personal information. We only share data in limited circumstances necessary to operate the service or comply with legal obligations.",
        bullets: [
            "Public content: Images and prompts you submit are visible to all users",
            "Service providers: Third-party services listed above that help operate the platform",
            "Legal compliance: When required by law or to protect our rights and users",
            "Business transfers: In the event of a merger, acquisition, or sale of assets"
        ]
    },
    {
        title: "Data Security",
        text:
            "We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
        bullets: [
            "Encrypted connections (HTTPS) for all data transmission",
            "Secure authentication via OAuth 2.0",
            "Regular security updates and monitoring",
            "Limited employee access to personal data"
        ]
    },
    {
        title: "Your Rights and Choices",
        text:
            "You have control over your data and how it's used on Vido Prompt. You can exercise these rights at any time through your account settings or by contacting us.  ",
        bullets: [
            "Access: View and download your personal information",
            "Correction: Update inaccurate or incomplete data",
            "Deletion: Request removal of your account and associated data",
            "Opt-out: Unsubscribe from promotional communications",
            "Portability: Export your data in a structured format"
        ]
    },
    {
        title: "Cookies and Tracking",
        text:
            "We use cookies and similar technologies to maintain your session, remember preferences, and analyze site usage. Most browsers allow you to control cookie settings.",
        bullets: [
            "Authentication cookies: Keep you logged in across sessions",
            "Preference cookies: Remember your theme and display settings",
            "Analytics: Understand how users interact with the platform"
        ]
    },
    {
        title: "Children's Privacy",
        text:
            "Vido Prompt is not intended for children under 13. We do not knowingly collect personal information from children. If we learn we have collected data from a child under 13, we will delete it promptly.",
    },
    {
        title: "International Data Transfers",
        text:
            "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.",
    },
    {
        title: "Changes to This Privacy Policy",
        text:
            "We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we make significant changes, we will update the effective date and notify users through the platform.",
    },
    {
        title: "Contact Us",
        text:
            "If you have questions about this Privacy Policy or how we handle your data, please reach out to us. We're committed to addressing your privacy concerns.",
        text:
            "Email Vidoprompt11@gmail.com",
    },
    {
        title: "Quick Summary",
        text:
            "We collect information necessary to operate Vido Prompt and provide you with a great experience. Your submitted content is public, but we never sell your personal data. You can request access, correction, or deletion of your information at any time. Questions? Contact us at vidoprompt11@gmail.com.",
    },
];

const Privacy = () => {
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
                    <span className="terms-badge">PRIVACY POLICY</span>

                    <h1>
                        Your privacy matters to us. <br />
                    </h1>

                    <p>
                        This Privacy Policy explains how Vido Prompt collects, <br></br>
                        uses, and protects your personal information. We believe <br></br>
                        in transparency and giving you control over your data.
                    </p>

                    <small>Effective date: January 25, 2026</small>
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

export default Privacy;
