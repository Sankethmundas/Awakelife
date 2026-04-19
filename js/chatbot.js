/* ============================================
   AWAKELIFE COACHING — Chatbot Engine
   ============================================ */

import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

const CHATBOT_DATA = {
  welcome: {
    text: "Hello! 👋 I'm AwakeBot, your personal guide at AwakeLife Coaching. How can I help you today?",
    quickReplies: ["Explore Services", "Book a Session", "Talk to Nivedita", "FAQs", "Pricing Info"]
  },
  intents: {
    "explore services": {
      text: "We offer 6 transformative coaching programs. Which area resonates with you?",
      quickReplies: ["Identity & Habits", "Mindset & Resilience", "Life Alignment", "Inner Awareness", "Career Coaching", "Relationship Coaching"]
    },
    "identity & habits": {
      text: "🔄 **Identity & Habit Transformation** — This program helps you reshape your identity at the core. You'll discover keystone habits, design your environment for success, and build a 90-day identity habit plan. It's about becoming the person who naturally does the right things.\n\n👉 Covers: Identity-first approach, tiny habits, habit stacking, cue-craving awareness, and more.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "mindset & resilience": {
      text: "🧠 **Mindset & Emotional Resilience** — Build an unshakable mindset! This program covers growth mapping, failure reframing, emotional trigger management, and resilience micro-habits. You'll learn to transform obstacles into opportunities.\n\n👉 Covers: Self-talk awareness, comparison detox, courage sketching, and personal mindset charting.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "life alignment": {
      text: "🎯 **Life Alignment & Purposeful Living** — Discover your true values and align every area of life with them. From crafting a personal mission statement to practicing proactivity and win-win thinking, this program helps you live with intention.\n\n👉 Covers: Values clarification, life boundaries, integrity gap analysis, and aligned life design.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "inner awareness": {
      text: "🧘 **Inner Awareness & Personal Presence** — Cultivate deep inner stillness and authentic presence. Learn to observe your mind, recognize ego patterns, practice letting go, and communicate consciously from a place of centered awareness.\n\n👉 Covers: Present moment awareness, emotional presence, compassion to self, and presence manifesto.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "career coaching": {
      text: "💼 **Career Coaching** — Whether you're starting out, pivoting, or climbing the ladder, this program gives you clarity on your career purpose. From personal branding and interview mastery to leadership development and salary negotiation.\n\n👉 Covers: Skills assessment, networking strategy, work-life integration, and 90-day career plans.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "relationship coaching": {
      text: "❤️ **Relationship Coaching** — For individuals and couples ready to repair, rediscover, or deepen their relationships. Individual sessions focus on attachment styles and emotional intelligence. Couples sessions cover trust rebuilding, conflict resolution, and reconnection rituals.\n\n👉 Available for: Singles, couples, and families.",
      quickReplies: ["Book This Service", "Other Services", "Learn More"]
    },
    "book a session": {
      text: "Wonderful! 🎉 Please use our dedicated intake form to book your session: [Book Your Session Here](https://neartail.com/sm/LdZu1Y_Gw)",
      quickReplies: ["FAQs", "Explore Services"]
    },
    "book this service": {
      text: "Great choice! Please use our dedicated intake form to secure your spot: [Book Your Session Here](https://neartail.com/sm/LdZu1Y_Gw)",
      quickReplies: ["FAQs", "Other Services"]
    },
    "talk to nivedita": {
      text: "Nivedita would love to connect with you! 🌟 You can reach her directly:\n\n📧 nivedita.hakkapakki@gmail.com\n📱 +91 8805366800\n\nOr click below to send a direct WhatsApp message!",
      quickReplies: ["Chat on WhatsApp", "Visit Contact Page", "Book a Session"]
    },
    "chat on whatsapp": {
      text: "Opening WhatsApp now! If it doesn't open automatically, [click here to chat](https://wa.me/918805366800?text=Hi%20Nivedita,%20I'd%20like%20to%20know%20more%20about%20your%20coaching%20programs.)",
      quickReplies: [],
      action: "redirect:https://wa.me/918805366800?text=Hi%20Nivedita,%20I'd%20like%20to%20know%20more%20about%20your%20coaching%20programs."
    },
    "visit contact page": {
      text: "I'll redirect you to the contact page now!",
      quickReplies: [],
      action: "redirect:/contact"
    },
    "faqs": {
      text: "Here are some frequently asked questions. What would you like to know?",
      quickReplies: ["Session Duration?", "Online or In-person?", "First Session Free?", "Group Sessions?", "How Many Sessions?", "Cancellation Policy?"]
    },
    "session duration?": {
      text: "⏰ Each coaching session is typically **60-90 minutes**. The first discovery session may run up to 2 hours as we deep-dive into your goals and create a personalized roadmap.",
      quickReplies: ["More FAQs", "Book a Session", "Explore Services"]
    },
    "online or in-person?": {
      text: "🌐 Both! Sessions are available **online via Zoom** and **in-person** (based on location availability). Online sessions are just as effective and offer more flexibility with scheduling.",
      quickReplies: ["More FAQs", "Book a Session", "Explore Services"]
    },
    "first session free?": {
      text: "✅ Yes! We offer a **complimentary 30-minute discovery call** where we discuss your goals, understand your challenges, and see if we're a good fit. No commitment required!",
      quickReplies: ["Book Free Session", "More FAQs", "Explore Services"]
    },
    "book free session": {
      text: "Let's get you booked for a free discovery call! Please fill out our brief intake form here: [Book Discovery Call](https://neartail.com/sm/LdZu1Y_Gw)",
      quickReplies: ["FAQs", "Explore Services"]
    },
    "group sessions?": {
      text: "👥 Yes! We offer **group coaching sessions** and **workshops** for teams and organizations. Group sessions are great for shared transformation experiences. Contact us for custom group packages.",
      quickReplies: ["More FAQs", "Book a Session", "Talk to Nivedita"]
    },
    "how many sessions?": {
      text: "📋 Most coaching programs run for **8-12 sessions** spread over 2-3 months. However, every journey is unique — some clients see transformation in 4-6 sessions, while others prefer ongoing support. We'll customize a plan for you.",
      quickReplies: ["More FAQs", "Book a Session", "Pricing Info"]
    },
    "cancellation policy?": {
      text: "📝 We understand life happens! You can reschedule or cancel up to **24 hours before** your session at no charge. Late cancellations may be subject to a fee. We're flexible and understanding.",
      quickReplies: ["More FAQs", "Book a Session", "Explore Services"]
    },
    "pricing info": {
      text: "💰 Our pricing varies based on the program and duration. We believe in making coaching accessible. Contact Nivedita for a personalized quote!\n\n📧 nivedita.hakkapakki@gmail.com\n📱 +91 8805366800\n\nWe also offer package discounts and flexible payment plans.",
      quickReplies: ["Chat on WhatsApp", "Book Free Session", "Explore Services"]
    },
    "more faqs": {
      text: "What else would you like to know?",
      quickReplies: ["Session Duration?", "Online or In-person?", "First Session Free?", "Group Sessions?", "How Many Sessions?", "Cancellation Policy?"]
    },
    "other services": {
      text: "Here are all our coaching programs:",
      quickReplies: ["Identity & Habits", "Mindset & Resilience", "Life Alignment", "Inner Awareness", "Career Coaching", "Relationship Coaching"]
    },
    "other questions": {
      text: "What else can I help you with?",
      quickReplies: ["Explore Services", "Book a Session", "FAQs", "Pricing Info"]
    },
    "learn more": {
      text: "I'd recommend visiting our services pages for detailed information on each program, including the full curriculum and transformation process. Would you like me to help with anything specific?",
      quickReplies: ["Explore Services", "Book a Session", "FAQs"]
    },
    "thank you": {
      text: "You're welcome! 😊 Remember, every great transformation starts with a single step. We're here whenever you're ready. Have a wonderful day! ✨",
      quickReplies: ["Book a Session", "Explore Services"]
    },
    "thanks": {
      text: "You're most welcome! 🌟 Is there anything else I can help with?",
      quickReplies: ["Book a Session", "Explore Services", "No, that's all"]
    },
    "no, that's all": {
      text: "Great! Feel free to come back anytime. Wishing you an amazing journey ahead! 🚀✨",
      quickReplies: []
    },
    "hello": {
      text: "Hi there! 👋 Welcome to AwakeLife Coaching. How can I assist you today?",
      quickReplies: ["Explore Services", "Book a Session", "FAQs", "Talk to Nivedita"]
    },
    "hi": {
      text: "Hey! 😊 Welcome to AwakeLife. I'm here to help you start your transformation journey. What would you like to know?",
      quickReplies: ["Explore Services", "Book a Session", "FAQs", "Talk to Nivedita"]
    },
    "help": {
      text: "I'm here to help! Here's what I can assist you with:",
      quickReplies: ["Explore Services", "Book a Session", "FAQs", "Pricing Info", "Talk to Nivedita"]
    }
  },
  fallback: {
    text: "I'm not sure I understand that. Let me connect you with the right information!",
    quickReplies: ["Explore Services", "Book a Session", "FAQs", "Talk to Nivedita"]
  }
};

