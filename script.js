const storageKeys = {
  alerts: "playmate.alerts",
  blockedSites: "playmate.blockedSites",
  children: "playmate.children",
  settings: "playmate.settings",
  profile: "playmate.profile",
  monitoring: "playmate.monitoring",
  theme: "playmate.theme"
};

const pageTitles = {
  dashboard: "Dashboard",
  children: "Child Monitoring",
  risk: "Risk Analysis",
  alerts: "Alerts",
  blocked: "Blocked Sites",
  history: "Activity History",
  reports: "Reports",
  mentor: "AI Mentor",
  settings: "Settings",
  profile: "Profile"
};

const defaultChildren = [
  {
    id: "emma",
    name: "Emma",
    age: 8,
    avatar: "EM",
    activity: 72,
    timeOnline: "1h 45m",
    status: "Learning videos",
    risk: "Safe",
    paused: false,
    lastSites: ["kidsmath.org", "scienceclub.tv", "drawingpad.app"]
  },
  {
    id: "lucas",
    name: "Lucas",
    age: 11,
    avatar: "LU",
    activity: 88,
    timeOnline: "2h 25m",
    status: "Social browsing",
    risk: "Moderate",
    paused: false,
    lastSites: ["safechat.school", "sportsclips.tv", "gameguides.net"]
  },
  {
    id: "mia",
    name: "Mia",
    age: 6,
    avatar: "MI",
    activity: 46,
    timeOnline: "58m",
    status: "Offline",
    risk: "Safe",
    paused: true,
    lastSites: ["storybook.fun", "musicforkids.app", "tinygames.co"]
  }
];

const defaultAlerts = [
  {
    id: "a1",
    type: "Suspicious search",
    child: "Lucas",
    message: "Repeated searches around private chat rooms were detected.",
    severity: "High",
    time: "Today, 4:18 PM",
    read: false
  },
  {
    id: "a2",
    type: "Unknown website",
    child: "Emma",
    message: "A new educational video site was opened for the first time.",
    severity: "Moderate",
    time: "Today, 2:44 PM",
    read: false
  },
  {
    id: "a3",
    type: "Attempted blocked page",
    child: "Lucas",
    message: "Access to unsafe-chat.net was blocked successfully.",
    severity: "Critical",
    time: "Yesterday, 7:20 PM",
    read: false
  },
  {
    id: "a4",
    type: "Excessive screen time",
    child: "Mia",
    message: "Screen time reached the recommended daily limit.",
    severity: "Moderate",
    time: "Yesterday, 5:05 PM",
    read: true
  },
  {
    id: "a5",
    type: "Unsafe keyword",
    child: "Lucas",
    message: "PlayMate noticed a phrase that may need parent review.",
    severity: "High",
    time: "Mon, 6:12 PM",
    read: true
  }
];

const defaultBlockedSites = [
  { id: "b1", domain: "roblox-freecoins.example", category: "Fake gaming", added: "May 22", attempts: 3 },
  { id: "b2", domain: "unsafe-chat.net", category: "Chat", added: "May 21", attempts: 7 },
  { id: "b3", domain: "suspiciousgames.xyz", category: "Gaming", added: "May 20", attempts: 2 }
];

const defaultSettings = {
  enableAlerts: true,
  safeMode: true,
  childLock: true,
  screenTimeRecommendations: true,
  autoRiskScan: true,
  weeklyReport: false,
  softDarkMode: false
};

const defaultProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 555 014 7821",
  securityLevel: "High",
  membership: "PlayMate Family Plus"
};

const activityHistory = [
  { child: "Emma", website: "kidsmath.org", time: "Today, 3:55 PM", category: "Education", risk: "Safe", status: "Allowed", period: "today" },
  { child: "Lucas", website: "safechat.school", time: "Today, 3:31 PM", category: "Social", risk: "Moderate", status: "Watched", period: "today" },
  { child: "Lucas", website: "unsafe-chat.net", time: "Today, 2:12 PM", category: "Chat", risk: "High", status: "Blocked", period: "today" },
  { child: "Mia", website: "storybook.fun", time: "Yesterday, 4:02 PM", category: "Reading", risk: "Safe", status: "Allowed", period: "week" },
  { child: "Emma", website: "drawingpad.app", time: "Mon, 6:22 PM", category: "Creative", risk: "Safe", status: "Allowed", period: "week" },
  { child: "Lucas", website: "suspiciousgames.xyz", time: "Sun, 5:30 PM", category: "Gaming", risk: "High", status: "Blocked", period: "week" }
];

const riskSignals = [
  { label: "Social media usage", child: "Lucas", level: "Moderate", value: 58, note: "Higher than weekday baseline" },
  { label: "Suspicious keywords", child: "Lucas", level: "High Risk", value: 74, note: "Three terms need review" },
  { label: "Repeated searches", child: "Emma", level: "Safe", value: 28, note: "Pattern looks normal" },
  { label: "Unsafe pages", child: "Lucas", level: "Critical", value: 91, note: "Two blocked attempts today" },
  { label: "Unusual behavior", child: "Mia", level: "Safe", value: 16, note: "No concern detected" }
];

const aiSuggestions = [
  "Lucas showed higher activity on social sites today. A calm check-in after dinner may help you understand the context.",
  "Emma stayed inside safe learning categories. Her browsing pattern looks steady and age appropriate.",
  "Two blocked attempts happened this week. Consider adding a short screen-time break and reviewing the blocked list.",
  "Mia is currently paused. Monitoring can resume from Child Monitoring when you are ready.",
  "The safest next step is to keep Safe Mode and Auto-risk scan enabled for the evening."
];

