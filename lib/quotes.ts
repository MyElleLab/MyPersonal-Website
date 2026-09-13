/**
 * A subset of the app's quote library, for the marquee on the landing page.
 *
 * TWENTY of the app's two hundred and forty. The site does not need the
 * library, and shipping a 240 entry JSON to render twenty cards is dead weight
 * in the bundle for no gain.
 *
 * SOURCE OF TRUTH is the app, not this file:
 *   MyPersonal - Xcode/MyPersonal/Resources/quotes.json
 *
 * Every string below is copied VERBATIM from that file, including punctuation
 * and the exact spelling of the author's name. The `id` on each entry is the
 * quote's real id in quotes.json, so any line here can be checked against the
 * app in one grep. Do not edit the text to fit a card. If a quote does not fit,
 * choose a different quote.
 *
 * HOW THESE TWENTY WERE CHOSEN
 *
 *   1. Attributed only. The library has 177 unattributed lines written in the
 *      app's own voice, and they are not marketing copy: read on a website
 *      next to a download button, an unsigned "you are already enough to
 *      start" reads as the site talking to you rather than as a quotation.
 *      All forty Worth entries are unattributed, so Worth is absent here. That
 *      is a consequence of the rule, not a judgement about the category.
 *
 *   2. Short enough for a fixed-width card. Everything here is 75 characters
 *      or fewer, which is at most three lines at the card's measure.
 *
 *   3. Reads standing alone. No quote that needs the surrounding category, the
 *      time of day it was written for, or a second sentence to land.
 *
 *   4. Spread. Four from each of the five attributed categories, and no author
 *      more than four times, so the row does not read as a Seneca playlist.
 *
 *   5. Nothing from the Worth category, which follows from rule 1 and is the
 *      reason WORTH_SAMPLES below exists. See the note there.
 *
 * A NOTE ON QUOTE 53. "Waste no more time arguing about what a good man should
 * be. Be one." used to be set at display size under the hero, and this list
 * excluded it to avoid showing one quote twice. That pull quote has since been
 * deleted: it is an effort-and-virtue line, and it was the largest type on a
 * page whose argument is worth. Quote 53 is simply not among the twenty now,
 * and there is no longer a second place it could clash with.
 */

export type MarqueeQuote = {
  /** The quote's id in the app's quotes.json. Present so this file is checkable. */
  id: number;
  text: string;
  author: string;
};

/** Row one. Drifts left. */
export const QUOTES_ROW_A: MarqueeQuote[] = [
  { id: 14, text: "No great thing is created suddenly.", author: "Epictetus" },
  { id: 41, text: "Self-trust is the first secret of success.", author: "Ralph Waldo Emerson" },
  { id: 31, text: "Nothing is ours, except time.", author: "Seneca" },
  { id: 125, text: "If there is no struggle, there is no progress.", author: "Frederick Douglass" },
  { id: 85, text: "Confine yourself to the present.", author: "Marcus Aurelius" },
  { id: 164, text: "Hitch your wagon to a star.", author: "Ralph Waldo Emerson" },
  { id: 75, text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { id: 110, text: "One today is worth two tomorrows.", author: "Benjamin Franklin" },
  { id: 149, text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
  { id: 60, text: "This above all: to thine own self be true.", author: "William Shakespeare" },
];

/* ---------------------------------------------------------------------------
   Worth samples
   --------------------------------------------------------------------------- */

export type WorthSample = {
  /** The quote's id in the app's quotes.json. */
  id: number;
  /** Verbatim. Unsigned, like every Worth entry. */
  text: string;
  /** The app's own `toneOfDay` for this entry. Not chosen here, read from the data. */
  tone: "morning" | "midday" | "afternoon" | "evening";
  /** A delivery time the app actually offers for that part of the day. */
  time: string;
};

/**
 * Four of the forty Worth lines, one per part of the day.
 *
 * WHY THESE CAN BE UNSIGNED HERE WHEN THEY CANNOT BE IN THE MARQUEE
 *
 * The marquee excludes them, and that exclusion is correct: a bare card reading
 * "You are already enough to start" sitting next to a download button is the
 * SITE addressing the visitor, and an unsigned second-person sentence in a
 * marketing context reads as a claim the company is making about you.
 *
 * The time label is what changes that. "08.00" in front of a line frames it as
 * a transcript of something the app sends at a time you chose, not as the brand
 * talking. The reader is overhearing a notification. That frame does the work
 * an author name would otherwise do, which is why this treatment is a separate
 * section rather than four more marquee cards.
 *
 * The frame is a FACT ABOUT THE DATA, not a device invented for the site. Every
 * Worth entry in quotes.json carries a `toneOfDay`, ten per part of the day, so
 * the app already knows when each of these is meant to arrive. The times below
 * are real options from the app's own delivery picker: 08.00 and 13.00 are two
 * of the three it preselects, 15.00 is the only Afternoon slot it offers, and
 * 21.00 is an Evening slot.
 *
 * All four verified verbatim against quotes.json by id, including the nil
 * author and the toneOfDay.
 */
export const WORTH_SAMPLES: WorthSample[] = [
  {
    id: 205,
    tone: "morning",
    time: "08.00",
    text: "Your value is present the moment you open your eyes.",
  },
  {
    id: 217,
    tone: "midday",
    time: "13.00",
    text: "You are capable in a way that survives your own opinion of it.",
  },
  {
    id: 227,
    tone: "afternoon",
    time: "15.00",
    text: "Tiredness passes through you. You stay.",
  },
  {
    id: 240,
    tone: "evening",
    time: "21.00",
    text: "You already are someone worth being. That was true before today.",
  },
];

/** Row two. Drifts right. */
export const QUOTES_ROW_B: MarqueeQuote[] = [
  { id: 81, text: "Concentration is the secret of strength.", author: "Ralph Waldo Emerson" },
  { id: 22, text: "Great works are performed not by strength but by perseverance.", author: "Samuel Johnson" },
  { id: 139, text: "It is part of the cure to wish to be cured.", author: "Seneca" },
  { id: 162, text: "The journey of a thousand li commences with a single step.", author: "Lao Tzu" },
  { id: 25, text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { id: 45, text: "Only that day dawns to which we are awake.", author: "Henry David Thoreau" },
  { id: 144, text: "Loss is nothing else but change, and change is Nature's delight.", author: "Marcus Aurelius" },
  { id: 167, text: "Nothing great was ever achieved without enthusiasm.", author: "Ralph Waldo Emerson" },
  { id: 83, text: "Our life is frittered away by detail. Simplify, simplify.", author: "Henry David Thoreau" },
  { id: 180, text: "If one does not know to which port one is sailing, no wind is favourable.", author: "Seneca" },
];
