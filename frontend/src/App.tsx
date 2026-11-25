import { useMemo, useState, type FormEvent } from "react";
import "./index.css";

type Campaign = {
  id: number;
  subject: string;
  recipient: string;
  status: "Scheduled" | "Sent";
  date: string;
};

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      subject: "Welcome to our newsletter",
      recipient: "alex@example.com",
      status: "Sent",
      date: "Today, 9:30 AM",
    },
    {
      id: 2,
      subject: "Product launch announcement",
      recipient: "sam@example.com",
      status: "Scheduled",
      date: "Tomorrow, 10:00 AM",
    },
    {
      id: 3,
      subject: "November product updates",
      recipient: "jordan@example.com",
      status: "Scheduled",
      date: "Nov 28, 2:00 PM",
    },
  ]);

  const sentCount = campaigns.filter((c) => c.status === "Sent").length;
  const scheduledCount = campaigns.filter(
    (c) => c.status === "Scheduled"
  ).length;

  const filteredCampaigns = useMemo(
    () =>
      campaigns.filter(
        (campaign) =>
          campaign.subject.toLowerCase().includes(search.toLowerCase()) ||
          campaign.recipient.toLowerCase().includes(search.toLowerCase())
      ),
    [campaigns, search]
  );

  function handleSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!subject.trim() || !recipient.trim() || !message.trim() || !scheduleDate) {
      return;
    }

    setCampaigns((previous) => [
      {
        id: Date.now(),
        subject,
        recipient,
        status: "Scheduled",
        date: new Date(scheduleDate).toLocaleString(),
      },
      ...previous,
    ]);

    setSubject("");
    setRecipient("");
    setMessage("");
    setScheduleDate("");
    setShowCompose(false);
    setActiveTab("Campaigns");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">R</div>
          <span>ReachInbox</span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        {["Dashboard", "Campaigns", "Scheduled", "Sent Emails"].map(
          (item) => (
            <button
              key={item}
              className={`nav-item ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              <span className="nav-dot">●</span>
              {item}
            </button>
          )
        )}

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">H</div>
            <div>
              <strong>My Workspace</strong>
              <small>Free plan</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / </span>
            <strong>{activeTab}</strong>
          </div>
          <div className="topbar-right">
            <span className="system-status">
              <span className="status-dot" />
              UI Preview
            </span>
            <div className="avatar">H</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">YOUR EMAIL WORKSPACE</p>
              <h1>
                {activeTab === "Dashboard"
                  ? "Good morning 👋"
                  : activeTab}
              </h1>
              <p className="muted">
                Manage your email campaigns from one place.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowCompose(true)}
            >
              <span>＋</span> Compose Email
            </button>
          </div>

          <div className="stats-grid">
            <StatCard
              title="Total campaigns"
              value={campaigns.length}
              detail="In this preview"
              symbol="✉"
            />
            <StatCard
              title="Scheduled emails"
              value={scheduledCount}
              detail="Waiting to be sent"
              symbol="◷"
            />
            <StatCard
              title="Sent emails"
              value={sentCount}
              detail="Marked as sent"
              symbol="↗"
            />
            <StatCard
              title="Active workers"
              value="—"
              detail="Backend not connected"
              symbol="⚙"
            />
          </div>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Recent campaigns</h2>
                <p className="muted">
                  View and search your email activity.
                </p>
              </div>

              <input
                className="search-input"
                placeholder="Search emails..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>EMAIL SUBJECT</th>
                    <th>RECIPIENT</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="subject-cell">{campaign.subject}</td>
                      <td>{campaign.recipient}</td>
                      <td>
                        <span
                          className={`status-badge ${campaign.status.toLowerCase()}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td>{campaign.date}</td>
                    </tr>
                  ))}
                  {filteredCampaigns.length === 0 && (
                    <tr>
                      <td colSpan={4} className="empty-state">
                        No matching emails found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="info-banner">
            <div className="info-icon">✦</div>
            <div>
              <strong>Your workspace is ready for development</strong>
              <p>
                This is the frontend preview. Email delivery, database storage,
                and background scheduling will be connected in later steps.
              </p>
            </div>
          </div>
        </section>
      </main>

      {showCompose && (
        <div className="modal-backdrop" onClick={() => setShowCompose(false)}>
          <section className="compose-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">NEW CAMPAIGN</p>
                <h2>Compose email</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setShowCompose(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSchedule}>
              <label htmlFor="recipient">Recipient email</label>
              <input
                id="recipient"
                type="email"
                placeholder="name@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />

              <label htmlFor="subject">Email subject</label>
              <input
                id="subject"
                placeholder="Enter your subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your email..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <label htmlFor="scheduleDate">Schedule date and time</label>
              <input
                id="scheduleDate"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                required
              />

              <button className="primary-button submit-button" type="submit">
                Schedule Email →
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  detail,
  symbol,
}: {
  title: string;
  value: string | number;
  detail: string;
  symbol: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <span className="stat-icon">{symbol}</span>
      </div>
      <h2>{value}</h2>
      <p>{detail}</p>
    </div>
  );
}

export default App;