const appState = {
  route: "dashboard",
  alertFilter: "all",
  historyFilter: "today",
  blockedSearch: "",
  children: readStored(storageKeys.children, defaultChildren),
  alerts: readStored(storageKeys.alerts, defaultAlerts),
  blockedSites: readStored(storageKeys.blockedSites, defaultBlockedSites),
  settings: readStored(storageKeys.settings, defaultSettings),
  profile: readStored(storageKeys.profile, defaultProfile),
  monitoring: readStored(storageKeys.monitoring, true),
  theme: readStored(storageKeys.theme, "light"),
  chat: [
    { from: "ai", text: "Hi, I am PlayMate Mentor. Ask me about activity, alerts, screen time, or risk patterns." },
    { from: "ai", text: "Lucas showed high activity in social websites today." }
  ]
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindShellEvents();
  applyTheme();
  refreshHeader();
  setRoute("dashboard", { announce: false });
});

function cacheElements() {
  elements.app = document.getElementById("app");
  elements.content = document.getElementById("content");
  elements.pageTitle = document.getElementById("pageTitle");
  elements.navLinks = [...document.querySelectorAll(".nav-link")];
  elements.sidebarCollapse = document.getElementById("sidebarCollapse");
  elements.mobileMenu = document.getElementById("mobileMenu");
  elements.sidebarOverlay = document.getElementById("sidebarOverlay");
  elements.monitoringSwitch = document.getElementById("monitoringSwitch");
  elements.monitoringLabel = document.getElementById("monitoringLabel");
  elements.notificationButton = document.getElementById("notificationButton");
  elements.notificationPanel = document.getElementById("notificationPanel");
  elements.notificationBadge = document.getElementById("notificationBadge");
  elements.profileShortcut = document.getElementById("profileShortcut");
  elements.parentNameHeader = document.getElementById("parentNameHeader");
  elements.parentAvatar = document.getElementById("parentAvatar");
  elements.globalSearch = document.getElementById("globalSearch");
  elements.searchInput = document.getElementById("searchInput");
  elements.searchResults = document.getElementById("searchResults");
  elements.toastStack = document.getElementById("toastStack");
  elements.modalRoot = document.getElementById("modalRoot");
}

function bindShellEvents() {
  elements.navLinks.forEach((button) => {
    button.addEventListener("click", () => {
      setRoute(button.dataset.route);
      closeMobileNav();
    });
  });

  elements.sidebarCollapse.addEventListener("click", () => {
    elements.app.classList.toggle("sidebar-collapsed");
  });

  elements.mobileMenu.addEventListener("click", () => {
    elements.app.classList.add("nav-open");
    elements.sidebarOverlay.hidden = false;
  });

  elements.sidebarOverlay.addEventListener("click", closeMobileNav);

  elements.monitoringSwitch.addEventListener("change", () => {
    appState.monitoring = elements.monitoringSwitch.checked;
    save(storageKeys.monitoring, appState.monitoring);
    refreshHeader();
    showToast("Monitoring updated", appState.monitoring ? "Protection is active." : "Monitoring is paused.", "success");
  });

  elements.notificationButton.addEventListener("click", () => {
    const isHidden = elements.notificationPanel.hidden;
    closeDropdowns();
    elements.notificationPanel.hidden = !isHidden;
    if (isHidden) {
      renderNotificationPanel();
    }
  });

  elements.profileShortcut.addEventListener("click", () => setRoute("profile"));

  elements.globalSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = elements.searchInput.value.trim();
    if (!query) {
      showToast("Search needs text", "Try a child name, alert type, or website.", "warning");
      return;
    }
    renderSearchResults(query);
  });

  elements.searchInput.addEventListener("input", () => {
    const query = elements.searchInput.value.trim();
    if (query.length < 2) {
      elements.searchResults.hidden = true;
      return;
    }
    renderSearchResults(query);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".notification-menu")) {
      elements.notificationPanel.hidden = true;
    }
    if (!event.target.closest(".global-search")) {
      elements.searchResults.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeDropdowns();
      closeMobileNav();
    }
  });
}

function setRoute(route, options = {}) {
  appState.route = route;
  elements.pageTitle.textContent = pageTitles[route];
  elements.navLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.route === route);
  });
  renderRoute();
  elements.content.focus({ preventScroll: true });
  if (options.announce !== false) {
    showToast(pageTitles[route], "Section loaded.", "success");
  }
}

function renderRoute() {
  const renderers = {
    dashboard: renderDashboard,
    children: renderChildren,
    risk: renderRiskAnalysis,
    alerts: renderAlerts,
    blocked: renderBlockedSites,
    history: renderActivityHistory,
    reports: renderReports,
    mentor: renderMentor,
    settings: renderSettings,
    profile: renderProfile
  };
  elements.content.replaceChildren(renderers[appState.route]());
  refreshHeader();
}

