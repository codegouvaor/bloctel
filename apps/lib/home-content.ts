import type { FrIconClassName } from "@codegouvaor/react-ads/fr";

/**
 * Content configuration of the Bloctel homepage.
 *
 * The page is entirely driven by this configuration: titles and descriptions
 * resolve from the message catalogs through a message key, hrefs are
 * locale-agnostic pathnames (next-intl Link prefixes the active locale).
 * Updating the homepage means editing this file (and the message catalogs),
 * never rewriting the interface — the same architecture used by every other
 * Astoria portal.
 *
 * The homepage is the *functional front door* of the service, distinct from
 * the header (which allows exploring the seven themes): it lets the visitor
 * understand the service and act now. It tells one story through ten
 * sections, following the journey
 * « Comprendre → Contrôler → Agir → Professionnels → Droits → Aide → Transparence » :
 *
 *   01 Hero                            → popularSearches
 *   02 Comprendre Bloctel              → howSteps
 *   03 Que puis-je contrôler ?         → channels
 *   04 Gérer mes préférences           → preferences
 *   05 Signaler                        → reportSteps
 *   06 Professionnels                  → proEntries
 *   07 Fonctionnement professionnels   → proSteps
 *   08 Droits & réglementation         → legalEntries
 *   09 Aide                            → helpEntries
 *   10 Transparence                    → trustItems
 *
 * Hrefs follow the URL plan of the portal (see `lib/site-structure.ts`):
 * several point to pages being published and will resolve as soon as those
 * sections ship; `/contact` and `/legal/*` already exist.
 */
export type HomeLink = {
  /** Message key (namespace `home`) of the entry label. */
  key: string;
  href: string;
};

/** A labelled item with an icon (message key lives under `home.<ns>.items.<key>`). */
export type HomeIconItem = {
  key: string;
  iconId: FrIconClassName;
};

/** One node of a flow / journey, its label resolves under `home.<ns>.steps.<key>`. */
export type HomeFlowStep = {
  key: string;
};

/** A tile with a description and an icon, its label resolves under `home.<ns>.entries.<key>.title`. */
export type HomeTile = {
  key: string;
  /** Message key (namespace `home`) of the one-line description. */
  descKey: string;
  href: string;
  iconId: FrIconClassName;
};

/** One preference of the demonstration interface. */
export type HomePreference = HomeIconItem;

