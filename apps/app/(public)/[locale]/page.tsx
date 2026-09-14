import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { bloctelHome } from "@/lib/home-content";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import {
  CtaButtonsGroup,
  LinkTile,
  SearchSuggestionTag,
} from "@/components/public/content/ads-fragments";
import { FlowDiagram } from "@/components/public/content/theme-page";
import { MonEspace } from "@/components/public/home/mon-espace";

const HOME_PATH = "/";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the service-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet. */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const heroCtaStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
};

const heroProLinkStyle: CSSProperties = {
  display: "inline-block",
  marginTop: "1.5rem",
  fontWeight: 600,
  textUnderlineOffset: "0.2em",
};

const searchBlockStyle: CSSProperties = {
  maxWidth: "42rem",
  margin: "2.25rem auto 0",
  textAlign: "left",
};

const searchTitleStyle: CSSProperties = {
  margin: "0 0 0.75rem",
  fontSize: "1.25rem",
  lineHeight: 1.3,
  fontWeight: 700,
};

const popularLabelStyle: CSSProperties = {
  margin: "0 0 0.5rem",
  fontSize: "0.875rem",
  color: "var(--ads-color-text-muted)",
};

const popularListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const linkListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "grid",
  gap: "0",
  maxWidth: "72rem",
};

/** Whole-card link block (alerts, indicators…). */
const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const teaserTitleStyle: CSSProperties = {
  display: "block",
  fontSize: "1.0625rem",
  lineHeight: 1.35,
  fontWeight: 700,
};

const teaserDescStyle: CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const iconBlockStyle: CSSProperties = {
  fontSize: "1.375rem",
  lineHeight: 1,
  color: "var(--ads-color-primary)",
};

const stepBadgeStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  borderRadius: "50%",
  background: "var(--ads-color-primary)",
  color: "var(--ads-color-background)",
  fontSize: "0.9375rem",
  fontWeight: 700,
};