function renderDashboard() {
  const safeSessions = activityHistory.filter((item) => item.risk === "Safe").length;
  const riskAlerts = appState.alerts.filter((alert) => ["High", "Critical"].includes(alert.severity)).length;
  const page = createPage(
    "Family Safety Overview",
    "A simple view of monitoring health, recent alerts, safe sessions, and web risk signals."
  );

  const metrics = el("div", { className: "grid metrics-grid" }, [
    metricCard("Children monitored", appState.children.length, "3 active profiles", "blue", "icon-child"),
    metricCard("Websites blocked", appState.blockedSites.length, "Updated today", "mint", "icon-block"),
    metricCard("Risk alerts", riskAlerts, "Needs review", "red", "icon-alert"),
    metricCard("Safe sessions", safeSessions, "Allowed visits", "mint", "icon-dashboard"),
    metricCard("Average activity", "1h 43m", "Across all children", "yellow", "icon-history")
  ]);

  const chartPanel = el("section", { className: "panel" }, [
    el("h3", { text: "Risk distribution" }),
    el("div", { className: "donut-wrap" }, [
      el("div", { className: "donut", role: "img", "aria-label": "Risk distribution chart" }, [
        el("div", { className: "donut-center" }, [
          el("strong", { text: "86%" }),
          el("span", { text: "safe activity" })
        ])
      ]),
      el("div", { className: "legend" }, [
        legendItem("Safe", "64%", "var(--mint-strong)"),
        legendItem("Moderate", "20%", "var(--yellow-strong)"),
        legendItem("High risk", "16%", "var(--red-strong)")
      ])
    ])
  ]);

  const activityPanel = el("section", { className: "panel" }, [
    el("h3", { text: "Today activity" }),
    el("div", { className: "activity-bars" }, appState.children.map((child) => barRow(child.name, child.activity, `${child.activity}%`)))
  ]);

  const alertsPanel = el("section", { className: "panel" }, [
    el("div", { className: "section-header", style: "margin-bottom: 8px;" }, [
      el("div", {}, [el("h2", { text: "Latest alerts" })]),
      el("button", { className: "text-button", text: "View alerts", type: "button", onclick: () => setRoute("alerts") })
    ]),
    el("div", { className: "list-stack" }, appState.alerts.slice(0, 3).map((alert) => softAlertRow(alert)))
  ]);

  const quickPanel = el("section", { className: "panel" }, [
    el("h3", { text: "Quick summary" }),
    el("div", { className: "list-stack" }, [
      softRow("Monitoring", appState.monitoring ? "All active children are protected." : "Global monitoring is paused.", appState.monitoring ? "safe" : "moderate"),
      softRow("Blocked attempts", "2 attempts were stopped in the last 24 hours.", "info"),
      softRow("Recommendation", "Keep auto-risk scan on for evening browsing.", "safe")
    ])
  ]);

  page.append(metrics, el("div", { className: "grid two-column", style: "margin-top: 16px;" }, [chartPanel, activityPanel]), el("div", { className: "grid two-column", style: "margin-top: 16px;" }, [alertsPanel, quickPanel]));
  requestAnimationFrame(animateCounters);
  return page;
}

function renderChildren() {
  const page = createPage(
    "Child Monitoring",
    "Manage linked children, review activity level, and pause or resume monitoring per child."
  );

  page.append(el("div", { className: "grid children-grid" }, appState.children.map((child) => {
    const card = el("article", { className: "card child-card" }, [
      el("div", { className: "child-header" }, [
        el("span", { className: "child-avatar", text: child.avatar }),
        el("div", {}, [
          el("h3", { text: `${child.name} (${child.age})` }),
          el("small", { className: "eyebrow", text: child.paused ? "Monitoring paused" : child.status })
        ])
      ]),
      el("div", { className: "child-meta" }, [
        miniStat("Activity", `${child.activity}%`),
        miniStat("Time online", child.timeOnline),
        miniStat("Current state", child.paused ? "Paused" : "Active"),
        miniStat("Risk", child.risk)
      ]),
      el("div", { className: "progress-track", "aria-label": `${child.name} activity level` }, [
        el("span", { style: `width: ${child.activity}%; background: ${riskColor(child.risk)};` })
      ]),
      el("div", { className: "button-row" }, [
        el("button", { className: "primary-button", type: "button", text: "View Activity", onclick: () => openChildActivity(child.id) }),
        el("button", {
          className: child.paused ? "secondary-button" : "danger-button",
          type: "button",
          text: child.paused ? "Resume Monitoring" : "Pause Monitoring",
          onclick: () => toggleChildMonitoring(child.id)
        })
      ])
    ]);
    return card;
  })));

  return page;
}

function renderRiskAnalysis() {
  const page = createPage(
    "Risk Analysis",
    "Signals are classified into Safe, Moderate, High Risk, and Critical to keep decisions easy to understand."
  );

  const list = el("div", { className: "risk-list" }, riskSignals.map((signal) => {
    return el("article", { className: "risk-item" }, [
      el("div", { className: "risk-heading" }, [
        el("div", {}, [
          el("strong", { text: signal.label }),
          el("small", { text: `${signal.child} - ${signal.note}` })
        ]),
        riskBadge(signal.level)
      ]),
      el("div", { className: "progress-track" }, [
        el("span", { style: `width: ${signal.value}%; background: ${riskColor(signal.level)};` })
      ])
    ]);
  }));

  const guidance = el("section", { className: "panel" }, [
    el("h3", { text: "Parent guidance" }),
    el("div", { className: "list-stack" }, [
      softRow("Safe", "Normal activity in trusted websites.", "safe"),
      softRow("Moderate", "Review context when activity is unusually high.", "moderate"),
      softRow("High Risk", "Check search terms and consider a conversation.", "high"),
      softRow("Critical", "Blocked or unsafe behavior needs parent attention.", "critical")
    ])
  ]);

  page.append(el("div", { className: "grid risk-layout" }, [
    el("section", { className: "panel" }, [el("h3", { text: "Risk signals" }), list]),
    guidance
  ]));

  return page;
}

function renderAlerts() {
  const page = createPage(
    "Alerts",
    "Filter, mark as read, or delete parental alerts. Changes are saved locally in this browser."
  );

  const filters = [
    ["all", "All"],
    ["unread", "Unread"],
    ["high", "High risk"],
    ["moderate", "Moderate"],
    ["critical", "Critical"]
  ];

  const filteredAlerts = getFilteredAlerts();
  const list = filteredAlerts.length
    ? el("div", { className: "alert-list" }, filteredAlerts.map(alertCard))
    : el("div", { className: "empty-state", text: "No alerts match this filter." });

  page.append(
    el("div", { className: "filter-strip", style: "margin-bottom: 16px;" }, filters.map(([key, label]) => {
      return el("button", {
        className: `filter-button ${appState.alertFilter === key ? "active" : ""}`,
        type: "button",
        text: label,
        onclick: () => {
          appState.alertFilter = key;
          renderRoute();
        }
      });
    })),
    list
  );

  return page;
}

