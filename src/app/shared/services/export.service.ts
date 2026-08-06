import { Injectable } from '@angular/core';

import { Summary } from '../../features/summary-component/models/summary-model';

import { jsPDF } from 'jspdf';

import {
    Document,
    Packer,
    Paragraph,
    HeadingLevel,
    TextRun
} from 'docx';

import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    /**
     * ----------------------------------------------------
     * PDF EXPORT
     * ----------------------------------------------------
     */

    exportPdf(summary: Summary): void {

        const pdf = new jsPDF();

        let y = 20;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);
        pdf.text("AI PDF NOTES", 20, y);

        y += 12;

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        pdf.text(`File : ${summary.fileName}`, 20, y);
        y += 8;

        pdf.text(`Generated : ${summary.uploadedAt}`, 20, y);
        y += 8;

        pdf.text(`AI Model : ${summary.aiModel}`, 20, y);
        y += 15;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("SUMMARY", 20, y);

        y += 10;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        const summaryLines = pdf.splitTextToSize(
            summary.summary,
            170
        );

        pdf.text(summaryLines, 20, y);

        y += summaryLines.length * 7 + 10;

        if (y > 250) {

            pdf.addPage();

            y = 20;

        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("KEY POINTS", 20, y);

        y += 10;

        pdf.setFont("helvetica", "normal");

        summary.keyPoints.forEach(point => {

            const lines = pdf.splitTextToSize(`• ${point}\n\n`, 170);

            pdf.text(lines, 20, y);

            y += lines.length * 7;

            if (y > 270) {

                pdf.addPage();

                y = 20;

            }

        });

        y += 10;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("FLASHCARDS", 20, y);

        y += 12;

        summary.flashcards.forEach((card, index) => {

            // Question

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(13);

            const questionLines = pdf.splitTextToSize(
                `Q${index + 1}. ${card.question}`,
                170
            );

            if (y + questionLines.length * 7 > 270) {

                pdf.addPage();

                y = 20;

            }

            pdf.text(questionLines, 20, y);

            y += questionLines.length * 7 + 4;

            // Answer Heading

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);

            pdf.text("Answer:", 25, y);

            y += 7;

            // Answer

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);

            const answerLines = pdf.splitTextToSize(
                card.answer,
                160
            );

            if (y + answerLines.length * 7 > 270) {

                pdf.addPage();

                y = 20;

            }

            pdf.text(answerLines, 30, y);

            y += answerLines.length * 7 + 10;

        });

        pdf.addPage();

        y = 20;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("QUIZ", 20, y);

        y += 10;

        pdf.setFont("helvetica", "normal");

        summary.quiz.forEach((quiz, index) => {

            pdf.text(`${index + 1}. ${quiz.question}`, 20, y);

            y += 7;

            quiz.options.forEach(option => {

                pdf.text(`- ${option}`, 25, y);

                y += 6;

            });

            pdf.setFont("helvetica", "bold");

            pdf.text(`Correct Answer: ${quiz.correctAnswer}`, 25, y);

            pdf.setFont("helvetica", "normal");

            y += 10;

            if (y > 270) {

                pdf.addPage();

                y = 20;

            }

        });

        pdf.addPage();

        y = 20;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);

        pdf.text("IMPORTANT QUESTIONS", 20, y);

        y += 12;

        summary.interviewQuestions.forEach((question, index) => {

            // Wrap Question
            pdf.setFont("helvetica", "bold");

            const questionLines = pdf.splitTextToSize(
                `${index + 1}. ${question.question}`,
                170
            );

            // Add a new page if needed before writing the question
            if (y + questionLines.length * 7 > 270) {

                pdf.addPage();

                y = 20;

            }

            pdf.text(questionLines, 20, y);

            y += questionLines.length * 7 + 5;

            // Wrap Answer
            pdf.setFont("helvetica", "normal");

            const answerLines = pdf.splitTextToSize(
                `Answer: ${question.answer}`,
                165
            );

            // Add a new page if needed before writing the answer
            if (y + answerLines.length * 7 > 270) {

                pdf.addPage();

                y = 20;

            }

            pdf.text(answerLines, 25, y);

            y += answerLines.length * 7 + 10;

        });

        pdf.save(`${summary.fileName}.pdf`);

    }

    /**
     * ----------------------------------------------------
     * DOCX EXPORT
     * ----------------------------------------------------
     */

    async exportDocx(summary: Summary): Promise<void> {

        const document = new Document({

            sections: [

                {

                    children: [

                        new Paragraph({

                            heading: HeadingLevel.TITLE,

                            children: [

                                new TextRun({

                                    text: "AI PDF NOTES",

                                    bold: true

                                })

                            ]

                        }),

                        new Paragraph(`File: ${summary.fileName}`),

                        new Paragraph(`Generated: ${summary.uploadedAt}`),

                        new Paragraph(`AI Model: ${summary.aiModel}`),

                        new Paragraph(""),

                        new Paragraph({

                            heading: HeadingLevel.HEADING_1,

                            text: "Summary"

                        }),

                        new Paragraph(summary.summary),

                        new Paragraph(""),

                        new Paragraph({

                            heading: HeadingLevel.HEADING_1,

                            text: "Key Points"

                        }),

                        ...summary.keyPoints.map(point =>
                            new Paragraph(`• ${point}`)
                        ),

                        new Paragraph({
                            heading: HeadingLevel.HEADING_1,
                            text: "Flashcards"
                        }),

                        ...summary.flashcards.flatMap((card, index) => [

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Question ${index + 1}`,
                                        bold: true,
                                        size: 28
                                    })
                                ]
                            }),

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: card.question,
                                        size: 24
                                    })
                                ]
                            }),

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Answer",
                                        bold: true,
                                        color: "2E8B57",
                                        size: 26
                                    })
                                ]
                            }),

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: card.answer,
                                        size: 24
                                    })
                                ]
                            }),

                            new Paragraph("")

                        ]),

                        new Paragraph({
                            heading: HeadingLevel.HEADING_1,
                            text: "Quiz"
                        }),

                        ...summary.quiz.flatMap((question, index) => [

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Question ${index + 1}`,
                                        bold: true,
                                        size: 28
                                    })
                                ]
                            }),

                            new Paragraph(question.question),

                            ...question.options.map((option, optionIndex) =>

                                new Paragraph(
                                    `${String.fromCharCode(65 + optionIndex)}. ${option}`
                                )

                            ),

                            new Paragraph({
                                children: [

                                    new TextRun({
                                        text: "Correct Answer: ",
                                        bold: true,
                                        color: "2E8B57"
                                    }),

                                    new TextRun({
                                        text: question.correctAnswer
                                    })

                                ]
                            }),

                            new Paragraph("")

                        ]),

                        new Paragraph({
                            heading: HeadingLevel.HEADING_1,
                            text: "Important Questions"
                        }),

                        ...summary.interviewQuestions.flatMap((question, index) => [

                            new Paragraph({
                                children: [

                                    new TextRun({
                                        text: `Question ${index + 1}`,
                                        bold: true,
                                        size: 28
                                    })

                                ]
                            }),

                            new Paragraph({
                                children: [

                                    new TextRun({
                                        text: question.question,
                                        size: 24
                                    })

                                ]
                            }),

                            new Paragraph({
                                children: [

                                    new TextRun({
                                        text: "Suggested Answer",
                                        bold: true,
                                        color: "2E8B57",
                                        size: 26
                                    })

                                ]
                            }),

                            new Paragraph({
                                children: [

                                    new TextRun({
                                        text: question.answer,
                                        size: 24
                                    })

                                ]
                            }),

                            new Paragraph("")

                        ])

                    ]

                }

            ]

        });

        const blob = await Packer.toBlob(document);

        saveAs(blob, `${summary.fileName}.docx`);

    }

    /**
     * ----------------------------------------------------
     * TXT EXPORT
     * ----------------------------------------------------
     */

    exportTxt(summary: Summary): void {

        let text = "";

        text += "=========================================\n";
        text += "           AI PDF NOTES\n";
        text += "=========================================\n\n";

        text += `File Name      : ${summary.fileName}\n`;
        text += `Generated On   : ${summary.uploadedAt}\n`;
        text += `AI Model       : ${summary.aiModel}\n`;

        text += "\n=========================================\n";
        text += "SUMMARY\n";
        text += "=========================================\n\n";

        text += `${summary.summary}\n\n`;

        // ------------------------------------
        // KEY POINTS
        // ------------------------------------

        text += "=========================================\n";
        text += "KEY POINTS\n";
        text += "=========================================\n\n";

        summary.keyPoints.forEach((point, index) => {

            text += `${index + 1}. ${point}\n\n`;

        });

        // ------------------------------------
        // FLASHCARDS
        // ------------------------------------

        text += "=========================================\n";
        text += "FLASHCARDS\n";
        text += "=========================================\n\n";

        summary.flashcards.forEach((card, index) => {

            text += `Flashcard ${index + 1}\n`;
            text += "-----------------------------------------\n";

            text += `Question:\n`;
            text += `${card.question}\n\n`;

            text += `Answer:\n`;
            text += `${card.answer}\n\n`;

        });

        // ------------------------------------
        // QUIZ
        // ------------------------------------

        text += "=========================================\n";
        text += "QUIZ\n";
        text += "=========================================\n\n";

        summary.quiz.forEach((quiz, index) => {

            text += `Question ${index + 1}\n`;
            text += "-----------------------------------------\n";

            text += `${quiz.question}\n\n`;

            quiz.options.forEach((option, optionIndex) => {

                const optionLetter = String.fromCharCode(65 + optionIndex);

                text += `${optionLetter}. ${option}\n`;

            });

            text += `\nCorrect Answer: ${quiz.correctAnswer}\n\n`;

        });

        // ------------------------------------
        // IMPORTANT QUESTIONS
        // ------------------------------------

        text += "=========================================\n";
        text += "IMPORTANT QUESTIONS\n";
        text += "=========================================\n\n";

        summary.interviewQuestions.forEach((question, index) => {

            text += `Question ${index + 1}\n`;
            text += "-----------------------------------------\n";

            text += `${question.question}\n\n`;

            text += "Suggested Answer:\n";
            text += `${question.answer}\n\n`;

        });

        // ------------------------------------
        // FOOTER
        // ------------------------------------

        text += "=========================================\n";
        text += "Generated by AI PDF Notes\n";
        text += "=========================================\n";

        const blob = new Blob(
            [text],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        saveAs(blob, `${summary.fileName}.txt`);

    }

    /**
     * ----------------------------------------------------
     * COPY
     * ----------------------------------------------------
     */

    async copySummary(summary: Summary): Promise<void> {

        await navigator.clipboard.writeText(summary.summary);

        alert("Summary copied successfully.");

    }

    /**
     * ----------------------------------------------------
     * SHARE
     * ----------------------------------------------------
     */

    async shareSummary(summary: Summary): Promise<void> {

        if (navigator.share) {

            await navigator.share({

                title: summary.fileName,

                text: summary.summary

            });

            return;

        }

        this.copySummary(summary);

    }

}