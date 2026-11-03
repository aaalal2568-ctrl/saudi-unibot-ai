
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const newChat = document.getElementById("newChat");
const universitySelect = document.getElementById("universitySelect");
const universityDisplay = document.getElementById("universityDisplay");
const mascotTemplate = document.getElementById("mascotTemplate");

const CHAT_KEY = "saudi_unibot_chat_v3";
const UNIVERSITY_KEY = "saudi_unibot_university";

const welcomeMessage = `Welcome to Saudi UniBot AI! 🇸🇦

Your friendly university assistant for students across Saudi Arabia.

I can help you with:

📅 Academic Calendars
📚 Course Registration
📊 GPA Information
💰 Student Stipends
💼 Cooperative Training
💻 E-Learning
🏛️ Student Services
📖 Graduation Requirements

You can ask questions in English or Arabic.

Select your university to get started!`;

const knowledgeBase = [
  {
    keywords: ["exam", "exams", "final", "finals", "midterm", "test", "tests", "اختبار", "اختبارات", "نهائي", "فاينل"],
    en: `📅 Academic Calendar

Exam dates vary between Saudi universities.

1. Visit your university website.
2. Open the academic calendar.
3. Check your student portal.
4. Review course announcements.

Always verify official dates.`,
    ar: `📅 التقويم الأكاديمي

تختلف مواعيد الاختبارات بين الجامعات السعودية.

1. ادخلي على موقع جامعتك الرسمي.
2. افتحي التقويم الأكاديمي.
3. راجعي البوابة الأكاديمية.
4. تابعي إعلانات المقررات.

تأكدي دائمًا من المواعيد الرسمية.`
  },
  {
    keywords: ["registration", "register", "enroll", "course", "courses", "تسجيل", "مقررات", "مواد", "شعب"],
    en: `📚 Course Registration

General steps:

1. Log in to your student portal.
2. Open course registration.
3. Review available courses.
4. Check prerequisites.
5. Select courses.
6. Confirm your timetable.

Rules vary by university.`,
    ar: `📚 تسجيل المقررات

الخطوات العامة:

1. سجلي الدخول إلى البوابة الأكاديمية.
2. افتحي تسجيل المقررات.
3. راجعي المواد المتاحة.
4. تأكدي من المتطلبات السابقة.
5. اختاري المواد والشعب.
6. أكدي الجدول الدراسي.

قد تختلف الإجراءات حسب الجامعة.`
  },
  {
    keywords: ["gpa", "grade", "grades", "average", "معدل", "المعدل", "درجات", "تراكمي", "فصلي"],
    en: `📊 GPA Calculator

You can calculate your semester and cumulative GPA using our built-in calculator.

Open the GPA Calculator from the sidebar.

Remember to use your university's official grade-point scale.`,
    ar: `📊 حاسبة المعدل

تقدرين تحسبين المعدل الفصلي والتراكمي باستخدام الحاسبة الموجودة في الموقع.

افتحي GPA Calculator من القائمة الجانبية.

استخدمي نقاط الدرجات المعتمدة في جامعتك.`
  },
  {
    keywords: ["stipend", "stipends", "allowance", "financial", "مكافأة", "مكافاه", "مكافآت", "فلوس"],
    en: `💰 Student Stipends

Eligible students at Saudi public universities may receive monthly stipends.

Eligibility depends on university rules, enrollment status, and academic program.

Contact student affairs for official information.`,
    ar: `💰 المكافآت الجامعية

قد يحصل الطلاب المستحقون في الجامعات الحكومية السعودية على مكافآت شهرية.

تختلف شروط الاستحقاق حسب الجامعة والبرنامج والحالة الدراسية.

راجعي شؤون الطلاب لمعرفة التفاصيل الرسمية.`
  },
  {
    keywords: ["cooperative", "coop", "internship", "training", "تدريب", "تعاوني", "تمهير"],
    en: `💼 Cooperative Training

General steps:

1. Check your training eligibility.
2. Prepare your CV.
3. Apply to suitable organizations.
4. Obtain university approval.
5. Complete training requirements.
6. Submit your final report.

Requirements depend on your study plan.`,
    ar: `💼 التدريب التعاوني

الخطوات العامة:

1. تأكدي من استيفاء شروط التدريب.
2. جهزي سيرتك الذاتية.
3. قدمي على الجهات المناسبة.
4. احصلي على موافقة الجامعة.
5. أكملي متطلبات التدريب.
6. قدمي التقرير النهائي.

تختلف الشروط حسب الخطة الدراسية.`
  },
  {
    keywords: ["blackboard", "elearning", "e learning", "online learning", "platform", "بلاك بورد", "تعليم", "منصة", "الكتروني"],
    en: `💻 E-Learning Services

University learning platforms may offer:

• Online lectures
• Assignments
• Course materials
• Quizzes
• Announcements
• Grade reports

Use your university's official learning platform.`,
    ar: `💻 التعليم الإلكتروني

قد توفر منصات التعليم الجامعية:

• المحاضرات الإلكترونية
• الواجبات
• المحتوى الدراسي
• الاختبارات القصيرة
• الإعلانات
• الدرجات

استخدمي منصة جامعتك الرسمية.`
  },
  {
    keywords: ["support", "advisor", "contact", "help", "دعم", "مرشد", "مساعدة", "تواصل"],
    en: `💬 Academic Support

You can usually contact:

• Academic Advisors
• Student Affairs
• Department Offices
• University IT Support

Use official university channels.`,
    ar: `💬 الدعم الأكاديمي

يمكنك عادة التواصل مع:

• المرشد الأكاديمي
• عمادة شؤون الطلاب
• القسم الأكاديمي
• الدعم التقني بالجامعة

استخدمي قنوات التواصل الرسمية.`
  },
  {
    keywords: ["library", "services", "service", "student affairs", "مكتبة", "خدمات", "أنشطة", "اندية", "أندية"],
    en: `🏛️ University Services

Services may include:

• Digital libraries
• Academic advising
• Student clubs
• Career services
• Technical support
• Student activities

Available services depend on your university.`,
    ar: `🏛️ الخدمات الجامعية

قد تشمل الخدمات:

• المكتبات الرقمية
• الإرشاد الأكاديمي
• الأندية الطلابية
• الخدمات المهنية
• الدعم التقني
• الأنشطة الطلابية

تختلف الخدمات حسب الجامعة.`
  },
  {
    keywords: ["password", "login", "account", "reset", "كلمة مرور", "دخول", "حساب", "نسيت"],
    en: `🔐 Account Assistance

1. Open your official student portal.
2. Select password recovery.
3. Complete identity verification.
4. Contact IT support if needed.

Never share passwords or verification codes.`,
    ar: `🔐 مساعدة الحساب الجامعي

1. افتحي البوابة الأكاديمية الرسمية.
2. اختاري استعادة كلمة المرور.
3. أكملي التحقق من الهوية.
4. تواصلي مع الدعم التقني عند الحاجة.

لا تشاركي كلمة المرور أو رموز التحقق.`
  },
  {
    keywords: ["graduation", "graduate", "credit hours", "تخرج", "التخرج", "ساعات", "خريج"],
    en: `📖 Graduation Requirements

Review:

• Required credit hours
• Mandatory courses
• Electives
• Internship requirements
• Graduation project
• Minimum GPA

Refer to your official study plan.`,
    ar: `📖 متطلبات التخرج

راجعي:

• عدد الساعات المطلوبة
• المقررات الإجبارية
• المقررات الاختيارية
• التدريب التعاوني
• مشروع التخرج
• الحد الأدنى للمعدل

الخطة الدراسية الرسمية هي المرجع الأساسي.`
  }
];