function renderBlockedSites() {
  const page = createPage(
    "Blocked Sites",
    "Add, search, and remove sites from the simulated block list."
  );

  const searchField = el("div", { className: "field" }, [
    el("label", { for: "blockedSearch", text: "Search site" }),
    el("input", {
      id: "blockedSearch",
      type: "search",
      value: appState.blockedSearch,
      placeholder: "Search domains",
      oninput: (event) => {
        appState.blockedSearch = event.target.value;
        renderRoute();
      }
    })
  ]);

  const tableBody = el("tbody", {}, getFilteredBlockedSites().map((site) => {
    return el("tr", {}, [
      el("td", { text: site.domain }),
      el("td", { text: site.category }),
      el("td", { text: site.added }),
      el("td", { text: String(site.attempts) }),
      el("td", {}, [
        el("button", {
          className: "danger-button",
          type: "button",
          text: "Remove",
          onclick: () => removeBlockedSite(site.id)
        })
      ])
    ]);
  }));

  const table = el("div", { className: "table-wrap" }, [
    el("table", { className: "data-table" }, [
      el("thead", {}, [
        el("tr", {}, ["Website", "Category", "Added", "Attempts", "Action"].map((label) => el("th", { text: label })))
      ]),
      tableBody
    ])
  ]);

  page.append(
    el("div", { className: "table-actions", style: "margin-bottom: 16px;" }, [
      searchField,
      el("button", { className: "primary-button", type: "button", text: "Add blocked site", onclick: openBlockedSiteModal })
    ]),
    getFilteredBlockedSites().length ? table : el("div", { className: "empty-state", text: "No blocked sites found." })
  );

  return page;
}

function renderActivityHistory() {
  const page = createPage(
    "Activity History",
    "Review simulated browsing activity by child, category, risk, and status."
  );

  const filters = [
    ["today", "Today"],
    ["week", "Last week"],
    ["high", "High risk"],
    ["safe", "Safe"]
  ];

  const rows = activityHistory.filter((item) => {
    if (appState.historyFilter === "today") return item.period === "today";
    if (appState.historyFilter === "week") return item.period === "week" || item.period === "today";
    if (appState.historyFilter === "high") return item.risk === "High";
    if (appState.historyFilter === "safe") return item.risk === "Safe";
    return true;
  });

  page.append(
    el("div", { className: "filter-strip", style: "margin-bottom: 16px;" }, filters.map(([key, label]) => {
      return el("button", {
        className: `filter-button ${appState.historyFilter === key ? "active" : ""}`,
        type: "button",
        text: label,
        onclick: () => {
          appState.historyFilter = key;
          renderRoute();
        }
      });
    })),
    el("div", { className: "table-wrap" }, [
      el("table", { className: "data-table" }, [
        el("thead", {}, [
          el("tr", {}, ["Child", "Website", "Time", "Category", "Risk", "Status"].map((label) => el("th", { text: label })))
        ]),
        el("tbody", {}, rows.map((item) => {
          return el("tr", {}, [
            el("td", { text: item.child }),
            el("td", { text: item.website }),
            el("td", { text: item.time }),
            el("td", { text: item.category }),
            el("td", {}, [riskBadge(item.risk)]),
            el("td", { text: item.status })
          ]);
        }))
      ])
    ])
  );

  return page;
}

function renderReports() {
  const page = createPage(
    "Reports",
    "Simple weekly summaries with visual bars and progress rings for parent-friendly review."
  );

  const reportCards = el("div", { className: "grid report-grid" }, [
    reportCard("Usage summary", "78%", "Screen time stayed inside the weekly goal.", "78%"),
    reportCard("Risk trend", "22%", "High-risk activity is lower than last week.", "22%"),
    reportCard("Blocked attempts", "12", "Sites blocked across all children.", "64%"),
    reportCard("Average hours", "1.7h", "Average daily online time.", "52%")
  ]);

  const trendPanel = el("section", { className: "panel" }, [
    el("h3", { text: "Weekly risk trend" }),
    el("div", { className: "activity-bars" }, [
      barRow("Mon", 34, "low"),
      barRow("Tue", 46, "ok"),
      barRow("Wed", 62, "watch"),
      barRow("Thu", 39, "low"),
      barRow("Fri", 74, "high")
    ])
  ]);

  const summaryPanel = el("section", { className: "panel" }, [
    el("h3", { text: "Highlights" }),
    el("div", { className: "list-stack" }, [
      softRow("Best day", "Wednesday had the most safe learning activity.", "safe"),
      softRow("Risk moment", "Friday evening had the highest blocked attempts.", "moderate"),
      softRow("Next step", "Keep weekly report enabled for a parent summary.", "info")
    ])
  ]);

  page.append(reportCards, el("div", { className: "grid two-column", style: "margin-top: 16px;" }, [trendPanel, summaryPanel]));
  return page;
}

