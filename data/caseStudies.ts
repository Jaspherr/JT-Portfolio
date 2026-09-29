import type { CaseStudy } from "@/types/caseStudy";

export const caseStudies: Record<string, CaseStudy> = {
  "clarify-risksense": {
    slug: "clarify-risksense",
    projectName: "Clarify",
    eyebrow: "ADMIN PLATFORM · UI/UX · DEVELOPMENT",
    role: "UI / UX Designer · Front-End Developer",
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
      "Completed as part of the Boom Technologies internship, with the finished project retained by the mentor and QA tester.",

    challenge: {
      heading: "Making complex risk information easier to review.",
      description: [
        "Clarify is a risk-analysis administration platform designed around document analysis, information review, and risk assessment.",
        "The core challenge was presenting analysis-oriented information in a way that remained structured and navigable across multiple stages of the workflow.",
      ],
    },

    strategy: {
      introduction:
        "The experience was separated into clear stages — entry, dashboard, analysis preview, and results — helping users maintain context as they move through the platform.",

      designPrinciples: [
        "Separate major workflow stages into clearly defined views.",
        "Use progressive disclosure for detailed analysis information.",
        "Maintain visual consistency across dashboard, modal, and result states.",
        "Refine the interface iteratively through collaboration and review.",
      ],

      technicalConsiderations: [
        "Responsibilities covered admin UI/UX design and front-end contribution alongside three backend developers and another front-end developer.",
        "The product used ReactJS, FastAPI, Python, OpenAI, and PostgreSQL across the analysis workflow.",
        "Mentor and QA review helped focus decisions on what users needed rather than adding unnecessary complexity.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Analysis Dashboard",
        image: "/projects/Clarify/DashboardV2.png",
        imageType: "web",
        description:
          "A central workspace for navigating the platform's risk-analysis experience.",
        userValue:
          "Creates a clear starting point for accessing analysis-related information and workflows.",
        implementation:
          "Designed and refined as the second dashboard iteration, represented in the project assets as DashboardV2.",
      },
      {
        number: "02",
        title: "Analyzer Preview",
        image: "/projects/Clarify/AnalyzerPreviewModal.png",
        imageType: "web",
        description:
          "A contextual preview experience for reviewing analyzer information.",
        userValue:
          "Allows information to be inspected without unnecessarily disrupting the surrounding workflow.",
        implementation:
          "Presented through a modal pattern to introduce an additional layer of information while preserving context.",
      },
      {
        number: "03",
        title: "RiskSense Results",
        image: "/projects/Clarify/RiskSense_ResultPage.png",
        imageType: "web",
        description:
          "A dedicated results experience for presenting the outcome of the risk-analysis process.",
        userValue:
          "Separates final analysis information from setup and navigation, creating a more focused review experience.",
        implementation:
          "Designed as its own results view within the broader admin workflow.",
      },
      {
        number: "04",
        title: "Landing Experience",
        image: "/projects/Clarify/NewLandingPage.png",
        imageType: "web",
        description:
          "A redesigned entry point for the platform.",
        userValue:
          "Provides users with a clearer introduction before entering the primary administrative workflow.",
        implementation:
          "Developed as a new landing-page direction alongside the broader interface refinement work.",
      },
    ],

    results: {
      outcomes: [
        "Completed both UI/UX and front-end responsibilities during the Boom Technologies internship.",
        "Designed multiple stages of the risk-analysis experience.",
        "Refined the interface through collaboration and review.",
        "The finished project was retained by the mentor and QA tester.",
      ],
      takeaways: [
        "Complex information products benefit from workflow-based information architecture.",
        "Designing and implementing the interface creates stronger awareness of practical development constraints.",
        "Iteration and review are essential when presenting analysis-heavy information.",
      ],
    },
  },

  sakay: {
    slug: "sakay",
    projectName: "Sakay",
    eyebrow: "WEB & MOBILE · UI/UX · DEVELOPMENT",
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
      "Designed the web and mobile experiences and handled front-end implementation. The project received a Best System Development award, while the UI/UX work received Most Outstanding UI/UX Designer.",

    challenge: {
      heading: "Designing one transport system for two very different contexts.",
      description: [
        "Sakay combines a mobile experience for users with a web-based administration platform for managing transport operations.",
        "The main design challenge was creating two interfaces with different priorities while keeping them connected as parts of the same product ecosystem.",
      ],
    },

    strategy: {
      introduction:
        "The product was divided according to context: task-focused mobile interactions for users and a more information-oriented web interface for administration.",

      designPrinciples: [
        "Prioritize immediate actions and status information on mobile.",
        "Give administrative views enough structure for operational information.",
        "Maintain a shared visual language across web and mobile.",
        "Design around the responsibilities of each user type rather than forcing identical interfaces across platforms.",
      ],

      technicalConsiderations: [
        "Designed the complete mobile interface in Figma and translated it into the front-end implementation.",
        "Designed the web experience as a base reference while focusing implementation ownership on the mobile and web front-end work.",
        "The project was demonstrated as a live prototype, including working location tracking during presentation testing.",
        "Backend implementation was owned by other team members.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Current Location",
        image: "/projects/Sakay/Mobile/CurrentLocation.png",
        imageType: "mobile",
        description:
          "A mobile view centered around the user's current location within the transport experience.",
        userValue:
          "Keeps location context immediately accessible during transport-related interactions.",
        implementation:
          "Designed as part of the mobile user experience with a task-focused interface.",
      },
      {
        number: "02",
        title: "Active Ride",
        image: "/projects/Sakay/Mobile/OnRide.png",
        imageType: "mobile",
        description:
          "A dedicated state for the user's ongoing ride.",
        userValue:
          "Separates active-trip information from other areas of the application.",
        implementation:
          "Created as a distinct mobile ride state within the wider transport workflow.",
      },
      {
        number: "03",
        title: "Vehicle Management",
        image: "/projects/Sakay/Mobile/DriverManageVehicle.png",
        imageType: "mobile",
        description:
          "A mobile interface supporting driver vehicle-management tasks.",
        userValue:
          "Gives drivers a dedicated place to manage vehicle-related information.",
        implementation:
          "Designed around the driver's operational context within the mobile application.",
      },
      {
        number: "04",
        title: "Administration & Reports",
        image: "/projects/Sakay/Web/Reports.png",
        imageType: "web",
        description:
          "Web-based operational and reporting interfaces for the administration side of Sakay.",
        userValue:
          "Provides administrators with a more structured environment for reviewing and managing transport operations.",
        implementation:
          "Designed as part of the web administration experience alongside supporting side-panel interactions.",
      },
    ],

    results: {
      outcomes: [
        "Designed both web and mobile experiences.",
        "Handled front-end implementation responsibilities.",
        "Delivered interfaces for users, drivers, and administrators.",
        "Received a Best System Development award.",
        "UI/UX contribution was recognized with Most Outstanding UI/UX Designer.",
      ],
      takeaways: [
        "Multi-platform products should respond to context instead of duplicating the same interface.",
        "User roles are a strong foundation for information architecture.",
        "Owning both design and front-end implementation helps maintain consistency from concept to final interface.",
      ],
    },
  },

  herbaplant: {
    slug: "herbaplant",
    projectName: "HerbaPlant",
    eyebrow: "MOBILE · UI/UX · FRONT-END",
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
      "Redesigned and improved the team's existing interface, refined the front-end implementation, and delivered the updated work back to the team for integration.",

    challenge: {
      heading: "Improving an existing mobile experience without losing its purpose.",
      description: [
        "HerbaPlant is centered around identifying herbal plants and presenting useful plant information through a mobile interface.",
        "Rather than starting from an empty canvas, the work involved improving an existing team interface and strengthening its visual and interaction consistency.",
      ],
    },

    strategy: {
      introduction:
        "The redesign focused on refinement: improving the existing experience while preserving the application's established purpose and preparing the updated work for team integration.",

      designPrinciples: [
        "Improve rather than redesign without reason.",
        "Create consistency across authentication, scanning, information, and conversational views.",
        "Keep primary mobile actions easy to identify.",
        "Prepare refinements in a form that could be handed back to the team.",
      ],

      technicalConsiderations: [
        "Led the UI redesign and refined the mobile front-end for an existing five-member team project.",
        "Because the team was working under a tight deadline, the work prioritized static wireframes and layout specifications over a long interactive prototype cycle.",
        "The updated interface was translated into Dart front-end code and delivered back to the team for integration.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Plant Scanning",
        image: "/projects/HerbaPlant/Scan.png",
        imageType: "mobile",
        description:
          "The central mobile interaction for initiating plant identification.",
        userValue:
          "Gives users a focused entry point into the application's primary purpose.",
        implementation:
          "Refined as part of the existing mobile interface and front-end improvement work.",
      },
      {
        number: "02",
        title: "Plant Information",
        image: "/projects/HerbaPlant/PlantInfo.png",
        imageType: "mobile",
        description:
          "A dedicated view for presenting information associated with an identified plant.",
        userValue:
          "Turns identification into useful, readable plant information.",
        implementation:
          "Designed as a distinct information state following the scanning experience.",
      },
      {
        number: "03",
        title: "Chatbot",
        image: "/projects/HerbaPlant/Chatbot.png",
        imageType: "mobile",
        description:
          "A conversational interface included within the wider HerbaPlant experience.",
        userValue:
          "Provides an additional interaction method for accessing application information.",
        implementation:
          "My contribution focused on redesigning and refining the chatbot interface.",
      },
      {
        number: "04",
        title: "Prompt History",
        image: "/projects/HerbaPlant/PromptHistory.png",
        imageType: "mobile",
        description:
          "A history view for previous conversational prompts.",
        userValue:
          "Creates continuity by giving users access to earlier interactions.",
        implementation:
          "Designed as a supporting view for the chatbot experience.",
      },
    ],

    results: {
      outcomes: [
        "Redesigned the team's existing mobile interface.",
        "Refined the front-end implementation.",
        "Improved consistency across core application views.",
        "Delivered the updated work back to the team for integration.",
      ],
      takeaways: [
        "Redesign work should identify what already works before introducing change.",
        "Consistency becomes especially important when several interaction types exist in one mobile product.",
        "Effective team handoff is part of the design and development process.",
      ],
    },
  },

  use: {
    slug: "use",
    projectName: "USE",
    eyebrow: "UPANG STUDENT ESSENTIALS · MOBILE",
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
      "Contributed to and helped coordinate the application's front-end development, supporting a consistent mobile experience across the team's core student-facing screens.",

    challenge: {
      heading: "Bringing everyday student essentials into one mobile experience.",
      description: [
        "UPang Student Essentials was designed to give students convenient access to essential school information and everyday student features.",
        "As a team project, the work also required front-end coordination so that individual screens and contributions remained part of a coherent mobile experience.",
      ],
    },

    strategy: {
      introduction:
        "The front-end was organized around clear destinations for the application's primary student-facing information and features.",

      designPrinciples: [
        "Provide a clear entry into the application.",
        "Use the home experience as a central access point.",
        "Separate profile and announcement information into dedicated views.",
        "Maintain implementation consistency across team contributions.",
      ],

      technicalConsiderations: [
        "Contributed to mobile front-end development and supported UI/UX decisions within the four-member team.",
        "The project used Dart, Swift, Laravel, MySQL, and Heroku across the application and deployment workflow.",
        "Front-end coordination was important because multiple team members contributed to the mobile experience.",
      ],
    },

    features: [
      {
        number: "01",
        title: "Welcome Experience",
        image: "/projects/USE/Welcome.png",
        imageType: "mobile",
        description:
          "The introductory view into the UPang Student Essentials application.",
        userValue:
          "Provides students with a clear starting point before entering the main experience.",
        implementation:
          "Implemented as part of the application's coordinated front-end development.",
      },
      {
        number: "02",
        title: "Student Home",
        image: "/projects/USE/Home.png",
        imageType: "mobile",
        description:
          "The primary mobile destination for accessing student-oriented features.",
        userValue:
          "Centralizes the application's everyday student experience.",
        implementation:
          "Developed as one of the application's core front-end views.",
      },
      {
        number: "03",
        title: "Student Profile",
        image: "/projects/USE/Profile1.png",
        imageType: "mobile",
        description:
          "A dedicated profile experience within the application.",
        userValue:
          "Keeps student-specific information separate from general application content.",
        implementation:
          "Implemented as part of the coordinated mobile front-end.",
      },
      {
        number: "04",
        title: "Announcements",
        image: "/projects/USE/Announcement.png",
        imageType: "mobile",
        description:
          "A dedicated area for student-facing announcements.",
        userValue:
          "Makes important school information easier to access from within the application.",
        implementation:
          "Developed as a distinct informational view within the overall mobile experience.",
      },
    ],

    results: {
      outcomes: [
        "Contributed directly to front-end development.",
        "Supported implementation and organization of the mobile experience.",
        "Helped coordinate development work within the team.",
        "Implemented core student-facing application views.",
      ],
      takeaways: [
        "Front-end consistency matters especially in collaborative projects.",
        "Development coordination is part of delivering a coherent interface.",
        "Clear separation of core destinations helps simplify information-oriented mobile products.",
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