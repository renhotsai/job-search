import { UserProfileWithRelation } from "@/lib/types/user";
import * as docx from "docx";

export const createResume = (userProfileWithRelation:UserProfileWithRelation ) => {

	const userEducations = userProfileWithRelation.educations
	const userWorkExperience = userProfileWithRelation.workExperiences
	const skills = userProfileWithRelation.skills


	const sectionTitle = (text: string) =>
		new docx.Paragraph({
			text,
			heading: docx.HeadingLevel.HEADING_2,
			spacing: { before: 200, after: 100 },
		});

	const makeTwoColumnList = (items:string[]): docx.Table  => {
		if (items.length % 2 !== 0) items.push("");
		const rows = [];
		for (let i = 0; i < items.length; i += 2) {
			rows.push([items[i], items[i + 1]]);
		}
		return new docx.Table({
			width: { size: 100, type: docx.WidthType.PERCENTAGE },
			borders: {
				top: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
				bottom: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
				left: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
				right: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
				insideHorizontal: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
				insideVertical: { style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF" },
			},
			rows: rows.map(([left, right]) =>
				new docx.TableRow({
					children: [
						new docx.TableCell({
							children: [new docx.Paragraph(left)],
							borders: { top: { style: docx.BorderStyle.NONE } },
						}),
						new docx.TableCell({
							children: [new docx.Paragraph(right)],
							borders: { top: { style: docx.BorderStyle.NONE } },
						}),
					],
				})
			),
		});
	};

// === 各分區 ===
	const highlightSection = () => [
		sectionTitle("HIGHLIGHT OF QUALIFICATIONS"),
		makeTwoColumnList([
			"Agile development experience.",
			"JavaScript",
			"RESTful API",
			"C#",
			"Web-based applications and technologies",
			"React Native",
			"React",
			"Next.Js",
		]),
	];

	const technicalSkillsSection = () => [
		sectionTitle("TECHNICAL SKILLS"),
		new docx.Paragraph("Programming:\t\tJavaScript, Swift, Kotlin, C#"),
		new docx.Paragraph("Web:\t\t\t\tHTML5, CSS3, Node.js, Express.js"),
		new docx.Paragraph("Networking Systems:\tTCP/IP"),
		new docx.Paragraph("Database Management:\tMSSQL, MongoDB, Firebase, Postgres"),
		new docx.Paragraph("Operating Systems:\t\tLinux, Windows, MacOS"),
		new docx.Paragraph("Mobile Technologies:\tAndroid Studio, SwiftUI, React Native"),
	];

	const educationSection = () => [
		sectionTitle("EDUCATION"),
		new docx.Paragraph({
			children: [
				new docx.TextRun({ text: "Mobile Applic. Dev. & Strategy Postgrad Certificate", bold: true }),
				new docx.TextRun("\tSeptember 2023 – August 2024"),
			],
			spacing: { after: 100 },
		}),
		new docx.Paragraph("George Brown College | Toronto, ON"),
		...[
			"Mobile App Development for iOS and Android",
			"React Native",
			"Kotlin and Swift Programming Languages",
			"Client-Side Development Tools",
			"Server-Side Programming Concepts",
		].map(line => new docx.Paragraph(line)),
	];

	const projectsSection = () => [
		sectionTitle("PROJECTS"),
		new docx.Paragraph({
			children: [
				new docx.TextRun("Car Rent Application"),
				new docx.TextRun({ text: "\tMarch 2024", italics: true }),
			],
			spacing: { after: 100 },
		}),
		new docx.Paragraph("George Brown College | Toronto, ON"),
		new docx.Paragraph("Developed a responsive and intuitive mobile interface using React Native, enhancing the user experience."),
		new docx.Paragraph("Integrated Firebase for real-time data synchronization."),
		new docx.Paragraph("Implemented Firebase Authentication and Firestore for scalable backend."),
		new docx.Paragraph({
			children: [
				new docx.TextRun("Personal Portfolio"),
				new docx.TextRun({ text: "\tMay 2024", italics: true }),
			],
			spacing: { before: 200, after: 100 },
		}),
		new docx.Paragraph("Built with React, Tailwind CSS, Framer Motion, hosted on Vercel."),
		new docx.Paragraph("Integrated Postgres DB for robust data management."),
	];

	const experienceSection = () => [
		sectionTitle("PROFESSIONAL EXPERIENCE"),
		new docx.Paragraph({
			children: [
				new docx.TextRun("Backend Engineer"),
				new docx.TextRun({ text: "\tApril 2021 - August 2023", italics: true }),
			],
			spacing: { after: 100 },
		}),
		new docx.Paragraph("Collaborate | Taipei, Taiwan"),
		new docx.Paragraph("Integrated RESTful APIs with third-party payment systems."),
		new docx.Paragraph("Built logging for payment transaction tracing and debugging."),
		new docx.Paragraph("Managed MSSQL operations and query optimization."),

		new docx.Paragraph({
			children: [
				new docx.TextRun("Software Engineer"),
				new docx.TextRun({ text: "\tNovember 2020 – April 2021", italics: true }),
			],
			spacing: { before: 200, after: 100 },
		}),
		new docx.Paragraph("Harmonation Inc. | Taipei, Taiwan"),
		new docx.Paragraph("Developed banking apps using C#, optimized UI workflows."),
		new docx.Paragraph("Connected with MSSQL DB, improved data operations."),
		new docx.Paragraph("Used modular coding for maintainability and scalability."),
	];

	return new docx.Document({
		sections: [
			{
				headers: {
					default: new docx.Header({
						children: [
							new docx.Paragraph({
								alignment: docx.AlignmentType.CENTER,
								children: [new docx.TextRun({ text: "REN-HO (Jeremy) TSAI", bold: true, size: 32 })],
							}),
							new docx.Paragraph({
								alignment: docx.AlignmentType.CENTER,
								children: [
									new docx.TextRun("Toronto, ON • (437)-566-3471 • jeremy.tsai@georgebrown.ca"),
									new docx.TextRun("\nhttps://jeremy-tsai.vercel.app"),
								],
							}),
						],
					}),
				},
				children: [
					...highlightSection(),
					...technicalSkillsSection(),
					...educationSection(),
					...projectsSection(),
					...experienceSection(),
				],
			},
		],
	});
}