function renderMentor() {
  const page = createPage(
    "AI Mentor",
    "A simulated assistant for friendly, plain-language parent guidance. No real AI or external API is used."
  );

  const feed = el("div", { className: "chat-feed", id: "chatFeed" }, appState.chat.map((message) => {
    return el("div", { className: `message ${message.from}`, text: message.text });
  }));

  const chatPanel = el("section", { className: "panel chat-panel" }, [
    feed,
    el("form", { className: "chat-form", onsubmit: handleMentorSubmit }, [
      el("input", { id: "mentorInput", type: "text", minlength: "3", placeholder: "Ask about Lucas, alerts, blocked sites..." }),
      el("button", { className: "primary-button", type: "submit", text: "Ask AI Mentor" })
    ])
  ]);

  const prompts = el("section", { className: "panel" }, [
    el("h3", { text: "Suggested questions" }),
    el("div", { className: "prompt-chips" }, [
      "What happened today?",
      "Should I review Lucas?",
      "Any blocked pages?",
      "How is Emma doing?"
    ].map((prompt) => el("button", {
      className: "segment-button",
      type: "button",
      text: prompt,
      onclick: () => {
        const input = document.getElementById("mentorInput");
        input.value = prompt;
        input.focus();
      }
    }))),
    el("div", { className: "list-stack", style: "margin-top: 18px;" }, [
      softRow("Simulated", "Responses come from local JavaScript rules.", "info"),
      softRow("Private", "Nothing is sent outside your browser.", "safe")
    ])
  ]);

  page.append(el("div", { className: "grid mentor-layout" }, [chatPanel, prompts]));
  requestAnimationFrame(() => {
    const node = document.getElementById("chatFeed");
    if (node) node.scrollTop = node.scrollHeight;
  });
  return page;
}

function renderSettings() {
  const page = createPage(
    "Settings",
    "Adjust safety controls, alerts, recommendations, and soft display mode."
  );

  const settings = [
    ["enableAlerts", "Enable alerts", "Show parent notifications for noteworthy activity."],
    ["safeMode", "Safe mode", "Favor trusted content categories and blocked site checks."],
    ["childLock", "Child lock", "Prevent children from changing monitoring settings."],
    ["screenTimeRecommendations", "Screen time recommendations", "Show age-friendly guidance and summaries."],
    ["autoRiskScan", "Auto-risk scan", "Automatically classify browsing patterns by risk level."],
    ["weeklyReport", "Weekly report", "Prepare a simple end-of-week family summary."],
    ["softDarkMode", "Soft dark mode", "Use a calmer low-light dashboard style."]
  ];

  page.append(el("div", { className: "grid switch-grid" }, settings.map(([key, title, description]) => {
    return el("label", { className: "switch-card" }, [
      el("span", {}, [el("strong", { text: title }), el("small", { text: description })]),
      el("span", {}, [
        el("input", {
          type: "checkbox",
          checked: appState.settings[key],
          onchange: (event) => updateSetting(key, event.target.checked)
        }),
        el("span", { className: "switch-ui", "aria-hidden": "true" })
      ])
    ]);
  })));

  return page;
}

function renderProfile() {
  const page = createPage(
    "Profile",
    "Parent account details and linked child profile summary."
  );

  const linkedNames = appState.children.map((child) => `${child.name} (${child.age})`).join(", ");

  page.append(el("div", { className: "grid profile-layout" }, [
    el("section", { className: "panel profile-hero" }, [
      el("span", { className: "avatar profile-avatar", text: getInitials(appState.profile.name) }),
      el("div", {}, [
        el("h2", { text: appState.profile.name }),
        el("p", { className: "eyebrow", text: appState.profile.membership })
      ]),
      el("button", { className: "primary-button", type: "button", text: "Edit Profile", onclick: openProfileModal })
    ]),
    el("section", { className: "panel" }, [
      el("h3", { text: "Parent details" }),
      el("div", { className: "profile-details" }, [
        detailRow("Parent name", appState.profile.name),
        detailRow("Email", appState.profile.email),
        detailRow("Phone", appState.profile.phone),
        detailRow("Linked children", linkedNames),
        detailRow("Security level", appState.profile.securityLevel),
        detailRow("Membership", appState.profile.membership)
      ])
    ])
  ]));

  return page;
}

function metricCard(label, value, note, color, iconId) {
  return el("article", { className: "card metric-card" }, [
    el("div", { className: `metric-icon ${color}` }, [svgIcon(iconId)]),
    el("div", {}, [
      el("small", { text: label }),
      el("strong", { className: "metric-value", "data-counter": String(value), text: String(value) }),
      el("span", { className: "metric-note", text: note })
    ])
  ]);
}

function reportCard(title, value, description, progress) {
  return el("article", { className: "card report-card" }, [
    el("h3", { text: title }),
    el("div", { className: "progress-circle", style: `--value: ${progress};` }, [
      el("span", { text: value })
    ]),
    el("p", { className: "metric-note", text: description })
  ]);
}

function legendItem(label, value, color) {
  return el("div", { className: "legend-item" }, [
    el("span", {}, [el("i", { className: "legend-dot", style: `background: ${color};` }), document.createTextNode(label)]),
    el("strong", { text: value })
  ]);
}

function barRow(label, value, note) {
  return el("div", { className: "bar-row" }, [
    el("strong", { text: label }),
    el("div", { className: "bar-track" }, [
      el("div", { className: "bar-fill", style: `width: ${value}%;` })
    ]),
    el("small", { text: note })
  ]);
}

function softAlertRow(alert) {
  return el("div", { className: "soft-row" }, [
    el("span", {}, [
      el("strong", { text: alert.type }),
      el("small", { text: `${alert.child} - ${alert.time}` })
    ]),
    riskBadge(alert.severity)
  ]);
}

function softRow(title, description, level) {
  return el("div", { className: "soft-row" }, [
    el("span", {}, [el("strong", { text: title }), el("small", { text: description })]),
    riskBadge(level)
  ]);
}

