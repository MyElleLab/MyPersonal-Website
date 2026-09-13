import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  Section,
  P,
  Note,
  List,
  Item,
  Term,
} from "@/components/LegalPage";
import {
  APP_NAME,
  CONTACT_EMAIL,
  FREE_SLOTS,
  PRO_SLOTS,
  CATEGORIES,
} from "@/lib/site";

/*
  ---------------------------------------------------------------------------
  PROVENANCE

  The free and Pro split below is not marketing copy. It is
  Utilities/ProGate.swift, which is the single place the app decides what is
  gated, read field by field:

    freeSlotLimit = 2, maxSlotLimit = 8       the delivery-slot numbers
    freeCategoryLimit = 1                     the category number
    canCreateGoal(scope:isPro:)               weekly free, monthly and yearly Pro
    canViewHistory / canUseFavorites /
    canShareCard / canChangeAppIcon           the four flat gates

  The grandfathering paragraph is ProGate.swift's "Grandfathering" section,
  which states that nothing is locked or deleted when Pro lapses: extra slots
  stay on disk and go quiet, and lapsed users keep their monthly and yearly
  goals readable and completable.

  The plan list comes from RCConfig.Products. Prices are NOT stated here on
  purpose: they are set per storefront in App Store Connect and localised at
  point of sale, so any number written here would be wrong in most countries
  and would go stale in silence.

  The free trial is described conditionally, also on purpose. Nothing in the
  app hardcodes which plan carries it: PaywallPlans.hasTrial reads
  `introductoryDiscount` off the live StoreKit product, so removing the offer
  in App Store Connect removes it from the UI on its own. A term here naming
  "three days on monthly" would become false the moment that offer moved, and
  nothing would fail to say so.

  DELIBERATELY ABSENT: an AI disclaimer. The boilerplate's terms template
  includes one, and it does not apply. This app contains no model, makes no
  inference and generates no text. All 240 quotes ship as a static JSON file.
  Disclaiming a feature the app does not have is noise at best and misleading
  at worst.

  OPEN ITEM, flagged rather than guessed: choice of law and forum. MyElleLab is
  not a registered company and nothing in the repository establishes the
  studio's legal seat, so no jurisdiction is named below. What IS stated is
  accurate regardless of seat: under EU law a consumer keeps the mandatory
  protections of their own country of residence whatever a contract says. Add a
  choice-of-law clause once the seat is settled; do not invent one.
  ---------------------------------------------------------------------------
*/

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use ${APP_NAME}, including what the free tier covers and how purchases and refunds work.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms apply when you use the app. They are short because the app asks very little of you."
    >
      <Section heading="What the app is">
        <P>
          {APP_NAME} sends you a quote at times you choose, and lets you set
          goals for a week, a month or a year and mark them done. It runs on
          iPhone. Everything you create stays on your device, which is set out
          in the{" "}
          <Link
            href="/privacy"
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            Privacy Policy
          </Link>
          .
        </P>
      </Section>

      <Section heading="Using it">
        <P>
          You may use the app for your own purposes. You may not decompile it,
          resell it, or redistribute the quote library as a dataset. The app,
          its design and its text are ours; what you write in it is yours, and
          it never leaves your device for us to claim anything over.
        </P>
        <P>
          You are responsible for your own goals. The app is a notebook and a
          timer. It is not advice, medical, psychological, financial or
          otherwise, and it is not a substitute for professional help.
        </P>
      </Section>

      <Section heading="Free and Pro">
        <P>The app is free to download. The free tier covers:</P>
        <List>
          <Item>{FREE_SLOTS} delivery times a day</Item>
          <Item>1 of the {CATEGORIES.length} quote categories at a time</Item>
          <Item>Weekly goals</Item>
        </List>
        <P>Pro adds:</P>
        <List>
          <Item>Up to {PRO_SLOTS} delivery times a day</Item>
          <Item>All {CATEGORIES.length} categories at once</Item>
          <Item>Monthly and yearly goals</Item>
          <Item>The history of past periods</Item>
          <Item>Saving quotes</Item>
          <Item>Sharing a quote as an image</Item>
          <Item>The second app icon</Item>
        </List>
        <Note>
          {PRO_SLOTS} is a ceiling, not a figure of speech. iOS holds a limited
          number of pending notifications per app, and the app schedules one per
          delivery time per day so each one can carry a different quote. Pro is
          described as up to {PRO_SLOTS} rather than unlimited because that is
          what it is.
        </Note>
      </Section>

      <Section heading="Purchases">
        <P>
          Pro is available as a subscription, billed monthly or yearly, or as a
          one-time purchase that does not renew. Prices are shown in the app
          before you buy, in your own currency, and are set per country in the
          App Store.
        </P>
        <P>
          Where a free trial is offered it is shown on the plan before you
          confirm. If you do not cancel before the trial ends, the subscription
          starts and is charged.
        </P>
        <List>
          <Item>
            <Term>Payment</Term> is taken by Apple through your App Store
            account. We never see your card.
          </Item>
          <Item>
            <Term>Renewal</Term> is automatic for subscriptions unless you turn
            it off at least 24 hours before the current period ends. Manage or
            cancel in the App Store under your account subscriptions.
          </Item>
          <Item>
            <Term>Refunds</Term> are handled by Apple, not by us. Request one
            through Apple at reportaproblem.apple.com.
          </Item>
          <Item>
            <Term>Restoring</Term> a purchase on another device is done with
            Restore Purchases on the Pro screen, using the same Apple Account.
          </Item>
        </List>
        <P>
          If Pro lapses, nothing you made is deleted. Extra delivery times stay
          on the device and stop firing until you subscribe again, and monthly
          and yearly goals you already set stay readable and can still be
          completed. You just cannot create new ones.
        </P>
      </Section>

      <Section heading="Notifications">
        <P>
          Notifications are off until you allow them, and you can turn them off
          at any time in iOS Settings. Delivery is handled by iOS, so we cannot
          guarantee that a notification arrives at an exact second, or at all if
          the device is off or out of storage.
        </P>
      </Section>

      <Section heading="Availability and changes">
        <P>
          We may change, suspend or discontinue the app or any feature. If a
          paid feature is discontinued during a period you have paid for, ask us
          about a refund and we will take it up with Apple.
        </P>
      </Section>

      <Section heading="No warranty">
        <P>
          The app is provided as it is, without warranty of any kind, to the
          extent the law allows. We do not promise it will be free of faults or
          that a quote will arrive at a moment that helps.
        </P>
      </Section>

      <Section heading="Liability">
        <P>
          To the extent the law allows, we are not liable for indirect or
          consequential loss arising from your use of the app. Nothing in these
          terms limits liability that cannot be limited, including for death or
          personal injury caused by negligence, or for fraud.
        </P>
      </Section>

      <Section heading="Your rights as a consumer">
        <P>
          If you are a consumer in the European Union, the United Kingdom or
          another jurisdiction with mandatory consumer protection, you keep the
          protections of the law where you live. Nothing in these terms takes
          them away, and where these terms conflict with them, they win.
        </P>
      </Section>

      <Section heading="Contact">
        <P>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            {CONTACT_EMAIL}
          </a>
        </P>
      </Section>
    </LegalPage>
  );
}