/**
 * Homepage of Bloctel — the functional front door of the service.
 *
 * The header allows exploring the seven themes; this page allows
 * understanding and acting. It answers the visitor's questions one after
 * another:
 *
 *   01 Hero                    — what is Bloctel, and act immediately
 *   02 Comprendre Bloctel      — the principle in three steps
 *   03 Que puis-je contrôler ? — the communication channels
 *   04 Gérer mes préférences   — the citizen space (demonstration)
 *   05 Signaler                — the reporting journey
 *   06 Professionnels          — the distinct professional path
 *   07 Fonctionnement pro      — the campaign check, explained
 *   08 Droits & réglementation — the legal entry points
 *   09 Aide                    — where to find help
 *   10 Transparence            — a trusted public service
 *
 * The page is driven by the `bloctelHome` configuration (lib/home-content.ts)
 * and the message catalogs, so the content can evolve without rewriting the
 * interface. The seven themes deliberately do not appear here as a second
 * navigation: they belong to the header. Newsletter and social accounts are
 * relegated to the footer (stay-in-touch zone of GovernmentFooter).
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* 01 — Hero: institutional statement, immediate actions, then search. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div style={heroCtaStyle}>
            <CtaButtonsGroup
              alignment="center"
              buttons={[
                {
                  children: t("hero.ctaSignaler"),
                  href: "/signaler/nouveau-signalement",
                  priority: "primary",
                  iconId: "fr-icon-arrow-right-line",
                },
                {
                  children: t("hero.ctaPreferences"),
                  href: "/ma-protection/preferences",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div style={searchBlockStyle}>
            <h2 id="home-search-title" style={searchTitleStyle}>
              {t("search.title")}
            </h2>
            <PortalSearchBar label={t("search.label")} placeholder={t("search.placeholder")} />
            <div style={{ marginTop: "1.25rem" }}>
              <p style={popularLabelStyle} id="popular-searches-label">
                {t("search.popularLabel")}
              </p>
              <ul style={popularListStyle} aria-labelledby="popular-searches-label">
                {bloctelHome.popularSearches.map((search) => (
                  <li key={search.key}>
                    <SearchSuggestionTag
                      label={t(`search.popular.${search.key}`)}
                      href={search.href}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href="/professionnels" style={heroProLinkStyle}>
            {t("hero.proLink")}
            <span className="fr-icon-arrow-right-line" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 02 — Comprendre Bloctel: the principle in three simple steps. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="how-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("how.kicker")}</p>
              <h2 id="how-title" className="gov-section__title">
                {t("how.title")}
              </h2>
              <p className="gov-lead">{t("how.lead")}</p>
            </div>
          </div>
          <FlowDiagram
            items={bloctelHome.howSteps.map((step) => ({
              key: step.key,
              label: t(`how.steps.${step.key}`),
            }))}
            caption={t("how.note")}
          />
        </div>
      </section>

      {/* 03 — Que puis-je contrôler ?: the communication channels. */}
      <section className="gov-section" aria-labelledby="controls-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("controls.kicker")}</p>
              <h2 id="controls-title" className="gov-section__title">
                {t("controls.title")}
              </h2>
              <p className="gov-lead">{t("controls.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {bloctelHome.channels.map((channel) => (
              <li key={channel.key} className="fr-col-12 fr-col-md-6 fr-col-lg">
                <div style={teaserCardStyle}>
                  <span className={channel.iconId} aria-hidden="true" style={iconBlockStyle} />
                  <span style={teaserTitleStyle}>{t(`controls.items.${channel.key}.title`)}</span>
                  <span style={teaserDescStyle}>{t(`controls.items.${channel.key}.desc`)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Gérer mes préférences: the citizen space, shown as a
          demonstration interface until a connected account exists. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="espace-title">
        <div className="gov-section__container" style={{ maxWidth: "64rem" }}>
          <MonEspace />
        </div>
      </section>

      {/* 05 — Signaler: the reporting journey in three steps, then act. */}
      <section className="gov-section" aria-labelledby="report-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("report.kicker")}</p>
              <h2 id="report-title" className="gov-section__title">
                {t("report.title")}
              </h2>
              <p className="gov-lead">{t("report.lead")}</p>
            </div>
          </div>
          {/* `fr-raw-list` neutralises the DSFR `ol > li::marker` counter so the
              step numbers come only from the badges below, never twice. */}
          <ol role="list" className="fr-raw-list fr-grid-row fr-grid-row--gutters" style={{ margin: "0", padding: "0" }}>
            {bloctelHome.reportSteps.map((step, index) => (
              <li key={step.key} className="fr-col-12 fr-col-md-4">
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    height: "100%",
                    padding: "1rem 1.25rem",
                    background: "var(--ads-color-background)",
                    border: "1px solid var(--ads-color-border)",
                  }}
                >
                  <span style={stepBadgeStyle} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>
                    <span style={{ display: "block", fontWeight: 700 }}>
                      {t(`report.steps.${step.key}.title`)}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.9375rem",
                        lineHeight: 1.55,
                        color: "var(--ads-color-text-muted)",
                      }}
                    >
                      {t(`report.steps.${step.key}.text`)}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ margin: "1rem 0 0", fontSize: "0.875rem", color: "var(--ads-color-text-muted)" }}>
            {t("report.note")}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("report.cta"),
                  href: "/signaler/nouveau-signalement",
                  priority: "primary",
                  iconId: "fr-icon-arrow-right-line",
                },
                {
                  children: t("report.ctaSecondary"),
                  href: "/signaler/mes-signalements",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 06 — Professionnels: the distinct professional path, clearly
          separated from the citizen journey. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="pro-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("pro.kicker")}</p>
              <h2 id="pro-title" className="gov-section__title">
                {t("pro.title")}
              </h2>
              <p className="gov-lead">{t("pro.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("pro.cta"),
                  href: "/professionnels",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {bloctelHome.proEntries.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`pro.entries.${item.key}.title`)}
                  desc={t(item.descKey)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Fonctionnement pour les professionnels: the campaign check,
          kept purely pedagogical. */}
      <section className="gov-section" aria-labelledby="prohow-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("proHow.kicker")}</p>
              <h2 id="prohow-title" className="gov-section__title">
                {t("proHow.title")}
              </h2>
              <p className="gov-lead">{t("proHow.lead")}</p>
            </div>
          </div>
          <FlowDiagram
            items={bloctelHome.proSteps.map((step) => ({
              key: step.key,
              label: t(`proHow.steps.${step.key}`),
            }))}
            caption={t("proHow.note")}
          />
        </div>
      </section>

      {/* 08 — Droits & réglementation: a readable list of legal entry
          points, never a wall of legal text. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="legal-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("legal.kicker")}</p>
              <h2 id="legal-title" className="gov-section__title">
                {t("legal.title")}
              </h2>
              <p className="gov-lead">{t("legal.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("legal.cta"),
                  href: "/reglementation",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul role="list" style={linkListStyle}>
            {bloctelHome.legalEntries.map((entry) => (
              <li key={entry.key}>
                <a
                  href={entry.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "var(--ads-color-text)",
                    border: "1px solid var(--ads-color-border)",
                    borderTop: "none",
                    background: "var(--ads-color-background)",
                  }}
                >
                  {t(`legal.entries.${entry.key}`)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Aide: the support entry points. */}
      <section className="gov-section" aria-labelledby="help-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("help.kicker")}</p>
              <h2 id="help-title" className="gov-section__title">
                {t("help.title")}
              </h2>
              <p className="gov-lead">{t("help.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("help.cta"),
                  href: "/aide",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {bloctelHome.helpEntries.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`help.entries.${item.key}.title`)}
                  desc={t(item.descKey)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Transparence: institutional closing, focused on trust. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="trust-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("trust.kicker")}</p>
          <h2 id="trust-title" className="gov-section__title">
            {t("trust.title")}
          </h2>
          <p
            style={{
              margin: "0 auto 1.5rem",
              maxWidth: "42rem",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "var(--ads-color-text-muted)",
            }}
          >
            {t("trust.lead")}
          </p>
          <ul
            role="list"
            style={{
              ...popularListStyle,
              justifyContent: "center",
              marginTop: "1.5rem",
              gap: "0.625rem 1.75rem",
            }}
          >
            {bloctelHome.trustItems.map((item) => (
              <li
                key={item.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                }}
              >
                <span
                  className={item.iconId}
                  aria-hidden="true"
                  style={{ fontSize: "1.125rem", color: "var(--ads-color-primary)" }}
                />
                {t(`trust.items.${item.key}`)}
              </li>
            ))}
          </ul>
          <p
            style={{
              margin: "1.5rem auto 0",
              maxWidth: "42rem",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "var(--ads-color-text-muted)",
            }}
          >
            {t("trust.note")}
          </p>
        </div>
      </section>
    </>
  );
}