function miniStat(label, value) {
  return el("div", { className: "mini-stat" }, [
    el("span", { text: label }),
    el("strong", { text: value })
  ]);
}

function detailRow(label, value) {
  return el("div", { className: "detail-row" }, [
    el("span", { text: label }),
    el("strong", { text: value })
  ]);
}

function riskBadge(level) {
  const normalized = normalizeRisk(level);
  return el("span", { className: `badge ${normalized}`, text: labelRisk(level) });
}

function alertCard(alert) {
  return el("article", { className: `alert-card ${alert.read ? "" : "unread"}` }, [
    el("div", { className: "alert-copy" }, [
      el("h3", { text: alert.type }),
      el("p", { text: alert.message }),
      el("div", { className: "alert-meta" }, [
        el("span", { className: "badge info", text: alert.child }),
        riskBadge(alert.severity),
        el("small", { text: alert.time }),
        el("small", { text: alert.read ? "Read" : "Unread" })
      ])
    ]),
    el("div", { className: "button-row" }, [
      el("button", {
        className: "secondary-button",
        type: "button",
        text: alert.read ? "Read" : "Mark as read",
        disabled: alert.read,
        onclick: () => markAlertRead(alert.id)
      }),
      el("button", { className: "danger-button", type: "button", text: "Delete", onclick: () => deleteAlert(alert.id) })
    ])
  ]);
}

function createPage(title, description) {
  return el("section", { className: "page", "aria-labelledby": "sectionTitle" }, [
    el("header", { className: "section-header" }, [
      el("div", {}, [
        el("h2", { id: "sectionTitle", text: title }),
        el("p", { text: description })
      ])
    ])
  ]);
}

function svgIcon(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${id}`);
  svg.append(use);
  return svg;
}

function el(tag, attributes = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined || value === false) return;
    if (key === "className") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "htmlFor") node.htmlFor = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
    else if (key in node) node[key] = value;
    else node.setAttribute(key, value);
  });
  const childList = Array.isArray(children) ? children : [children];
  childList.forEach((child) => {
    if (child !== null && child !== undefined) node.append(child);
  });
  return node;
}

function getFilteredAlerts() {
  return appState.alerts.filter((alert) => {
    if (appState.alertFilter === "unread") return !alert.read;
    if (appState.alertFilter === "high") return alert.severity === "High";
    if (appState.alertFilter === "moderate") return alert.severity === "Moderate";
    if (appState.alertFilter === "critical") return alert.severity === "Critical";
    return true;
  });
}

function getFilteredBlockedSites() {
  const query = appState.blockedSearch.trim().toLowerCase();
  if (!query) return appState.blockedSites;
  return appState.blockedSites.filter((site) => {
    return site.domain.toLowerCase().includes(query) || site.category.toLowerCase().includes(query);
  });
}

function markAlertRead(alertId) {
  appState.alerts = appState.alerts.map((alert) => alert.id === alertId ? { ...alert, read: true } : alert);
  save(storageKeys.alerts, appState.alerts);
  refreshHeader();
  renderRoute();
  showToast("Alert marked read", "The alert was updated.", "success");
}

function deleteAlert(alertId) {
  appState.alerts = appState.alerts.filter((alert) => alert.id !== alertId);
  save(storageKeys.alerts, appState.alerts);
  refreshHeader();
  renderRoute();
  showToast("Alert deleted", "The alert was removed from local storage.", "warning");
}

function removeBlockedSite(siteId) {
  appState.blockedSites = appState.blockedSites.filter((site) => site.id !== siteId);
  save(storageKeys.blockedSites, appState.blockedSites);
  renderRoute();
  showToast("Site removed", "The domain was removed from the block list.", "warning");
}

function openBlockedSiteModal() {
  const modal = modalShell("Add blocked site", "Create a simulated blocked domain rule.");
  const domainField = field("Domain or URL", "siteDomain", "example.com", "text");
  const categoryField = field("Category", "siteCategory", "Gaming, chat, social...", "text");
  const form = el("form", { onsubmit: handleBlockedSiteSubmit }, [domainField, categoryField]);
  modal.body.append(form);
  modal.actions.append(
    el("button", { className: "secondary-button", type: "button", text: "Cancel", onclick: closeModal }),
    el("button", { className: "primary-button", type: "submit", text: "Add site", onclick: () => form.requestSubmit() })
  );
  showModal(modal.root);
}

function handleBlockedSiteSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const domainInput = form.querySelector("#siteDomain");
  const categoryInput = form.querySelector("#siteCategory");
  const domain = normalizeDomain(domainInput.value);
  const category = categoryInput.value.trim();
  let valid = true;

  valid = validateField(domainInput, domain.length >= 4 && isValidDomain(domain), "Enter a valid domain or URL.") && valid;
  valid = validateField(categoryInput, category.length >= 3, "Category needs at least 3 characters.") && valid;

  if (!valid) return;

  const duplicate = appState.blockedSites.some((site) => site.domain.toLowerCase() === domain.toLowerCase());
  if (duplicate) {
    validateField(domainInput, false, "This site is already blocked.");
    return;
  }

  appState.blockedSites = [
    { id: cryptoId("b"), domain, category, added: "Today", attempts: 0 },
    ...appState.blockedSites
  ];
  save(storageKeys.blockedSites, appState.blockedSites);
  closeModal();
  renderRoute();
  showToast("Blocked site added", `${domain} is now on the local block list.`, "success");
}

function openProfileModal() {
  const modal = modalShell("Edit profile", "Update parent profile details saved in this browser.");
  const form = el("form", { onsubmit: handleProfileSubmit }, [
    field("Parent name", "profileName", "Alex Rivera", "text", appState.profile.name),
    field("Email", "profileEmail", "alex@example.com", "email", appState.profile.email),
    field("Phone", "profilePhone", "+1 555 000 0000", "tel", appState.profile.phone),
    field("Security level", "profileSecurity", "High", "text", appState.profile.securityLevel),
    field("Membership", "profileMembership", "PlayMate Family Plus", "text", appState.profile.membership)
  ]);
  modal.body.append(form);
  modal.actions.append(
    el("button", { className: "secondary-button", type: "button", text: "Cancel", onclick: closeModal }),
    el("button", { className: "primary-button", type: "submit", text: "Save profile", onclick: () => form.requestSubmit() })
  );
  showModal(modal.root);
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = {
    name: form.querySelector("#profileName").value.trim(),
    email: form.querySelector("#profileEmail").value.trim(),
    phone: form.querySelector("#profilePhone").value.trim(),
    securityLevel: form.querySelector("#profileSecurity").value.trim(),
    membership: form.querySelector("#profileMembership").value.trim()
  };

  let valid = true;
  valid = validateField(form.querySelector("#profileName"), values.name.length >= 3, "Name needs at least 3 characters.") && valid;
  valid = validateField(form.querySelector("#profileEmail"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email), "Enter a valid email address.") && valid;
  valid = validateField(form.querySelector("#profilePhone"), values.phone.length >= 7, "Phone needs at least 7 characters.") && valid;
  valid = validateField(form.querySelector("#profileSecurity"), values.securityLevel.length >= 3, "Security level is required.") && valid;
  valid = validateField(form.querySelector("#profileMembership"), values.membership.length >= 3, "Membership is required.") && valid;

  if (!valid) return;

  appState.profile = values;
  save(storageKeys.profile, appState.profile);
  closeModal();
  refreshHeader();
  renderRoute();
  showToast("Profile saved", "Parent details were updated locally.", "success");
}

function field(label, id, placeholder, type = "text", value = "") {
  return el("div", { className: "field" }, [
    el("label", { for: id, text: label }),
    el("input", { id, type, placeholder, value }),
    el("span", { className: "error-text", "aria-live": "polite" })
  ]);
}

function validateField(input, isValid, message) {
  const wrapper = input.closest(".field");
  const error = wrapper.querySelector(".error-text");
  wrapper.classList.toggle("error", !isValid);
  error.textContent = isValid ? "" : message;
  return isValid;
}

function modalShell(title, description) {
  const body = el("div", { className: "modal-body" });
  const actions = el("div", { className: "modal-actions" });
  const root = el("div", { className: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "modalTitle" }, [
    el("div", { className: "modal-header" }, [
      el("div", {}, [
        el("h2", { id: "modalTitle", text: title }),
        el("p", { className: "metric-note", text: description })
      ]),
      el("button", { className: "icon-button", type: "button", "aria-label": "Close modal", onclick: closeModal }, [svgIcon("icon-close")])
    ]),
    body,
    actions
  ]);
  return { root, body, actions };
}

function showModal(modalContent) {
  elements.modalRoot.replaceChildren(modalContent);
  elements.modalRoot.hidden = false;
  const firstInput = elements.modalRoot.querySelector("input, button");
  if (firstInput) firstInput.focus();
}

function closeModal() {
  elements.modalRoot.hidden = true;
  elements.modalRoot.replaceChildren();
}

function openChildActivity(childId) {
  const child = appState.children.find((item) => item.id === childId);
  if (!child) return;
  const modal = modalShell(`${child.name}'s activity`, "Recent activity and monitoring state.");
  modal.body.append(
    el("div", { className: "child-meta" }, [
      miniStat("Age", String(child.age)),
      miniStat("Risk", child.risk),
      miniStat("Time online", child.timeOnline),
      miniStat("Monitoring", child.paused ? "Paused" : "Active")
    ]),
    el("h3", { text: "Recent websites", style: "margin-top: 18px;" }),
    el("div", { className: "list-stack" }, child.lastSites.map((site) => softRow(site, "Recent visit", "info")))
  );
  modal.actions.append(el("button", { className: "primary-button", type: "button", text: "Done", onclick: closeModal }));
  showModal(modal.root);
}

