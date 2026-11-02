import { TwinFigure } from '@/components/TwinFigure';
import { ContactForm } from '@/components/ContactForm';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import { about, hero, projects, site, skills, talks } from '@/lib/content';

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="sec-head">
      <span className="num-label">§ {num}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [first, ...rest] = about.paragraphs;

  return (
    <>
      <TwinFigure />

      <main>
        <section id="hero" className="sec half" data-sec>
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 className="display">Du réel au <em>simulé</em>, et retour.</h1>
          <p className="lede justify">{hero.lede}</p>
          <div className="actions">
            <a href="#work" className="btn btn-primary btn-lg">Projets choisis <ArrowRight /></a>
            <a href={site.cvUrl} className="btn btn-secondary btn-lg">CV (PDF)</a>
          </div>
          <div className="kpis">
            {hero.kpis.map((k) => (
              <div key={k.label}>
                <div className="kpi-val">{k.value}</div>
                <div className="kpi-lbl">{k.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="sec half right" data-sec>
          <SectionHead num="02" title="À propos" />
          <div className="prose justify">
            <p>
              <span className="dropcap" aria-hidden="true">{first[0]}</span>
              <span className="sr-only">{first[0]}</span>
              {first.slice(1)}
            </p>
            {rest.map((p) => <p key={p}>{p}</p>)}
          </div>
          <dl className="facts" style={{ margin: 0 }}>
            {about.facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </section>

        <section id="work" className="sec" data-sec>
          <SectionHead num="03" title="Projets choisis" />
          <div className="cards">
            {projects.map((p, i) => (
              <article key={p.title} className="card">
                <div className="card-top">
                  <span className="card-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tag tag-outline">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="card-body justify">{p.body}</p>
                <div className="card-stack">{p.stack}</div>
                <div className="card-stats">
                  {p.stats.map((s) => (
                    <div key={s.label}><div className="v">{s.value}</div><div className="l">{s.label}</div></div>
                  ))}
                </div>
                <a href={p.href} className="btn btn-ghost">Étude de cas <ArrowUpRight size={14} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="sec half" data-sec>
          <SectionHead num="04" title="Compétences, maillon par maillon" />
          <p className="intro justify">
            La boucle real-to-sim-to-real ne tient que si chaque maillon tient. Chacun est nommé sur la figure : de la caméra au poignet jusqu’au calculateur dans le socle.
          </p>
          <ul className="skills">
            {skills.map((s) => (
              <li key={s.code}>
                <span className="code">{s.code}</span>
                <div><div className="name">{s.name}</div><div className="desc">{s.desc}</div></div>
              </li>
            ))}
          </ul>
        </section>

        <section id="talks" className="sec half right" data-sec>
          <SectionHead num="05" title="Publications et conférences" />
          <div className="talks">
            {talks.map((t) => (
              <a key={t.title} href={t.href} className="talk">
                <span className="year">{t.year}</span>
                <span className="body"><span className="title">{t.title}</span><span className="venue">{t.venue}</span></span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="sec" data-sec>
          <span className="eyebrow num">§ 06 — Contact</span>
          <h2 className="display">Un robot à <em>jumeler</em> ?</h2>
          <p className="contact-lede">Parlez-moi de la cellule, du robot et de la tâche. Je réponds sous deux jours ouvrés.</p>
          <ContactForm />
          <div className="links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
          </div>
          <p className="colophon">Composé en Helvetica. Figure dessinée en CSS. © 2026 {site.name}.</p>
        </section>
      </main>
    </>
  );
}
