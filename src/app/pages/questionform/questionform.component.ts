import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ElementRef, ViewChild } from '@angular/core';

const genAI = new GoogleGenerativeAI("AIzaSyAPVnQ6AineGDWKWNfUGuTCpuQ3DmGjPxw");

@Component({

  selector: 'app-questionform',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './questionform.component.html',
  styleUrl: './questionform.component.css',
  standalone: true
})
export class QuestionformComponent {

  @ViewChild('questionsSection') questionsSection!: ElementRef;

  aiFeedbackList: {
  question: string;
  answer: string;
  rating: string;
  corrections: string;
}[] = [];

  aiFeedback: string = '';
  questionAnswers: { [key: string]: string } = {};
  jobForm: FormGroup;
  selectedFile: File | null = null;
  fileName = '';
  resumeData: any = null;
  questions: string[] = [];
  pastQuestions: string[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.jobForm = this.fb.group({
      job_title: ['', Validators.required],
      specific_job_title: [''],
      estimated_experience: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      tools_used: ['']  // 🆕 Added field
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png'];

      if (!allowedTypes.includes(file.type)) {
        console.error('Unsupported file type:', file.type);
        this.selectedFile = null;
        this.fileName = '';
        return;
      }

      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onFileSend() {
  if (!this.selectedFile) return;

  this.api.uploadResume(this.selectedFile).subscribe({
    next: (res: any) => {
  console.log('📦 Full server response:', res);

  if (!res?.data) {
    console.warn('⚠️ No resume data returned.');
    return;
  }

  this.resumeData = res.data;
  this.jobForm.patchValue({
    job_title: res.data.job_title || '',
    specific_job_title: '',
    estimated_experience: res.data.experience_level || 1,
    tools_used: res.data.tools_used?.join(', ') || ''
  });

  console.log('✅ Resume parsed & form filled');
}

,
    error: (err: any) => console.error('❌ Upload failed:', err)
  });
}
  async getFeedbackForAnswers(qnaList: { question: string, answer: string }[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You're an expert technical interviewer. Given the following Q&A, give a score and suggestion.

Return only a JSON array like:
[
  {
    "question": "What is XYZ?",
    "original_answer": "abc",
    "rating": 7,
    "suggested_answer": "Corrected and complete version here."
  }
]

Q&A:
${JSON.stringify(qnaList)}
  `;

  try {
    const result = await model.generateContent(prompt);
    let raw = result.response.text().trim();

    if (raw.startsWith("```")) raw = raw.split("```")[1].trim();
    if (raw.startsWith("json")) raw = raw.slice(4).trim();

    const feedback = JSON.parse(raw);
    console.log("🧪 Feedback:", feedback);
    return feedback;
  } catch (err) {
    console.error("❌ Failed to get feedback:", err);
    return [];
  }
}

  async onSubmitAnswers() {
  if (!Object.keys(this.questionAnswers).length) {
    console.warn("No answers submitted.");
    return;
  }

  const qaPairs = this.questions.map(q => ({
    question: q,
    answer: this.questionAnswers[q] || "No answer provided"
  }));

  const prompt = `
Rate and correct the following candidate answers for a technical interview.
Return a JSON array with:
{
  "question": "",
  "answer": "",
  "rating": "x/10",
  "corrections": ""
}
Only return valid JSON. No extra commentary.

${JSON.stringify(qaPairs, null, 2)}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let raw = result.response.text().trim();

    if (raw.startsWith("```")) raw = raw.split("```")[1].trim();
    if (raw.startsWith("json")) raw = raw.slice(4).trim();

    const feedback = JSON.parse(raw);
    this.aiFeedbackList = feedback;
  } catch (err) {
    console.error("❌ Error during answer evaluation:", err);
  }
}


async onGenerate() {
    this.questions = [];
    this.questionAnswers = {};
    this.aiFeedbackList = [];

    if (!this.jobForm.valid) {
      console.warn('Form invalid, fix it first.');
      return;
    }

    const profile = {
      ...this.jobForm.value,
      ...(this.resumeData ?? {})
    };

    const prompt = `
Based on the following candidate info, generate 10 unique and relevant technical interview questions.
Avoid duplicates from past questions. Return ONLY a valid JSON array of strings.

Candidate Info:
Name: ${(profile.name ?? 'N/A')}
Job Title: ${profile.job_title}
Experience Level: ${profile.estimated_experience}/10
Tools: ${(profile.tools_used ?? 'N/A')}

Past Questions:
${this.pastQuestions.length ? this.pastQuestions.map(q => `- ${q}`).join('\n') : 'None'}
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      let raw = result.response.text().trim();

      if (raw.startsWith("```")) raw = raw.split("```")[1].trim();
      if (raw.startsWith("json")) raw = raw.slice(4).trim();

      const newQs: string[] = JSON.parse(raw);
      const filteredQs = newQs.filter(q => !this.pastQuestions.includes(q));

      this.questions.push(...filteredQs);
      this.pastQuestions.push(...filteredQs);

      // 👇 Scroll to the questions after they're rendered
      setTimeout(() => {
        if (this.questionsSection) {
          this.questionsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);

    } catch (err) {
      console.error('Gemini frontend error:', err);
    }
  }
}
//  async onGenerate() {
//    this.questions = [];
//    this.questionAnswers = {};
//    this.aiFeedbackList = [];

//    if (!this.jobForm.valid) {
//      console.warn('Form invalid, fix it first.');
//      return;
//    }

//    const profile = {
//      ...this.jobForm.value,
//      ...(this.resumeData ?? {})
//    };

//    const prompt = `
//Based on the following candidate info, generate 10 unique and relevant technical interview questions.
//Avoid duplicates from past questions. Return ONLY a valid JSON array of strings.

//Candidate Info:
//Name: ${(profile.name ?? 'N/A')}
//Job Title: ${profile.job_title}
//Experience Level: ${profile.estimated_experience}/10
//Tools: ${(profile.tools_used ?? 'N/A')}

//Past Questions:
//${this.pastQuestions.length ? this.pastQuestions.map(q => `- ${q}`).join('\n') : 'None'}
//    `;

//    try {
//      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//      const result = await model.generateContent(prompt);
//      let raw = result.response.text().trim();

//      if (raw.startsWith("```")) raw = raw.split("```")[1].trim();
//      if (raw.startsWith("json")) raw = raw.slice(4).trim();

//      const newQs: string[] = JSON.parse(raw);
//      const filteredQs = newQs.filter(q => !this.pastQuestions.includes(q));

//      this.questions.push(...filteredQs);
//      this.pastQuestions.push(...filteredQs);
//    } catch (err) {
//      console.error('Gemini frontend error:', err);
//    }
//  }