function toggleChildMonitoring(childId) {
  appState.children = appState.children.map((child) => {
    if (child.id !== childId) return child;
    return { ...child, paused: !child.paused };
  });
  save(storageKeys.children, appState.children);
  renderRoute();
  const child = appState.children.find((item) => item.id === childId);
  showToast(`${child.name} updated`, child.paused ? "Monitoring paused for this child." : "Monitoring resumed for this child.", "success");
}

function updateSetting(key, value) {
  appState.settings[key] = value;
  save(storageKeys.settings, appState.settings);
  if (key === "softDarkMode") {
    appState.theme = value ? "soft-dark" : "light";
    save(storageKeys.theme, appState.theme);
    applyTheme();
  }
  showToast("Setting saved", "Your preference was stored locally.", "success");
}

function handleMentorSubmit(event) {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const question = input.value.trim();
  if (question.length < 3) {
    showToast("Ask a longer question", "Please enter at least 3 characters.", "warning");
    return;
  }
  appState.chat.push({ from: "user", text: question });
  appState.chat.push({ from: "ai", text: getMentorResponse(question) });
  input.value = "";
  renderRoute();
}

function getMentorResponse(question) {
  const text = question.toLowerCase();
  if (text.includes("lucas")) return aiSuggestions[0];
  if (text.includes("emma")) return aiSuggestions[1];
  if (text.includes("blocked") || text.includes("page") || text.includes("site")) return aiSuggestions[2];
  if (text.includes("mia")) return aiSuggestions[3];
  if (text.includes("risk") || text.includes("alert")) return aiSuggestions[4];
  return aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
}

