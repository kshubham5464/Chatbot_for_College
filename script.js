const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");

const userData = {
  message: null,
};

const createMessageElement = (content, classes) => {
  const div = document.createElement("div");
  div.classList.add("message", classes);
  div.innerHTML = content;
  return div;
};

// Get reply from predefined FAQs
const faqAnswers = {
  hello: "Hello! How can I help you today? I'm here to answer your questions.",

  admission:
    "Admissions for the academic year begin in May and end in July. You can apply online via our official college website. Required documents include 10th and 12th mark sheets, transfer certificate, migration certificate (if applicable), and a recent passport-size photograph.",

  fee: "Our annual tuition fee is ₹1,00,000 for most undergraduate programs. This includes library and lab charges. Payment can be done through UPI, debit/credit cards, bank transfer, or at the college office. Scholarships and installment options are available for eligible students.",

  courses:
    "We offer a range of UG and PG courses including B.Tech, BCA, BBA, MCA, MBA, and M.Tech. Each course is designed with practical training, industry exposure, and internship opportunities. Our faculty is experienced and well-qualified.",

  timing:
    "Our regular college hours are from 9:00 AM to 4:00 PM, Monday to Saturday. Practical and lab sessions may extend beyond these hours based on the course schedule. We also have online classes for students who cannot attend in-person sessions.",

  location:
    "The college is situated near Khurrampur, Farrukh Nagar, Haily Mandi Road, Gurgaon, Delhi (NCR). It is well-connected by public transport, and local buses and autos are easily available from the main railway and bus station. Parking is available on campus. You can also visit the college website for directions and maps.",

  contact:
    "You can reach us at 8102309830 during working hours or email us at i0lG8@example.com for queries related to admission, course details, and administration.",

  hostel:
    "We offer hostel facilities for both boys and girls with 24/7 security, Wi-Fi, mess, and laundry services. The hostels are located within walking distance from the main campus.",

  placement:
    "Our college has a dedicated placement cell with tie-ups with top companies like Autodesk, JellyFish, Chetu, EduTep, Accenture, Dellotte, TCS, Infosys, Wipro, and HCL. Students receive training in soft skills, mock interviews, and resume building. Placement drives are held every semester. Placements are based on CGPA and interview performance. Recently Two students got placed in AutoDesk with a package of ₹45 LPA.",

  scholarship:
    "We offer merit-based scholarships, government scholarships, and financial aid for economically weaker students. You need to submit income proof and academic records to apply.",

  library:
    "Our library has over 20,000 books, journals, e-books, and digital resources. Students can borrow up to 4 books at a time and access digital materials online using their student credentials.",

  transport:
    "Yes, we have a fleet of college buses covering major routes in and around the city. Bus passes can be availed from the transport office within the campus.",

  canteen:
    "We have a hygienic and affordable canteen that serves breakfast, lunch, snacks, and beverages. Both vegetarian and non-vegetarian food options are available.",

  sports:
    "We encourage sports and have facilities for cricket, football, volleyball, table tennis, and indoor games. Annual sports meet and inter-college tournaments are regularly organized.",

  wifi: "Yes, the campus is Wi-Fi enabled. Students get access to high-speed internet using their student ID login credentials. You can also access the college website from your mobile device.",

  attendance:
    "A minimum of 75% attendance is required in each subject to be eligible for the semester examinations. Students are advised to maintain regular attendance to avoid academic issues. Leave applications must be submitted in advance. Late submission of leave applications may result in disciplinary action.",

  exam: "Semester exams are conducted twice a year. Mid-term assessments and project work are also part of the evaluation system. Students can check their exam schedule and results on the college website. Exams are conducted in the morning and afternoon sessions. The exam schedule is published on the college website.",

  faculty:
    "We have experienced and highly qualified faculty members with academic and industry backgrounds. Most hold PhDs or have more than 10 years of teaching experience. They are available for office hours and can be reached via email or phone.",

  internship:
    "Internships are part of the curriculum for most courses. The placement cell assists students in finding suitable internships in reputed organizations. Students receive stipends and academic credits for completing internships.",

  ragging:
    "Our campus is strictly anti-ragging. Any incident should be reported to the anti-ragging committee immediately. Strong disciplinary action will be taken against violators. We also conduct regular workshops and awareness programs to prevent ragging.",

  events:
    "Various cultural, technical, and academic events are organized throughout the year including fests, seminars, hackathons, and workshops. Students can participate in these events to showcase their skills and talents. The college also invites guest lecturers and industry experts to share their experiences.",
};

const getBotReply = (msg) => {
  msg = msg.toLowerCase();
  for (let keyword in faqAnswers) {
    if (msg.includes(keyword)) {
      return faqAnswers[keyword];
    }
  }
  return "Sorry, I don't have an answer for that. Please contact the college office for more info.";
};

// Handle sending user message and bot response
const handleOutgoingMessage = (e) => {
  e.preventDefault();

  userData.message = messageInput.value.trim();
  if (!userData.message) return;

  // Append user's message
  const messageContent = `<div class="message-text"></div>`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  messageInput.value = "";

  // Show bot typing...
  const thinkingMessageContent = `
    <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
      <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/>
    </svg>
    <div class="message-text">
      <div class="thinking-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;

  const thinkingDiv = createMessageElement(
    thinkingMessageContent,
    "bot-message"
  );
  chatBody.appendChild(thinkingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Replace with bot reply after delay
  setTimeout(() => {
    thinkingDiv.remove();
    const botReply = getBotReply(userData.message);
    const replyMessage = `
      <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
        <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9z"/>
      </svg>
      <div class="message-text">${botReply}</div>`;
    const botMessageDiv = createMessageElement(replyMessage, "bot-message");
    chatBody.appendChild(botMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
};

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
