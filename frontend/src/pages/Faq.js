import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/terms.css";

const sections = [
    {
        title: "What is Banana Prompts?",
        text:
            "Banana Prompts is a free community platform where creators share and discover AI-generated art prompts optimized for Google Gemini's Nano Banana model as well as other image models such as Midjourney, Stable Diffusion, DALL-E, ChatGPT with GPT-4o integration, Leonardo, Adobe Firefly, Ideogram, and Craiyon. The gallery spotlights aesthetics like fashion, portraits, urban streetwear, and photorealistic imagery so artists can experiment and inspire one another across tools.",
    },
    {
        title: "How do I share a prompt on Banana Prompts?",
        text:
            "Head to the submission page, paste your prompt, optionally upload the generated image, add descriptive tags like 'Fashion' or 'Portrait', and mention any models the prompt was tuned for (Nano Banana, Midjourney, Stable Diffusion, DALL-E, etc.). Submissions are reviewed daily and the most helpful ones are featured on the homepage.",
    },
    {
        title: "What is Google Gemini's Nano Banana model?",
        text:
            "Nano Banana is a specialized variant of Google's Gemini AI designed for high-quality image generation. It excels at vibrant, detailed visuals—think fashion lookbooks, stylised portraits, and scenic artwork—making it a strong companion to Midjourney, Stable Diffusion, DALL-E, GPT-4o image features, Leonardo, Adobe Firefly, Ideogram, and Craiyon.",
    },
    {
        title: "How can I create effective Nano Banana prompts?",
        text:
            "Start with descriptive language that covers style, subject, lighting, palette, and composition. Example: A close-up portrait of a teenage girl with curly hair in golden hour lighting, Nano Banana style. Test variations across Nano Banana, Midjourney, Stable Diffusion, DALL-E, ChatGPT, Leonardo, Firefly, Ideogram, or Craiyon and share the best versions back to the community for feedback.",
    },
    {
        title: "Is Banana Prompts free to use?",
        text:
            "Yes for prompts. Browsing and sharing prompts is free. Generating images in the Studio uses paid credits. Some paid plans include access to curated premium prompts authored by Banana Prompts (admins).",
    },
    {
        title: "Can I use shared prompts for commercial projects?",
        text:
            "Most prompts are shared under a Creative Commons-friendly approach so you can experiment personally or commercially. Always double-check the contributor's notes and remember that each AI model (Gemini, Midjourney, Stable Diffusion, DALL-E, etc.) has its own usage policies for generated assets.",
    },
    {
        title: "How do I get my prompt featured on the homepage?",
        text:
            "Submit original prompts with crisp descriptions and striking visuals tuned for models like Google Gemini Nano Banana, Midjourney, Stable Diffusion, or DALL-E. Community votes, uniqueness, and participation in themed challenges such as Fashion Friday improve your chances of being highlighted.",
    },
    {
        title: "What are popular prompt categories on Banana Prompts?",
        text:
            "Fashion and streetwear looks, expressive portraits, vaporwave and minimalist aesthetics, fantasy landscapes, and experimental lighting setups dominate the trending list. You can adapt prompts for Gemini Nano Banana or remix them in Midjourney, Stable Diffusion, ChatGPT, Leonardo, Firefly, Ideogram, Craiyon, and more.",
    },
    {
        title: "Why should I share my prompts instead of just browsing?",
        text:
            "Sharing fuels collaboration—other creators can remix your ideas, offer constructive tips, and showcase how the prompt performs across different models (Nano Banana, Midjourney, Stable Diffusion, DALL-E, ChatGPT, Leonardo, Firefly, Ideogram, Craiyon). You also build a public portfolio that can attract collaborators or clients.",
    },
    {
        title: "How do I contact the Banana Prompts team?",
        text:
            "Email us at support@bananaprompts.xyz or reach out on X (Twitter) @bananaprompts. We usually reply within 24–48 hours about everything from model compatibility to community initiatives.",
    },
    {
        title: "Are there community guidelines for sharing prompts?",
        text:
            "Yes. Keep submissions original, respectful, and relevant to AI image exploration. Avoid spam, copyrighted content, and offensive material. We moderate posts to keep the gallery inspiring; repeated violations can lead to removal. Full guidelines appear on the submit page and footer links.",
    },
    {
        title: "What if my prompt doesn't generate the expected image in Gemini?",
        text:
            "Iterate with more detail—add camera terms, materials, or lighting cues. Try inspiration from the gallery and compare results across Nano Banana, Midjourney, Stable Diffusion, DALL-E, ChatGPT, Leonardo, Firefly, Ideogram, or Craiyon. If you get stuck, drop a comment and the community will help troubleshoot.",
    },
    {
        title: "How does Nano Banana compare to other AI image models?",
        text:
            "Nano Banana delivers photorealistic, aesthetic-first results with fast generation and tight integration inside Google's ecosystem. Midjourney is known for painterly, community-driven styles; Stable Diffusion is open-source and endlessly tweakable; DALL-E (via ChatGPT) excels at surreal concepts; Leonardo, Firefly, and Ideogram cover advanced editing, brand-safe outputs, or precise typography. Banana Prompts helps you swap prompts among them to learn what each does best.",
    },
    {
        title: "Can I adapt Banana Prompts for other AI models?",
        text:
            "Absolutely. Every prompt can be tuned for ChatGPT image tools, DALL-E, Midjourney, Stable Diffusion, Leonardo, Adobe Firefly, Ideogram, Craiyon, and more. Adjust descriptors to suit each model's strengths—Banana Prompts provides the starting point, you decide the destination.",
    },
];

const Faq = () => {
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
                    <span className="terms-badge">FREQUENTLY ASKED QUESTIONS </span>

                    <h1>
                        Everything you need to know about Banana Prompts & Nano Banana prompts. <br />
                    </h1>

                    <p>
                        Learn how to share, remix, and adapt AI art prompts for Google <br></br>
                        Gemini's Nano Banana model, Midjourney, Stable Diffusion, DALL- <br></br>
                        E, ChatGPT, Leonardo, Adobe Firefly, Ideogram, Craiyon, and more.
                    </p>

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

export default Faq;
