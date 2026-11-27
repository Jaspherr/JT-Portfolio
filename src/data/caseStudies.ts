import type { CaseStudy } from "@/types/caseStudy";

export const caseStudies: Record<string, CaseStudy> = {
  "clarify-risksense": {
    slug: "clarify-risksense",
    projectName: "Clarify",
    role: "UI/UX Designer · Front-End Developer",
    platform: "Web · Figma · Front-End",
    projectType: "Risk-Analysis Admin Platform",
    year: "2025–2026",
    duration: "4 months",
    context: "Boom Technologies internship",
    team: "5 interns · 1 QA & Mentor",
    audience: "Risk-analysis users and administrators",
    stack: "ReactJS · FastAPI · Python · OpenAI · PostgreSQL",
    githubUrl: "https://github.com/marcelee0713/boomintern2025",
    heroImage: "/projects/Clarify/DashboardV2.png",
    heroImageType: "web",
    tags: ["Figma", "UI/UX", "Admin Platform"],

    impact:
      "Built during my internship at Boom Technologies. Our mentor and QA tester kept the finished project.",

    challenge: {
      heading: "Making complex risk information easier to review.",
      description: [
        "Clarify is a risk-analysis admin platform built around document analysis, information review, and risk assessment.",
        "The hard part was keeping a lot of analysis information organized and easy to move through across several stages of the workflow.",
      ],
    },

    strategy: {
      introduction:
        "The experience is split into four clear stages: entry, dashboard, analysis preview, and results. Users keep their bearings as they move through the platform.",

      designPrinciples: [
        "Separate major workflow stages into clearly defined views.",
        "Use progressive disclosure for detailed analysis information.",
        "Maintain visual consistency across dashboard, modal, and result states.",
        "Refine the interface iteratively through collaboration and review.",
      ],

      technicalConsiderations: [
        "I handled the admin UI/UX design and contributed to the front-end, working with three backend developers and another front-end developer.",
        "The product used ReactJS, FastAPI, Python, OpenAI, and PostgreSQL across the analysis workflow.",
        "Reviews with our mentor and QA tester kept decisions focused on what users needed instead of extra complexity.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Analysis Dashboard",
        image: "/projects/Clarify/DashboardV2.png",
        imageType: "web",
        description:
          "The main workspace for getting around the platform's risk analysis.",
        userValue:
          "Gives users one clear place to start before they get into analysis information and workflows.",
        implementation:
          "This is the second iteration of the dashboard, which I designed and refined.",
      },
      {
        number: "02",
        title: "Analyzer Preview",
        image: "/projects/Clarify/AnalyzerPreviewModal.png",
        imageType: "web",
        description:
          "A preview for checking analyzer details in context.",
        userValue:
          "Users can inspect the details without leaving what they're working on.",
        implementation:
          "It opens as a modal, so the extra detail sits on top of the current view instead of replacing it.",
      },
      {
        number: "03",
        title: "RiskSense Results",
        image: "/projects/Clarify/RiskSense_ResultPage.png",
        imageType: "web",
        description:
          "A dedicated page for the outcome of a risk analysis.",
        userValue:
          "Keeps final results apart from setup and navigation, so reviewing them is easier to focus on.",
        implementation:
          "Designed as its own view within the admin workflow.",
      },
      {
        number: "04",
        title: "Landing Experience",
        image: "/projects/Clarify/NewLandingPage.png",
        imageType: "web",
        description:
          "A redesigned entry point for the platform.",
        userValue:
          "Gives users a clearer introduction before they reach the main admin workflow.",
        implementation:
          "A new direction for the landing page, developed alongside the wider interface refinements.",
      },
    ],

    results: {
      outcomes: [
        "Handled both UI/UX and front-end work during my Boom Technologies internship.",
        "Designed multiple stages of the risk-analysis experience.",
        "Refined the interface through collaboration and review.",
        "Our mentor and QA tester kept the finished project.",
      ],
      takeaways: [
        "When a product holds a lot of information, organizing it around the workflow makes it much easier to follow.",
        "Building the interface I designed made me much more aware of real development constraints.",
        "Analysis-heavy screens need several rounds of iteration and review before they read clearly.",
      ],
    },
  },

  sakay: {
    slug: "sakay",
    projectName: "Sakay",
    role: "Lead UI/UX Designer · Front-End Developer",
    platform: "Web & Mobile · Figma · Front-End",
    projectType: "Transport Management System",
    year: "2025–2026",
    duration: "1–2 months",
    context: "Fourth-year capstone project",
    team: "5-member team",
    audience: "Students traveling Dagupan–Lingayen",
    stack: "Dart · BLoC · Python",
    heroImage: "/projects/Sakay/Web/AAA.png",
    heroImageType: "web",
    tags: ["Figma", "UI/UX", "Front-End"],

    impact:
      "Designed the web and mobile experiences and handled the UI/UX and front-end. The project received Best System Development, and my UI/UX work was recognized as Most Outstanding UI/UX Designer.",

    challenge: {
      heading: "Designing one transport system for two very different contexts.",
      description: [
        "Sakay pairs a mobile app for users with a web admin platform for managing transport operations.",
        "The challenge was designing two interfaces with different priorities that still felt like one product.",
      ],
    },

    strategy: {
      introduction:
        "Each side was designed for its context: quick, task-focused screens on mobile, and a more information-heavy web interface for admins.",

      designPrinciples: [
        "Prioritize immediate actions and status information on mobile.",
        "Give administrative views enough structure for operational information.",
        "Maintain a shared visual language across web and mobile.",
        "Design around the responsibilities of each user type rather than forcing identical interfaces across platforms.",
      ],

      technicalConsiderations: [
        "Designed the whole mobile interface in Figma, then built it on the front-end.",
        "Designed the web experience as a base reference, and owned the front-end implementation for both mobile and web.",
        "We demoed it as a live prototype, with location tracking working during the presentation tests.",
        "Other team members owned the backend.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Current Location",
        image: "/projects/Sakay/Mobile/CurrentLocation.png",
        imageType: "mobile",
        description:
          "A mobile view built around the user's current location.",
        userValue:
          "Users can always see where they are while they use the app.",
        implementation:
          "Part of the mobile app, designed to keep the task in focus.",
      },
      {
        number: "02",
        title: "Active Ride",
        image: "/projects/Sakay/Mobile/OnRide.png",
        imageType: "mobile",
        description:
          "A dedicated screen for the ride in progress.",
        userValue:
          "Keeps trip details apart from the rest of the app.",
        implementation:
          "Designed as its own ride state within the transport flow.",
      },
      {
        number: "03",
        title: "Vehicle Management",
        image: "/projects/Sakay/Mobile/DriverManageVehicle.png",
        imageType: "mobile",
        description:
          "A mobile screen where drivers manage their vehicles.",
        userValue:
          "Gives drivers one place for their vehicle information.",
        implementation:
          "Designed around what drivers need to do while they're working.",
      },
      {
        number: "04",
        title: "Administration & Reports",
        image: "/projects/Sakay/Web/Reports.png",
        imageType: "web",
        description:
          "The web screens admins use to run operations and check reports.",
        userValue:
          "Gives admins a more structured space for reviewing and managing transport operations.",
        implementation:
          "Part of the web admin experience, with side panels for supporting details.",
      },
    ],

    results: {
      outcomes: [
        "Designed both web and mobile experiences.",
        "Handled the front-end implementation.",
        "Delivered interfaces for users, drivers, and administrators.",
        "The project received the Best System Development award.",
        "My UI/UX work was recognized as Most Outstanding UI/UX Designer.",
      ],
      takeaways: [
        "When a product spans web and mobile, each side should fit its own context instead of copying the other.",
        "User roles make a good starting point for information architecture.",
        "Designing and building the same screens kept them consistent from concept to final interface.",
      ],
    },
  },

  herbaplant: {
    slug: "herbaplant",
    projectName: "HerbaPlant",
    role: "UI/UX Designer · Front-End Developer",
    platform: "Mobile · UI/UX · Front-End",
    projectType: "Herbal Plant Identification Application",
    year: "2025–2026",
    duration: "Several days",
    context: "Team UI improvement project",
    team: "5-member team · external design support",
    audience: "General users",
    stack: "Dart",
    heroImage: "/projects/HerbaPlant/Scan.png",
    heroImageType: "mobile",
    tags: ["Mobile", "UI/UX", "Front-End"],

    impact:
      "Redesigned the team's existing interface, refined the front-end, and handed the updated work back to the team to integrate.",

    challenge: {
      heading: "Improving an existing mobile experience without losing its purpose.",
      description: [
        "HerbaPlant is a mobile app for identifying herbal plants and showing useful information about them.",
        "I wasn't starting from scratch. The job was to improve the team's existing interface and make its visuals and interactions more consistent.",
      ],
    },

    strategy: {
      introduction:
        "The redesign was about refinement: improving what was there, keeping the app's purpose intact, and getting the work ready for the team to integrate.",

      designPrinciples: [
        "Improve rather than redesign without reason.",
        "Create consistency across authentication, scanning, information, and conversational views.",
        "Keep primary mobile actions easy to identify.",
        "Prepare refinements in a form that could be handed back to the team.",
      ],

      technicalConsiderations: [
        "Led the UI redesign and refined the mobile front-end for an existing five-member team project.",
        "The team was on a tight deadline, so I focused on static wireframes and layout specs instead of a long interactive prototyping cycle.",
        "I translated the updated interface into Dart and handed it back to the team to integrate.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Plant Scanning",
        image: "/projects/HerbaPlant/Scan.png",
        imageType: "mobile",
        description:
          "The main screen for starting a plant scan.",
        userValue:
          "Takes users straight to what the app is for.",
        implementation:
          "Refined as part of the interface and front-end improvements.",
      },
      {
        number: "02",
        title: "Plant Information",
        image: "/projects/HerbaPlant/PlantInfo.png",
        imageType: "mobile",
        description:
          "A dedicated view for details about an identified plant.",
        userValue:
          "Turns identification into useful, readable plant information.",
        implementation:
          "Designed as its own screen that follows a scan.",
      },
      {
        number: "03",
        title: "Chatbot",
        image: "/projects/HerbaPlant/Chatbot.png",
        imageType: "mobile",
        description:
          "A chatbot built into the HerbaPlant app.",
        userValue:
          "Gives users another way to get information from the app.",
        implementation:
          "I redesigned and refined the chatbot's interface.",
      },
      {
        number: "04",
        title: "Prompt History",
        image: "/projects/HerbaPlant/PromptHistory.png",
        imageType: "mobile",
        description:
          "A list of the user's earlier chatbot prompts.",
        userValue:
          "Lets users go back to earlier conversations.",
        implementation:
          "Designed as a supporting view for the chatbot.",
      },
    ],

    results: {
      outcomes: [
        "Redesigned the team's existing mobile interface.",
        "Refined the front-end implementation.",
        "Made the core screens more consistent.",
        "Handed the updated work back to the team to integrate.",
      ],
      takeaways: [
        "Before changing a design, it's worth working out what already works.",
        "Consistency matters even more when one mobile app mixes scanning, reading, and chatting.",
        "Handing work back to the team cleanly is part of design and development too.",
      ],
    },
  },

  use: {
    slug: "use",
    projectName: "USE",
    role: "Front-End Developer",
    platform: "Mobile · Front-End",
    projectType: "Student Mobile Application",
    year: "2024–2025",
    duration: "1–2 months",
    context: "Third-year academic project",
    team: "4-member team",
    audience: "University of Pangasinan students",
    stack: "Dart · Swift · Laravel · MySQL · Heroku",
    heroImage: "/projects/USE/Home.png",
    heroImageType: "mobile",
    tags: ["Mobile", "Front-End", "Team Project"],

    impact:
      "Contributed to the app's front-end and helped coordinate it, so the team's core student screens stayed consistent.",

    challenge: {
      heading: "Bringing everyday student essentials into one mobile experience.",
      description: [
        "UPang Student Essentials puts school information and everyday student features in one app.",
        "Several of us built screens, so the front-end needed coordinating to keep everything feeling like one app.",
      ],
    },

    strategy: {
      introduction:
        "The front-end was organized around a few clear destinations for the app's main student information and features.",

      designPrinciples: [
        "Provide a clear entry into the application.",
        "Use the home experience as a central access point.",
        "Separate profile and announcement information into dedicated views.",
        "Maintain implementation consistency across team contributions.",
      ],

      technicalConsiderations: [
        "Contributed to mobile front-end development and supported UI/UX decisions within the four-member team.",
        "The project used Dart, Swift, Laravel, MySQL, and Heroku for the app and its deployment.",
        "With several people working on the mobile app, front-end coordination mattered.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Welcome Experience",
        image: "/projects/USE/Welcome.png",
        imageType: "mobile",
        description:
          "The first screen students see in UPang Student Essentials.",
        userValue:
          "Gives students a clear starting point before the main app.",
        implementation:
          "Built as part of the team's coordinated front-end work.",
      },
      {
        number: "02",
        title: "Student Home",
        image: "/projects/USE/Home.png",
        imageType: "mobile",
        description:
          "The main screen for reaching student features.",
        userValue:
          "Puts everyday student tasks in one place.",
        implementation:
          "One of the app's core front-end views.",
      },
      {
        number: "03",
        title: "Student Profile",
        image: "/projects/USE/Profile1.png",
        imageType: "mobile",
        description:
          "A dedicated profile screen.",
        userValue:
          "Keeps each student's information apart from general app content.",
        implementation:
          "Built as part of the coordinated mobile front-end.",
      },
      {
        number: "04",
        title: "Announcements",
        image: "/projects/USE/Announcement.png",
        imageType: "mobile",
        description:
          "A dedicated place for school announcements.",
        userValue:
          "Makes important school news easier to find in the app.",
        implementation:
          "Built as its own screen within the app.",
      },
    ],

    results: {
      outcomes: [
        "Contributed directly to the front-end.",
        "Helped implement and organize the mobile app.",
        "Helped coordinate development work within the team.",
        "Built core student-facing screens.",
      ],
      takeaways: [
        "Front-end consistency matters most when several people build the screens.",
        "Coordinating the team's work was part of keeping the interface coherent.",
        "Giving each core destination its own screen keeps an information-heavy app simple.",
      ],
    },
  },
};

export const caseStudyOrder = [
  "clarify-risksense",
  "sakay",
  "herbaplant",
  "use",
];