const universityWebsites = {
  "Jazan University": "https://www.jazanu.edu.sa/",
  "King Saud University": "https://ksu.edu.sa/",
  "King Abdulaziz University": "https://www.kau.edu.sa/",
  "King Khalid University": "https://www.kku.edu.sa/",
  "King Faisal University": "https://www.kfu.edu.sa/",
  "Imam Abdulrahman Bin Faisal University": "https://www.iau.edu.sa/",
  "Princess Nourah University": "https://www.pnu.edu.sa/",
  "Umm Al-Qura University": "https://uqu.edu.sa/",
  "Taibah University": "https://www.taibahu.edu.sa/",
  "Qassim University": "https://www.qu.edu.sa/",
  "University of Tabuk": "https://www.ut.edu.sa/",
  "Najran University": "https://www.nu.edu.sa/",
  "University of Hail": "https://www.uoh.edu.sa/",
  "Taif University": "https://www.tu.edu.sa/",
  "Saudi Electronic University": "https://seu.edu.sa/",
  "Imam Mohammad Ibn Saud Islamic University": "https://imamu.edu.sa/",
  "Islamic University of Madinah": "https://iu.edu.sa/",
  "Al Jouf University": "https://www.ju.edu.sa/",
  "Northern Border University": "https://www.nbu.edu.sa/",
  "University of Bisha": "https://www.ub.edu.sa/",
  "University of Hafr Al Batin": "https://www.uhb.edu.sa/"
};

function createMascot() {
  return mascotTemplate.content.firstElementChild.cloneNode(true);
}