function renderNotificationPanel() {
  const unread = appState.alerts.filter((alert) => !alert.read);
  const content = unread.length
    ? unread.slice(0, 4).map((alert) => {
      return el("button", {
        className: "notification-item",
        type: "button",
        onclick: () => {
          setRoute("alerts");
          elements.notificationPanel.hidden = true;
        }
      }, [
        el("strong", { text: alert.type }),
        el("small", { text: `${alert.child} - ${alert.time}` })
      ]);
    })
    : [el("div", { className: "notification-item" }, [
      el("strong", { text: "All clear" }),
      el("small", { text: "No unread alerts right now." })
    ])];

  elements.notificationPanel.replaceChildren(
    ...content,
    el("button", { className: "text-button", type: "button", text: "Mark all read", style: "width: 100%; margin-top: 8px;", onclick: markAllAlertsRead })
  );
}

function markAllAlertsRead() {
  appState.alerts = appState.alerts.map((alert) => ({ ...alert, read: true }));
  save(storageKeys.alerts, appState.alerts);
  refreshHeader();
  renderNotificationPanel();
  if (appState.route === "alerts") renderRoute();
  showToast("Notifications cleared", "All alerts were marked read.", "success");
}

function renderSearchResults(query) {
  const normalized = query.toLowerCase();
  const matches = [];

  appState.children.forEach((child) => {
    if (`${child.name} ${child.status} ${child.risk}`.toLowerCase().includes(normalized)) {
      matches.push({ title: `${child.name} (${child.age})`, detail: "Child profile", route: "children" });
    }
  });

  appState.alerts.forEach((alert) => {
    if (`${alert.type} ${alert.child} ${alert.message}`.toLowerCase().includes(normalized)) {
      matches.push({ title: alert.type, detail: `${alert.child} alert`, route: "alerts" });
    }
  });

  appState.blockedSites.forEach((site) => {
    if (`${site.domain} ${site.category}`.toLowerCase().includes(normalized)) {
      matches.push({ title: site.domain, detail: "Blocked site", route: "blocked" });
    }
  });

  if (!matches.length) {
    elements.searchResults.replaceChildren(el("div", { className: "search-result" }, [
      el("strong", { text: "No results" }),
      el("small", { text: "Try Lucas, blocked, alert, or a site name." })
    ]));
    elements.searchResults.hidden = false;
    return;
  }

  elements.searchResults.replaceChildren(...matches.slice(0, 6).map((match) => {
    return el("button", {
      className: "search-result",
      type: "button",
      onclick: () => {
        elements.searchResults.hidden = true;
        elements.searchInput.value = "";
        setRoute(match.route);
      }
    }, [
      el("strong", { text: match.title }),
      el("small", { text: match.detail })
    ]);
  }));
  elements.searchResults.hidden = false;
}

function refreshHeader() {
  const unreadCount = appState.alerts.filter((alert) => !alert.read).length;
  elements.notificationBadge.textContent = String(unreadCount);
  elements.notificationBadge.hidden = unreadCount === 0;
  elements.monitoringSwitch.checked = appState.monitoring;
  elements.monitoringLabel.textContent = appState.monitoring ? "Monitoring ON" : "Monitoring OFF";
  elements.parentNameHeader.textContent = appState.profile.name;
  elements.parentAvatar.textContent = getInitials(appState.profile.name);
}

function applyTheme() {
  document.documentElement.dataset.theme = appState.theme;
  appState.settings.softDarkMode = appState.theme === "soft-dark";
  save(storageKeys.settings, appState.settings);
}

function closeMobileNav() {
  elements.app.classList.remove("nav-open");
  elements.sidebarOverlay.hidden = true;
}

function closeDropdowns() {
  elements.notificationPanel.hidden = true;
  elements.searchResults.hidden = true;
}

function showToast(title, message, type = "success") {
  const toast = el("div", { className: `toast ${type}`, role: "status" }, [
    el("div", {}, [
      el("strong", { text: title }),
      el("small", { text: message })
    ])
  ]);
  elements.toastStack.append(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(18px)";
    setTimeout(() => toast.remove(), 180);
  }, 3200);
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((node) => {
    const rawValue = node.dataset.counter;
    const number = Number(rawValue);
    if (!Number.isFinite(number)) return;
    let start = null;
    const duration = 650;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      node.textContent = String(Math.round(number * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function normalizeRisk(level) {
  const value = String(level).toLowerCase();
  if (value.includes("critical")) return "critical";
  if (value.includes("high")) return "high";
  if (value.includes("moderate")) return "moderate";
  if (value.includes("safe")) return "safe";
  return "info";
}

function labelRisk(level) {
  const normalized = normalizeRisk(level);
  if (normalized === "high") return "High Risk";
  if (normalized === "critical") return "Critical";
  if (normalized === "moderate") return "Moderate";
  if (normalized === "safe") return "Safe";
  return String(level).charAt(0).toUpperCase() + String(level).slice(1);
}

function riskColor(level) {
  const normalized = normalizeRisk(level);
  if (normalized === "safe") return "var(--mint-strong)";
  if (normalized === "moderate") return "var(--yellow-strong)";
  if (normalized === "high" || normalized === "critical") return "var(--red-strong)";
  return "var(--blue-strong)";
}

function normalizeDomain(value) {
  const input = value.trim().toLowerCase();
  try {
    const withProtocol = input.includes("://") ? input : `https://${input}`;
    return new URL(withProtocol).hostname.replace(/^www\./, "");
  } catch {
    return input.replace(/^www\./, "");
  }
}

function isValidDomain(domain) {
  return /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{2,63})+$/.test(domain);
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function cryptoId(prefix) {
  if (window.crypto && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function readStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
