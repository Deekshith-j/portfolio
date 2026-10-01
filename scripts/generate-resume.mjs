import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  const escapePdf = (text) =>
    text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  let streamLines = [
    // Header Bar Dark Accent
    "0.05 0.05 0.08 rg",
    "0 770 595.28 72 re f",

    // Purple Accent Line
    "0.58 0.33 0.96 rg",
    "0 766 595.28 4 re f",

    // Name
    "BT",
    "/F1 22 Tf",
    "1 1 1 rg",
    "40 808 Td",
    `(${escapePdf("DEEKSHITH J")}) Tj`,
    "ET",

    // Headline
    "BT",
    "/F2 9.5 Tf",
    "0.85 0.8 0.98 rg",
    "40 788 Td",
    `(${escapePdf("Aspiring AI/ML Engineer | Python & Web Development")}) Tj`,
    "ET",

    // Contact line
    "BT",
    "/F2 8.2 Tf",
    "0.3 0.3 0.35 rg",
    "40 748 Td",
    `(${escapePdf("+91 9535892361  |  deekshithj188@gmail.com  |  linkedin.com/in/deekshith-j-5773b336b  |  github.com/Deekshith-j")}) Tj`,
    "ET",

    // Divider
    "0.85 0.85 0.88 RG",
    "1 w",
    "40 738 m 555 738 l S",

    // PROFESSIONAL SUMMARY
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 722 Td",
    `(${escapePdf("PROFESSIONAL SUMMARY")}) Tj`,
    "ET",

    "BT",
    "/F2 8.8 Tf",
    "0.15 0.15 0.18 rg",
    "40 706 Td",
    `(${escapePdf("B.Tech student in Artificial Intelligence and Data Science who builds and ships practical projects, from an IoT")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("water-quality monitor with a live cloud dashboard to a multilingual voice-based RAG assistant. National-level participant")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("in the OpenAI x NxtWave Buildathon. Seeking an AI/ML or full-stack internship.")}) Tj`,
    "ET",

    // TECHNICAL SKILLS
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 664 Td",
    `(${escapePdf("TECHNICAL SKILLS")}) Tj`,
    "ET",

    "BT",
    "/F1 8.5 Tf",
    "0.15 0.15 0.15 rg",
    "40 648 Td",
    `(${escapePdf("Languages: ")}) Tj`,
    "/F2 8.5 Tf",
    `(${escapePdf("Python, JavaScript, C++, HTML, CSS, Sqlite")}) Tj`,
    "0 -12 Td",
    "/F1 8.5 Tf",
    `(${escapePdf("Backend & Web: ")}) Tj`,
    "/F2 8.5 Tf",
    `(${escapePdf("Node.js, Express.js, REST APIs, React, Next.js, Tailwind CSS, Supabase, Firebase")}) Tj`,
    "0 -12 Td",
    "/F1 8.5 Tf",
    `(${escapePdf("AI / ML: ")}) Tj`,
    "/F2 8.5 Tf",
    `(${escapePdf("LLM applications, Basic RAG, Prompt Engineering")}) Tj`,
    "0 -12 Td",
    "/F1 8.5 Tf",
    `(${escapePdf("Tools & Hardware: ")}) Tj`,
    "/F2 8.5 Tf",
    `(${escapePdf("Git, GitHub, Vercel, Arduino, ESP32, Docker, FAISS  |  Others: Basic DSA (C++)")}) Tj`,
    "ET",

    // PROJECTS
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 588 Td",
    `(${escapePdf("PROJECTS")}) Tj`,
    "ET",

    // Project 1
    "BT",
    "/F1 9 Tf",
    "0.1 0.1 0.1 rg",
    "40 572 Td",
    `(${escapePdf("Crystal-Agent - Voice Question-Answering Assistant  |  Personal Project  |  GitHub")}) Tj`,
    "/F2 8.2 Tf",
    "0 -11 Td",
    `(${escapePdf("Tech Stack: Python, FAISS, Next.js, Docker")}) Tj`,
    "0 -11 Td",
    `(${escapePdf("• Voice assistant that answers questions in English, Hindi, Kannada and Marathi using a large document collection.")}) Tj`,
    "0 -10.5 Td",
    `(${escapePdf("• Searches in two ways (by keywords and by meaning) so answers come from real data, and returns fallback when none found.")}) Tj`,
    "0 -10.5 Td",
    `(${escapePdf("• Fast: finds the best answer in about 157 ms.")}) Tj`,
    "ET",

    // Project 2
    "BT",
    "/F1 9 Tf",
    "0.1 0.1 0.1 rg",
    "40 514 Td",
    `(${escapePdf("HydroVision AI - Water Quality Monitor  |  Group Project  |  GitHub")}) Tj`,
    "/F2 8.2 Tf",
    "0 -11 Td",
    `(${escapePdf("Tech Stack: Arduino, ESP32, Firebase, React, TypeScript  |  [Role: Team Lead, Hardware, Backend & Database]")}) Tj`,
    "0 -11 Td",
    `(${escapePdf("• Sensors measure water pH, dissolved solids, cloudiness and temperature.")}) Tj`,
    "0 -10.5 Td",
    `(${escapePdf("• An ESP32 sends the readings to the cloud, and a web dashboard shows live data, a map and alerts when water is unsafe.")}) Tj`,
    "ET",

    // Project 3
    "BT",
    "/F1 9 Tf",
    "0.1 0.1 0.1 rg",
    "40 467 Td",
    `(${escapePdf("AI Scholarship Agent  |  Personal Project  |  GitHub")}) Tj`,
    "/F2 8.2 Tf",
    "0 -11 Td",
    `(${escapePdf("Tech Stack: JavaScript, Node.js, Express.js, Google Gemini API")}) Tj`,
    "0 -11 Td",
    `(${escapePdf("• Finds scholarships for a student and ranks them by how well they match the student profile.")}) Tj`,
    "0 -10.5 Td",
    `(${escapePdf("• Uses small AI agents for each job (search, eligibility, essay help, deadlines).")}) Tj`,
    "ET",

    // Project 4
    "BT",
    "/F1 9 Tf",
    "0.1 0.1 0.1 rg",
    "40 420 Td",
    `(${escapePdf("JanSeva - Government Service Booking  |  Group Project  |  GitHub")}) Tj`,
    "/F2 8.2 Tf",
    "0 -11 Td",
    `(${escapePdf("Tech Stack: TypeScript, Supabase, Vercel  |  [Role: Team Lead, Backend, Database]")}) Tj`,
    "0 -11 Td",
    `(${escapePdf("• Website where citizens book government services and join queues online, so they wait less in person.")}) Tj`,
    "ET",

    // ACHIEVEMENTS
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 373 Td",
    `(${escapePdf("ACHIEVEMENTS")}) Tj`,
    "ET",

    "BT",
    "/F2 8.5 Tf",
    "0.15 0.15 0.18 rg",
    "40 357 Td",
    `(${escapePdf("• National-Level Participant, OpenAI x NxtWave Buildathon - built an AI-driven solution with a team under time constraints.")}) Tj`,
    "ET",

    // EDUCATION
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 330 Td",
    `(${escapePdf("EDUCATION")}) Tj`,
    "ET",

    "BT",
    "/F1 9 Tf",
    "0.1 0.1 0.1 rg",
    "40 314 Td",
    `(${escapePdf("B.Tech, Artificial Intelligence and Data Science")}) Tj`,
    "/F2 8.5 Tf",
    `(${escapePdf("                                                                                Aug 2025 - Jun 2029")}) Tj`,
    "0 -12 Td",
    `(${escapePdf("Sanjay Ghodawat University                                                                                                          1st Year CGPA: 8.55")}) Tj`,
    "ET",

    // CORE COMPETENCIES
    "BT",
    "/F1 10.5 Tf",
    "0.35 0.1 0.85 rg",
    "40 274 Td",
    `(${escapePdf("CORE COMPETENCIES")}) Tj`,
    "ET",

    "BT",
    "/F2 8.5 Tf",
    "0.15 0.15 0.18 rg",
    "40 258 Td",
    `(${escapePdf("Communication  *  Leadership  *  Teamwork  *  Analytical Thinking  *  Adaptability")}) Tj`,
    "ET",

    // Footer
    "0.88 0.88 0.9 RG",
    "1 w",
    "40 50 m 555 50 l S",

    "BT",
    "/F2 7.5 Tf",
    "0.5 0.5 0.55 rg",
    "40 36 Td",
    `(${escapePdf("Deekshith J  |  github.com/Deekshith-j  |  linkedin.com/in/deekshith-j-5773b336b  |  deekshithj188@gmail.com")}) Tj`,
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

  const xrefOffset = currentOffset;
  let xref = "xref\n0 " + (content.filter((c) => c.includes(" 0 obj")).length + 1) + "\n";
  xref += "0000000000 65535 f \n";

  for (let i = 1; i < xrefOffsets.length; i++) {
    const offStr = String(xrefOffsets[i]).padStart(10, "0");
    xref += `${offStr} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${xrefOffsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  const fullPdf = body + xref + trailer;

  const publicDir = path.resolve(__dirname, "../public");
  fs.writeFileSync(path.join(publicDir, "Deekshith_J_AI_ML_Engineer_Resume.pdf"), fullPdf);
  console.log("Written updated resume PDF!");
}

createPdf();
