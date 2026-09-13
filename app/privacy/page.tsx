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
import { APP_NAME, CONTACT_EMAIL, QUOTE_COUNT } from "@/lib/site";

/*
  ---------------------------------------------------------------------------
  PROVENANCE

  Every factual claim on this page was checked against the app's source before
  it was written, not after. Nothing here is inherited from a template and
  nothing is phrased to sound reassuring. The map from claim to code:

    "stays on your device"
      MyPersonalApp.swift:80-88   ModelContainer(for: Goal, FavoriteQuote,
                                  DeliverySlot) with no CloudKit container.
                                  Default on-disk store.
      No .entitlements file exists in the target, so no App Groups, no
      CloudKit, no iCloud sync of any kind.

    "no account"
      No authentication code of any kind in the target. No sign-in view,
      no Sign in with Apple, no Purchases.logIn call, no appUserID set.

    "no analytics, no advertising, no tracking"
      A grep across all 60 Swift files for Firebase, Mixpanel, Amplitude,
      Sentry, PostHog, TelemetryDeck, ATTrackingManager and ASIdentifierManager
      returns nothing. project.pbxproj declares exactly ONE remote package,
      RevenueCat (purchases-ios-spm). PrivacyInfo.xcprivacy sets
      NSPrivacyTracking=false with an empty NSPrivacyTrackingDomains array.

    "purchases are the exception"
      MyPersonalApp.swift:75      Purchases.configure(withAPIKey:)
      SubscriptionManager.swift   the only four SDK calls the app makes:
                                  customerInfo(), offerings(), purchase(),
                                  restorePurchases().

    "quotes ship inside the app"
      Resources/quotes.json, 240 entries. QuoteLibrary.swift's header states
      "No network, no API, no cache invalidation: the library is a build
      artifact and cannot change at runtime."

    "notifications are built on your device"
      NotificationService.swift uses UNUserNotificationCenter only. Content is
      assembled locally from the bundled library by QuoteScheduler.

    "the only permission asked for is notifications"
      The single requestAuthorization call in the target is
      NotificationService.swift:54. No camera, photo library, location,
      contacts, microphone or health API is referenced anywhere.

  WHAT THIS PAGE DELIBERATELY DOES NOT SAY

  The app's own onboarding currently claims "No analytics, no ads, no
  third-party SDKs" (ConsentModalView.swift:51). The last clause is FALSE:
  RevenueCat is a third-party SDK and it makes network requests. That copy is
  being corrected in the app. It must never be reproduced here.

  OPEN ITEM, flagged rather than guessed: the controller's registered
  establishment. MyElleLab is not a registered company (see the studio site's
  lib/schema.ts, which omits legalName and address for the same reason), so no
  entity, address or VAT number is asserted below. Art. 13 is satisfied by an
  identified controller and a working contact address, both of which are here.
  If a registered entity exists, add it and name the lead supervisory
  authority; do not invent either.
  ---------------------------------------------------------------------------
*/

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${APP_NAME} handles your data. Everything you create stays on your iPhone. There is no account and no analytics.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Everything you create in this app stays on your iPhone. We cannot see it. This page explains that in full, including the one thing that does leave your device."
    >
      <Section heading="The short version">
        <List>
          <Item>
            Your goals, your saved quotes and your delivery times are stored on
            your iPhone and nowhere else.
          </Item>
          <Item>There is no account. You never give us a name or an email.</Item>
          <Item>There is no analytics, no advertising and no tracking.</Item>
          <Item>
            The one exception is purchases. If you buy Pro, Apple and our
            payments provider handle that, and neither of them receives
            anything you have written.
          </Item>
        </List>
      </Section>

      <Section heading="Who is responsible">
        <P>
          {APP_NAME} is made by MyElleLab, an independent iOS studio run by
          Leonardo Ferhati. For anything in this policy, including any request
          about your data, write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </P>
      </Section>

      <Section heading="What stays on your device">
        <P>
          The app stores the following on your iPhone, in its own private
          storage. None of it is uploaded, backed up to a server we control, or
          readable by us:
        </P>
        <List>
          <Item>
            <Term>Goals.</Term> The title, an optional note, the scope you chose
            (weekly, monthly or yearly), the period it belongs to, and whether
            and when you completed it.
          </Item>
          <Item>
            <Term>Saved quotes.</Term> Which quotes you kept, and when.
          </Item>
          <Item>
            <Term>Delivery times.</Term> The times of day you asked to be sent a
            quote, and whether each one is on.
          </Item>
          <Item>
            <Term>Settings.</Term> Which categories you have on, your language,
            whether sound and haptics are on, and the date you accepted this
            policy.
          </Item>
        </List>
        <Note>
          Goals, saved quotes and delivery times are held in the app&rsquo;s
          local database. Settings are held in the app&rsquo;s own preferences
          store. If you use iCloud Backup, Apple backs up your iPhone as a
          whole, including this app, under Apple&rsquo;s terms rather than ours.
          We have no access to that backup.
        </Note>
      </Section>

      <Section heading="What leaves your device">
        <P>
          One thing does, and only if you open the Pro screen or make a
          purchase.
        </P>
        <P>
          <Term>Apple</Term> processes the payment. We never see your payment
          details. Apple tells the app whether a purchase is active, and nothing
          about who you are.
        </P>
        <P>
          <Term>RevenueCat</Term> is the service that tells the app whether your
          purchase is still valid. When the app starts, when it returns to the
          foreground, and when you buy or restore, it asks RevenueCat that
          question. RevenueCat receives an anonymous identifier that it
          generates for the installation, your App Store receipt, and basic
          device and country information that comes with the request. It does
          not receive your goals, your saved quotes, your delivery times, your
          name or your email, because the app never sends them.
        </P>
        <Note>
          RevenueCat is a data processor for this purpose, based in the United
          States. Its own privacy policy is at{" "}
          <a
            href="https://www.revenuecat.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            revenuecat.com/privacy
          </a>
          . If you never open the Pro screen and never buy anything, the app
          still checks your purchase status at launch, which is the one request
          it makes on its own.
        </Note>
      </Section>

      <Section heading="Quotes and notifications">
        <P>
          All {QUOTE_COUNT} quotes ship inside the app. Nothing is fetched, so
          reading a quote sends no request anywhere and we cannot tell which
          quotes you have seen.
        </P>
        <P>
          Notifications are built and scheduled on your iPhone by iOS. There is
          no push server. We do not know when a notification was delivered, or
          whether you opened it. Notifications are off until you allow them, and
          you can turn them off at any time in iOS Settings.
        </P>
      </Section>

      <Section heading="What the app does not do">
        <List>
          <Item>No account, no sign-in, no password.</Item>
          <Item>No analytics and no crash reporting.</Item>
          <Item>No advertising and no ad identifiers.</Item>
          <Item>
            No tracking across apps or websites. The app never presents the App
            Tracking Transparency prompt because it has nothing to ask for.
          </Item>
          <Item>No profiling and no automated decision making.</Item>
          <Item>No selling or sharing of data, because there is none to sell.</Item>
          <Item>
            No access to your camera, photos, location, contacts, microphone or
            health data. The app never asks. The only permission it requests is
            notifications.
          </Item>
        </List>
      </Section>

      <Section heading="Legal bases">
        <P>
          Under the GDPR we rely on two bases, and only two. Storing what you
          create on your own device is necessary to provide the app you asked
          for, which is <Term>performance of a contract</Term>. Checking your
          purchase status with Apple and RevenueCat is also necessary to provide
          the paid features, on the same basis. Sending you notifications is
          based on <Term>your consent</Term>, given through the iOS permission
          prompt, and withdrawn by turning notifications off.
        </P>
      </Section>

      <Section heading="How long it is kept">
        <P>
          Your data stays on your iPhone until you delete it or delete the app.
          There is no retention period on our side because there is no copy on
          our side. Deleting the app removes everything it stored.
        </P>
        <P>
          You can also clear everything without deleting the app, in Settings,
          then Data Management, then Clear all data. That removes your goals,
          your saved quotes and your delivery times from the device. Your
          settings and your recorded consent date are kept, so the app does not
          ask you to accept this policy again.
        </P>
        <P>
          Apple and RevenueCat keep purchase records under their own retention
          rules, which we do not set.
        </P>
      </Section>

      <Section heading="Your rights">
        <P>
          The GDPR gives you the right to access your data, to correct it, to
          erase it, to restrict or object to its processing, to receive it in a
          portable form, and to withdraw consent at any time.
        </P>
        <P>
          For everything the app stores, you exercise those rights directly and
          immediately, without asking us and without waiting:
        </P>
        <List>
          <Item>
            <Term>Access and portability.</Term> Settings, then Data Management,
            then Export. You get a CSV file containing your goals, your saved
            quotes and your delivery times, which you can send anywhere. Export
            is not behind the paywall.
          </Item>
          <Item>
            <Term>Correction.</Term> Edit or delete any goal, saved quote or
            delivery time in the app.
          </Item>
          <Item>
            <Term>Erasure.</Term> Clear all data, or delete the app.
          </Item>
          <Item>
            <Term>Withdrawing consent to notifications.</Term> Turn them off in
            iOS Settings.
          </Item>
        </List>
        <P>
          For purchase records held by Apple or RevenueCat, write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and we will pass the request on. Include the approximate date of
          purchase, since we have no way of identifying you otherwise.
        </P>
        <P>
          You also have the right to complain to your local data protection
          authority.
        </P>
      </Section>

      <Section heading="Children">
        <P>
          The app is not directed at children and collects nothing that would
          identify anyone, of any age.
        </P>
      </Section>

      <Section heading="Changes">
        <P>
          If this policy changes in a way that affects you, the date at the top
          of this page changes with it and the app asks you to read it again.
          The current version is always at this address.
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
        <Note>
          See also the{" "}
          <Link
            href="/terms"
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
          >
            Terms of Use
          </Link>
          .
        </Note>
      </Section>
    </LegalPage>
  );
}
