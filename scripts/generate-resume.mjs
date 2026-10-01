import fs from "fs";
import path from "path";

function createPdf() {
  const content = [
    "%PDF-1.4",
    "1 0 obj",
    "<< /Type /Catalog /Pages 2 0 R >>",
    "endobj",
    "2 0 obj",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "endobj",
    "3 0 obj",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "endobj",
    "4 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "endobj",
    "5 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "endobj",
  ];

  // Helper to escape text for PDF syntax
  const escapePdf = (text) =>
    text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  // PDF stream stream commands
  let streamLines = [
    // Header Bar
    "0.05 0.05 0.08 rg",
    "0 770 595.28 72 re f",

    // Accent Line
    "0.54 0.25 0.95 rg",
    "0 766 595.28 4 re f",

    // Header Text
    "BT",
    "/F1 22 Tf",
    "1 1 1 rg",
    "40 808 Td",
    `(${escapePdf("DEEKSHITH J")}) Tj`,
    "ET",

    "BT",
    "/F2 10 Tf",
    "0.8 0.75 0.95 rg",
    "40 788 Td",
    `(${escapePdf("AI & MACHINE LEARNING ENGINEER  |  OPENAI x NXTWAVE FINALIST")}) Tj`,
    "ET",

    // Contact Info Bar
    "BT",
    "/F2 8.5 Tf",
    "0.3 0.3 0.35 rg",
    "40 746 Td",
    `(${escapePdf("Email: deekshithj188@gmail.com  |  Phone: +91 95358 92361  |  Bengaluru, India  |  GitHub: @deekshith  |  LinkedIn: in/deekshith-j")}) Tj`,
    "ET",

    // Horizontal divider
    "0.85 0.85 0.88 RG",
    "1 w",
    "40 736 m 555 736 l S",

    // SECTION: SUMMARY
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 716 Td",
    `(${escapePdf("PROFESSIONAL SUMMARY")}) Tj`,
    "ET",

    "BT",
    "/F2 9.5 Tf",
    "0.15 0.15 0.18 rg",
    "40 698 Td",
    `(${escapePdf("Computer Science undergraduate specializing in Artificial Intelligence and Data Science. Driven AI/ML engineer")}) Tj`,
    "0 -14 Td",
    `(${escapePdf("focused on engineering grounded Retrieval-Augmented Generation (RAG) architectures, autonomous agent workflows,")}) Tj`,
    "0 -14 Td",
    `(${escapePdf("and reliable backend systems using Python, LangChain, and LangSmith. Experienced in reducing hallucinations and optimizing LLMs.")}) Tj`,
    "ET",

    // SECTION: KEY ACHIEVEMENTS
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 644 Td",
    `(${escapePdf("HONORS & NATIONAL RECOGNITIONS")}) Tj`,
    "ET",

    "BT",
    "/F1 9.5 Tf",
    "0.1 0.1 0.1 rg",
    "40 626 Td",
    `(${escapePdf("OpenAI x NxtWave Buildathon Finalist")}) Tj`,
    "/F2 9.5 Tf",
    " (National Level)",
    " Tj",
    "0 -14 Td",
    `(${escapePdf("• Competed among top student developer teams across India to architect and build an autonomous AI-driven application.")}) Tj`,
    "0 -13 Td",
    `(${escapePdf("• Engineered rapid prototyping, prompt grounding, and API integrations under rigorous hackathon constraints.")}) Tj`,
    "ET",

    // SECTION: PROJECTS
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 572 Td",
    `(${escapePdf("FEATURED AI & SOFTWARE PROJECTS")}) Tj`,
    "ET",

    // Project 1
    "BT",
    "/F1 10 Tf",
    "0.1 0.1 0.1 rg",
    "40 554 Td",
    `(${escapePdf("Smart Queue Management System  |  Python, Artificial Intelligence")}) Tj`,
    "/F2 9 Tf",
    "0 -13 Td",
    `(${escapePdf("• Developed an intelligent queue and token scheduling platform reducing physical wait times in high-traffic environments.")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("• Implemented automated customer prioritization scoring and real-time dynamic queue rebalancing algorithms.")}) Tj`,
    "ET",

    // Project 2
    "BT",
    "/F1 10 Tf",
    "0.1 0.1 0.1 rg",
    "40 514 Td",
    `(${escapePdf("AI Scholarship Recommendation Agent  |  Python, LLMs, Prompt Engineering")}) Tj`,
    "/F2 9 Tf",
    "0 -13 Td",
    `(${escapePdf("• Built an intelligent recommendation agent that analyzes student eligibility criteria and maps optimal scholarship opportunities.")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("• Designed specialized system prompts and context extractors to provide structured, explainable match justifications.")}) Tj`,
    "ET",

    // Project 3
    "BT",
    "/F1 10 Tf",
    "0.1 0.1 0.1 rg",
    "40 474 Td",
    `(${escapePdf("Enterprise HR Agent  |  Python, RAG, LangChain, LangSmith")}) Tj`,
    "/F2 9 Tf",
    "0 -13 Td",
    `(${escapePdf("• Engineered an end-to-end Retrieval-Augmented Generation (RAG) assistant for complex company policy and HR knowledge bases.")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("• Integrated LangSmith tracing and evaluation pipelines to monitor latency, inspect token usage, and eliminate hallucinations.")}) Tj`,
    "ET",

    // SECTION: TECHNICAL SKILLS
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 432 Td",
    `(${escapePdf("TECHNICAL SKILLS")}) Tj`,
    "ET",

    "BT",
    "/F1 9 Tf",
    "0.15 0.15 0.15 rg",
    "40 414 Td",
    `(${escapePdf("Programming Languages:")}) Tj`,
    "/F2 9 Tf",
    `(${escapePdf(" Python, C++, SQL, HTML, CSS")}) Tj`,
    "0 -14 Td",
    "/F1 9 Tf",
    `(${escapePdf("AI & LLM Frameworks:")}) Tj`,
    "/F2 9 Tf",
    `(${escapePdf(" RAG (Retrieval-Augmented Generation), LangChain, LangSmith, Prompt Engineering, Vector Stores")}) Tj`,
    "0 -14 Td",
    "/F1 9 Tf",
    `(${escapePdf("Core Competencies:")}) Tj`,
    "/F2 9 Tf",
    `(${escapePdf(" Data Structures & Algorithms, Object-Oriented Programming, API Design, System Architecture, Git/GitHub")}) Tj`,
    "ET",

    // SECTION: EDUCATION
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 354 Td",
    `(${escapePdf("EDUCATION")}) Tj`,
    "ET",

    "BT",
    "/F1 9.5 Tf",
    "0.1 0.1 0.1 rg",
    "40 336 Td",
    `(${escapePdf("Bachelor of Technology (B.Tech) — Artificial Intelligence and Data Science")}) Tj`,
    "/F2 9 Tf",
    "0 -13 Td",
    `(${escapePdf("Sanjay Ghodawat University  |  2025 – 2029 (Expected)")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("Focus: Autonomous Agents, Deep Learning Foundations, Distributed Data Systems, Advanced Algorithms")}) Tj`,
    "ET",

    // SECTION: CERTIFICATIONS
    "BT",
    "/F1 11 Tf",
    "0.35 0.1 0.85 rg",
    "40 286 Td",
    `(${escapePdf("CERTIFICATIONS")}) Tj`,
    "ET",

    "BT",
    "/F2 9 Tf",
    "0.15 0.15 0.18 rg",
    "40 268 Td",
    `(${escapePdf("• Generative AI & Large Language Models — DeepLearning Academy (Prompt Engineering & RAG Pipelines)")}) Tj`,
    "0 -13 Td",
    `(${escapePdf("• Python for Data Science — DataScience Institute (NumPy, Pandas & Analytical Data Processing)")}) Tj`,
    "0 -13 Td",
    `(${escapePdf("• LangChain & LangSmith Agent Frameworks — Advanced Observability & Evaluation for Production LLMs")}) Tj`,
    "ET",

    // Footer Watermark
    "0.88 0.88 0.9 RG",
    "1 w",
    "40 50 m 555 50 l S",

    "BT",
    "/F2 7.5 Tf",
    "0.5 0.5 0.55 rg",
    "40 36 Td",
    `(${escapePdf("Deekshith J — AI & ML Engineer Portfolio Dossier  |  Verified & Digitally Generated 2026")}) Tj`,
    "ET",
  ];

  const streamContent = streamLines.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf8");

  content.push("6 0 obj");
  content.push(`<< /Length ${streamLength} >>`);
  content.push("stream");
  content.push(streamContent);
  content.push("endstream");
  content.push("endobj");

  // Calculate cross-reference table
  let body = "";
  const xrefOffsets = [0];
  let currentOffset = 0;

  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    if (item.includes(" 0 obj")) {
      xrefOffsets.push(currentOffset);
    }
    body += item + "\n";
    currentOffset = Buffer.byteLength(body, "utf8");
  }

  const xrefStart = currentOffset;
  let xref = "xref\n";
  xref += `0 ${xrefOffsets.length}\n`;
  xref += "0000000000 65535 f \n";

  for (let i = 1; i < xrefOffsets.length; i++) {
    const offsetStr = String(xrefOffsets[i]).padStart(10, "0");
    xref += `${offsetStr} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${xrefOffsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  const finalPdf = body + xref + trailer;

  const publicDir = path.resolve("public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "Deekshith_J_AI_ML_Engineer_Resume.pdf");
  fs.writeFileSync(outputPath, finalPdf, "utf8");
  console.log("Successfully generated:", outputPath, "size:", finalPdf.length);
}

createPdf();
