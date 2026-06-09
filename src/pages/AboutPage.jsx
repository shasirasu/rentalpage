function AboutPage() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>About Rental Scout</h2>
      </div>

      <p className="empty-state">
        Rental Scout is a frontend-only app for exploring rental homes, opening
        listing detail pages, and building a saved shortlist.
      </p>

      <div className="about-grid">
        <article className="about-box">
          <h3>What users can do</h3>
          <ul>
            <li>Browse available rental cards</li>
            <li>Open each rental detail page</li>
            <li>Move between pages using navigation links</li>
            <li>Use the saved page as a shortlist area</li>
          </ul>
        </article>

        <article className="about-box">
          <h3>Current project focus</h3>
          <ul>
            <li>Page-based React structure</li>
            <li>React Router routes</li>
            <li>Local mock rental data</li>
            <li>Frontend-only user flow</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