// ---- Chatbot Class ----
class AwakeBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.bookingData = {};
    this.expectInput = null;
    this.init();
  }

  init() {
    this.renderWidget();
    this.bindEvents();
    // Send welcome after a delay
    setTimeout(() => {
      this.addBotMessage(CHATBOT_DATA.welcome.text, CHATBOT_DATA.welcome.quickReplies);
    }, 1000);
    // Start proactive check
    this.initProactiveTrigger();
  }

  initProactiveTrigger() {
    // If on a service page, wait 30 seconds then show a proactive message
    const isServicePage = window.location.pathname.includes('/services/');
    if (isServicePage) {
      setTimeout(() => {
        if (!this.isOpen && !this.proactiveTriggered) {
          this.triggerProactiveMessage();
        }
      }, 30000); // 30 seconds
    }
  }

  triggerProactiveMessage() {
    this.proactiveTriggered = true;
    const serviceName = document.title.split('—')[0].trim();
    const proactiveText = `I noticed you're exploring **${serviceName}**. 🌟 It's one of our most transformative programs! Would you like to know how it can help you reach your specific goals?`;
    
    // Open the widget and send the message
    this.toggle(); 
    this.addBotMessage(proactiveText, ["Learn More", "Book a Session", "Talk to Nivedita"]);
  }

  renderWidget() {
    const chatbotHTML = `
      <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open chat">💬</button>
      <div class="chatbot-window" id="chatbotWindow">
        <div class="chatbot-header">
          <div class="chatbot-header-dot"></div>
          <div class="chatbot-header-info">
            <h4>AwakeBot</h4>
            <span>Online — Ready to help</span>
          </div>
        </div>
        <div class="chatbot-messages" id="chatMessages"></div>
        <div class="chatbot-input">
          <input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off">
          <button id="chatSend" aria-label="Send">➤</button>
        </div>
      </div>
    `;
    const wrapper = document.getElementById('chatbot');
    if (wrapper) wrapper.innerHTML = chatbotHTML;
  }

  bindEvents() {
    const toggle = document.getElementById('chatbotToggle');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    if (toggle) toggle.addEventListener('click', () => this.toggle());
    if (send) send.addEventListener('click', () => this.handleUserInput());
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserInput();
      });
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (window) window.classList.toggle('open', this.isOpen);
    if (toggle) {
      toggle.textContent = this.isOpen ? '✕' : '💬';
      toggle.classList.toggle('active', this.isOpen);
    }
  }

  addBotMessage(text, quickReplies = []) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    // Format text (markdown links and bold)
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--primary); text-decoration:underline;">$1</a>')
      .replace(/\n/g, '<br>');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot';
    msgDiv.innerHTML = formatted;
    container.appendChild(msgDiv);
    if (quickReplies.length > 0) {
      const repliesDiv = document.createElement('div');
      repliesDiv.className = 'chat-quick-replies';
      quickReplies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'chat-quick-btn';
        btn.textContent = reply;
        btn.addEventListener('click', () => {
          this.addUserMessage(reply);
          this.processInput(reply);
          repliesDiv.remove();
        });
        repliesDiv.appendChild(btn);
      });
      container.appendChild(repliesDiv);
    }
    this.scrollToBottom();
  }

  addUserMessage(text) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user';
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    this.scrollToBottom();
  }

  handleUserInput() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.addUserMessage(text);
    // Remove existing quick reply buttons
    document.querySelectorAll('.chat-quick-replies').forEach(el => el.remove());
    setTimeout(() => this.processInput(text), 500);
  }

  processInput(text) {
    // Handle booking flow
    if (this.expectInput) {
      this.handleBookingInput(text);
      return;
    }
    const lower = text.toLowerCase().trim();
    // Check for direct intent match
    const intent = CHATBOT_DATA.intents[lower];
    if (intent) {
      this.addBotMessage(intent.text, intent.quickReplies || []);
      if (intent.expectInput) this.expectInput = intent.expectInput;
      if (intent.action) {
        const firstColon = intent.action.indexOf(':');
        const action = intent.action.substring(0, firstColon);
        const value = intent.action.substring(firstColon + 1);
        
        if (action === 'redirect') {
          setTimeout(() => {
            if (value.startsWith('http')) {
              window.open(value, '_blank');
            } else {
              window.location.href = value;
            }
          }, 1500);
        }
      }
      return;
    }
    // Keyword matching
    const keywords = {
      'habit': 'identity & habits',
      'identity': 'identity & habits',
      'transform': 'identity & habits',
      'mindset': 'mindset & resilience',
      'resilience': 'mindset & resilience',
      'emotion': 'mindset & resilience',
      'growth': 'mindset & resilience',
      'purpose': 'life alignment',
      'align': 'life alignment',
      'values': 'life alignment',
      'mission': 'life alignment',
      'aware': 'inner awareness',
      'presence': 'inner awareness',
      'mindful': 'inner awareness',
      'meditat': 'inner awareness',
      'stillness': 'inner awareness',
      'career': 'career coaching',
      'job': 'career coaching',
      'work': 'career coaching',
      'profession': 'career coaching',
      'interview': 'career coaching',
      'resume': 'career coaching',
      'relationship': 'relationship coaching',
      'couple': 'relationship coaching',
      'partner': 'relationship coaching',
      'marriage': 'relationship coaching',
      'love': 'relationship coaching',
      'trust': 'relationship coaching',
      'book': 'book a session',
      'schedule': 'book a session',
      'appointment': 'book a session',
      'session': 'book a session',
      'price': 'pricing info',
      'cost': 'pricing info',
      'fee': 'pricing info',
      'rate': 'pricing info',
      'service': 'explore services',
      'program': 'explore services',
      'offer': 'explore services',
      'contact': 'talk to nivedita',
      'email': 'talk to nivedita',
      'phone': 'talk to nivedita',
      'call': 'talk to nivedita',
      'faq': 'faqs',
      'question': 'faqs',
      'how long': 'session duration?',
      'duration': 'session duration?',
      'online': 'online or in-person?',
      'virtual': 'online or in-person?',
      'free': 'first session free?',
      'trial': 'first session free?',
      'group': 'group sessions?',
      'team': 'group sessions?',
      'cancel': 'cancellation policy?',
      'reschedule': 'cancellation policy?',
      'thank': 'thank you',
      'bye': 'no, that\'s all',
      'goodbye': 'no, that\'s all',
      'hey': 'hi',
      'hello': 'hello',
      'hi': 'hi',
      'help': 'help'
    };
    for (const [keyword, intentKey] of Object.entries(keywords)) {
      if (lower.includes(keyword)) {
        const matchedIntent = CHATBOT_DATA.intents[intentKey];
        if (matchedIntent) {
          this.addBotMessage(matchedIntent.text, matchedIntent.quickReplies || []);
          if (matchedIntent.expectInput) this.expectInput = matchedIntent.expectInput;
          return;
        }
      }
    }
    // Fallback
    this.addBotMessage(CHATBOT_DATA.fallback.text, CHATBOT_DATA.fallback.quickReplies);
  }

  handleBookingInput(text) {
    switch (this.expectInput) {
      case 'name':
        this.bookingData.name = text;
        this.expectInput = 'email';
        this.addBotMessage(`Nice to meet you, ${text}! 😊 What's your email address?`);
        break;
      case 'email':
        this.bookingData.email = text;
        this.expectInput = 'phone';
        this.addBotMessage("And your phone number? (So we can confirm your booking)");
        break;
      case 'phone':
        this.bookingData.phone = text;
        this.expectInput = 'service';
        this.addBotMessage("Which service are you interested in?", [
          "Identity & Habits", "Mindset & Resilience", "Life Alignment",
          "Inner Awareness", "Career Coaching", "Relationship Coaching", "Not sure yet"
        ]);
        break;
      case 'service':
        this.bookingData.service = text;
        this.expectInput = null;
        this.saveBooking();
        this.addBotMessage(
          `Perfect! 🎉 Here's your booking summary:\n\n**Name:** ${this.bookingData.name}\n**Email:** ${this.bookingData.email}\n**Phone:** ${this.bookingData.phone}\n**Service:** ${this.bookingData.service}\n\nNivedita will reach out to you within 24 hours to schedule your session. Welcome to your transformation journey! ✨`,
          ["Thank You", "Explore Services", "Other Questions"]
        );
        this.bookingData = {};
        break;
    }
  }

  async saveBooking() {
    try {
      if (!db) {
        console.warn("Firebase DB not initialized. Check your firebase-config.");
        return;
      }
      // Save directly to the bookings collection
      await addDoc(collection(db, 'bookings'), {
        ...this.bookingData,
        source: 'chatbot',
        timestamp: new Date().toISOString(),
        createdAt: serverTimestamp()
      });
      // Save a copy to chatlogs if needed
      await addDoc(collection(db, 'chatlogs'), {
        booking: this.bookingData,
        timestamp: new Date().toISOString(),
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error saving chatbot booking to Firebase: ", error);
    }
  }

  scrollToBottom() {
    const container = document.getElementById('chatMessages');
    if (container) {
      setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);
    }
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => new AwakeBot(), 500);
});