document.querySelectorAll(".mascot-slot").forEach(slot => {
  slot.appendChild(createMascot());
});

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesKeyword(text, keyword) {
  return (` ${text} `).includes(` ${normalizeText(keyword)} `);
}

function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

function getBotResponse(question) {
  const text = normalizeText(question);
  const arabic = isArabic(question);

  const greetings = ["hi", "hello", "hey", "هلا", "مرحبا", "السلام عليكم", "اهلا"];

  if (greetings.some(word => matchesKeyword(text, word))) {
    return arabic
      ? "أهلًا وسهلًا! 🇸🇦 كيف أقدر أساعدك في أمورك الجامعية؟"
      : "Hello! 🇸🇦 How can I help you with your university questions?";
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    const score = item.keywords.filter(
      keyword => matchesKeyword(text, keyword)
    ).length;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (!bestMatch) {
    return arabic
      ? `ما عندي إجابة محددة لهذا السؤال حاليًا.

جربي السؤال عن الاختبارات أو التسجيل أو المعدل أو المكافآت أو التدريب التعاوني.

يمكنك أيضًا مراجعة موقع جامعتك الرسمي.`
      : `I don't have a specific answer for that question yet.

Try asking about exams, registration, GPA, stipends, or cooperative training.

You can also check your university's official website.`;
  }

  const university = universitySelect.value;
  const answer = arabic ? bestMatch.ar : bestMatch.en;

  if (university && university !== "Other Saudi University") {
    return `${university}

${answer}

${arabic
  ? "ملاحظة: هذه إرشادات عامة وليست سياسة رسمية خاصة بالجامعة."
  : "Note: This is general guidance, not a verified university-specific policy."}`;
  }

  return answer;
}

let history = [];

try {
  const saved = JSON.parse(localStorage.getItem(CHAT_KEY));

  if (Array.isArray(saved)) {
    history = saved.filter(item =>
      item &&
      ["user", "bot"].includes(item.role) &&
      typeof item.text === "string"
    ).slice(-100);
  }
} catch (error) {
  history = [];
}

function saveHistory() {
  try {
    localStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-100)));
  } catch (error) {
    console.warn("Unable to save chat history.");
  }
}

function addMessage(role, text, save = true) {
  const message = document.createElement("div");
  message.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";

  if (role === "bot") {
    avatar.appendChild(createMascot());
  } else {
    avatar.textContent = "👤";
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  if (isArabic(text)) {
    bubble.dir = "rtl";
  }

  message.append(avatar, bubble);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (save) {
    history.push({ role, text });
    history = history.slice(-100);
    saveHistory();
  }

  return message;
}

let responseTimer = null;
let isResponding = false;

function setBusy(value) {
  isResponding = value;
  sendButton.disabled = value;
  userInput.disabled = value;
}

function sendMessage(question) {
  const text = question.trim();

  if (!text || isResponding) return;

  addMessage("user", text);
  userInput.value = "";
  setBusy(true);

  const typing = addMessage("bot", "Saudi UniBot is typing...", false);
  typing.classList.add("typing");

  responseTimer = setTimeout(() => {
    typing.remove();
    addMessage("bot", getBotResponse(text));
    responseTimer = null;
    setBusy(false);
    userInput.focus();
  }, 650);
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(userInput.value);
});

document.querySelectorAll("[data-question]").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.question);
  });
});

newChat.addEventListener("click", () => {
  if (responseTimer !== null) {
    clearTimeout(responseTimer);
    responseTimer = null;
  }

  setBusy(false);
  history = [];
  saveHistory();

  chatMessages.innerHTML = "";
  addMessage("bot", welcomeMessage);

  userInput.value = "";
  userInput.focus();
});

try {
  universitySelect.value = localStorage.getItem(UNIVERSITY_KEY) || "";
} catch (error) {
  universitySelect.value = "";
}

function updateUniversity() {
  const university = universitySelect.value;

  universityDisplay.textContent = university || "Your smart academic companion";

  try {
    localStorage.setItem(UNIVERSITY_KEY, university);
  } catch (error) {
    console.warn("Unable to save university selection.");
  }
}

universitySelect.addEventListener("change", updateUniversity);
updateUniversity();

document.getElementById("officialWebsite").addEventListener("click", () => {
  const university = universitySelect.value;
  const website = universityWebsites[university];

  if (!website) {
    alert("Please select a university with an available official website.");
    return;
  }

  window.open(website, "_blank", "noopener,noreferrer");
});

if (history.length > 0) {
  history.forEach(item => addMessage(item.role, item.text, false));
} else {
  addMessage("bot", welcomeMessage);
}