export const bloctelHome = {
  /**
   * Quick suggestions under the hero search. Labels resolve under
   * `home.search.popular.<key>`.
   */
  popularSearches: [
    { key: "mInscrire", href: "/ma-protection/mon-registre/m-inscrire" },
    { key: "signalement", href: "/signaler/nouveau-signalement/signaler-un-appel" },
    { key: "demarchage", href: "/mes-droits/demarchage" },
    { key: "preferences", href: "/ma-protection/preferences" },
    { key: "reglementation", href: "/reglementation" },
  ] satisfies ReadonlyArray<HomeLink>,
  /**
   * Section 02 — “Comprendre Bloctel”: the principle of the service in three
   * simple steps. Labels resolve under `home.how.steps.<key>`.
   */
  howSteps: [
    { key: "choisir" },
    { key: "enregistre" },
    { key: "verifient" },
  ] satisfies ReadonlyArray<HomeFlowStep>,
  /**
   * Section 03 — “Que puis-je contrôler ?”: the communication channels the
   * visitor can manage. Labels resolve under `home.controls.items.<key>.*`.
   */
  channels: [
    { key: "telephone", iconId: "fr-icon-phone-line" },
    { key: "sms", iconId: "fr-icon-message-2-line" },
    { key: "email", iconId: "fr-icon-mail-line" },
    { key: "courrier", iconId: "fr-icon-mail-open-line" },
    { key: "notifications", iconId: "fr-icon-notification-3-line" },
  ] satisfies ReadonlyArray<HomeIconItem>,
  /**
   * Section 04 — “Gérer mes préférences”: the citizen space presented as a
   * demonstration interface (no connected account exists yet). Statuses are
   * message keys (`home.preferences.items.<key>.status`) so they stay
   * translatable.
   */
  preferences: {
    items: [
      { key: "appels", iconId: "fr-icon-phone-line" },
      { key: "sms", iconId: "fr-icon-message-2-line" },
      { key: "emails", iconId: "fr-icon-mail-line" },
      { key: "courrier", iconId: "fr-icon-mail-open-line" },
    ] satisfies ReadonlyArray<HomePreference>,
    href: "/ma-protection/preferences",
  },
  /**
   * Section 05 — “Signaler”: the reporting journey in three steps. Labels
   * resolve under `home.report.steps.<key>.*`.
   */
  reportSteps: [
    { key: "identifier" },
    { key: "transmettre" },
    { key: "suivre" },
  ] satisfies ReadonlyArray<HomeFlowStep>,
  /**
   * Section 06 — “Professionnels”: the distinct professional journey, kept
   * clearly separated from the citizen path. Labels resolve under
   * `home.pro.entries.<key>.*`.
   */
  proEntries: [
    {
      key: "verifierContact",
      descKey: "pro.entries.verifierContact.desc",
      href: "/professionnels/verifier",
      iconId: "fr-icon-user-search-line",
    },
    {
      key: "verifierCampagne",
      descKey: "pro.entries.verifierCampagne.desc",
      href: "/professionnels/campagnes",
      iconId: "fr-icon-article-line",
    },
    {
      key: "apiBloctel",
      descKey: "pro.entries.apiBloctel.desc",
      href: "/services/developpeurs",
      iconId: "fr-icon-terminal-box-line",
    },
    {
      key: "obligations",
      descKey: "pro.entries.obligations.desc",
      href: "/reglementation/obligations",
      iconId: "fr-icon-book-2-line",
    },
  ] satisfies ReadonlyArray<HomeTile>,
  /**
   * Section 07 — the professional workflow, kept purely pedagogical. Labels
   * resolve under `home.proHow.steps.<key>`.
   */
  proSteps: [
    { key: "fichier" },
    { key: "verification" },
    { key: "contacts" },
    { key: "campagne" },
  ] satisfies ReadonlyArray<HomeFlowStep>,
  /**
   * Section 08 — “Droits & réglementation”: a readable list of legal entry
   * points, never a wall of legal text. Labels resolve under
   * `home.legal.entries.<key>`.
   */
  legalEntries: [
    { key: "vosDroits", href: "/mes-droits/vos-droits" },
    { key: "consentement", href: "/ma-protection/consentements" },
    { key: "revocation", href: "/ma-protection/consentements/retirer-mon-consentement" },
    { key: "exceptions", href: "/reglementation/restrictions" },
    { key: "obligations", href: "/reglementation/obligations" },
    { key: "controles", href: "/reglementation/controles" },
  ] satisfies ReadonlyArray<HomeLink>,
  /**
   * Section 09 — “Aide”: the support entry points. `/contact` already exists;
   * the other destinations follow the URL plan of the portal.
   */
  helpEntries: [
    {
      key: "questionsFrequentes",
      descKey: "help.entries.questionsFrequentes.desc",
      href: "/aide/questions-frequentes",
      iconId: "fr-icon-question-line",
    },
    {
      key: "guides",
      descKey: "help.entries.guides.desc",
      href: "/aide/guides",
      iconId: "fr-icon-book-2-line",
    },
    {
      key: "assistance",
      descKey: "help.entries.assistance.desc",
      href: "/aide/assistance",
      iconId: "fr-icon-question-answer-line",
    },
    {
      key: "contact",
      descKey: "help.entries.contact.desc",
      href: "/contact",
      iconId: "fr-icon-mail-line",
    },
  ] satisfies ReadonlyArray<HomeTile>,
  /**
   * Section 10 — “Transparence”: the institutional closing, focused on trust.
   * Items are informational (no invented statistics, no fake routes); labels
   * resolve under `home.trust.items.<key>`.
   */
  trustItems: [
    { key: "etatService", iconId: "fr-icon-pulse-line" },
    { key: "disponibilite", iconId: "fr-icon-check-line" },
    { key: "api", iconId: "fr-icon-terminal-box-line" },
    { key: "donneesPubliques", iconId: "fr-icon-bar-chart-2-line" },
    { key: "securite", iconId: "fr-icon-shield-line" },
    { key: "protectionDonnees", iconId: "fr-icon-lock-line" },
    { key: "aPropos", iconId: "fr-icon-info-line" },
  ] satisfies ReadonlyArray<HomeIconItem>,
};