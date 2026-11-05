export type ArticleKind = "News" | "Blog";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  index: string;
  kicker: string;
  tagline: string;
  description: string;
  accent: string;
  soft: string;
  image: string;
  secondaryImage?: string;
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  kind: ArticleKind;
  format: string;
  author: string;
  dateLabel: string;
  publishedAt: string;
  readTime: string;
  image?: string;
  quote: string;
  tags: string[];
  body: string[];
};

export const siteInfo = {
  name: "MONOGRAM",
  tagline: "A modern magazine for curious people.",
  edition: "Edition 18 · The Culture Issue",
  date: "Monday, 02 November 2026",
  email: "hello@monogram.example",
};

export const categories: Category[] = [
  {
    slug: "politics",
    name: "Politics",
    shortName: "Politics",
    index: "01",
    kicker: "Power & Policy",
    tagline: "The decisions behind the headlines.",
    description:
      "Clear reporting and thoughtful analysis on public life, institutions, civic ideas, and the policies that quietly reshape everyday routines.",
    accent: "#1749E6",
    soft: "#DFE7FF",
    image: "/images/politics.jpg",
    secondaryImage: "/images/politics-2.jpg",
  },
  {
    slug: "beauty",
    name: "Beauty",
    shortName: "Beauty",
    index: "02",
    kicker: "Style & Self",
    tagline: "What confidence looks like now.",
    description:
      "Beauty reporting with a light touch: routines, runway ideas, color, craft, and the evolving language of personal style.",
    accent: "#DF4E70",
    soft: "#FBE0E7",
    image: "/images/beauty.jpg",
    secondaryImage: "/images/beauty-2.jpg",
  },
  {
    slug: "sports",
    name: "Sports",
    shortName: "Sports",
    index: "03",
    kicker: "Motion & Competition",
    tagline: "The stories beyond the score.",
    description:
      "From elite performance to the culture surrounding the game, this desk follows the people, rituals, and ideas that keep sport moving.",
    accent: "#F05A3C",
    soft: "#FDE1D8",
    image: "/images/sports.jpg",
  },
  {
    slug: "celebrities",
    name: "Celebrities",
    shortName: "Celebs",
    index: "04",
    kicker: "Fame & Craft",
    tagline: "Look closer than the flash.",
    description:
      "Profiles, interviews, and red-carpet reading that treat famous people as working artists, not simply as headlines.",
    accent: "#7B4BD1",
    soft: "#EDE2FF",
    image: "/images/celebrities.jpg",
  },
  {
    slug: "trending",
    name: "Trending Topics",
    shortName: "Trending",
    index: "05",
    kicker: "What Moves Culture",
    tagline: "Signals, not noise.",
    description:
      "A considered guide to the internet's favorite subjects: emerging behaviors, micro-obsessions, and the ideas moving between screens and streets.",
    accent: "#C69300",
    soft: "#FFF0BD",
    image: "/images/trending.jpg",
  },
  {
    slug: "culture",
    name: "Culture",
    shortName: "Culture",
    index: "06",
    kicker: "Art & Ideas",
    tagline: "The good stuff, made by people.",
    description:
      "Dispatches from galleries, stages, bookshops, studios, and all the small rooms where the next conversation begins.",
    accent: "#08766E",
    soft: "#D9F1EC",
    image: "/images/culture.jpg",
  },
  {
    slug: "technology",
    name: "Technology",
    shortName: "Tech",
    index: "07",
    kicker: "Tools & Tomorrow",
    tagline: "Innovation with a human edge.",
    description:
      "Plain-spoken reporting on the products, systems, and design decisions changing how we work, travel, remember, and connect.",
    accent: "#4B43D6",
    soft: "#E3E1FF",
    image: "/images/technology.jpg",
  },
];

export const articles: Article[] = [
  {
    slug: "the-city-hall-after-the-vote",
    category: "politics",
    title: "The City Hall After the Vote",
    dek: "The campaign posters come down, but the real work of local democracy is only beginning.",
    kind: "News",
    format: "Analysis",
    author: "Amara Diallo",
    dateLabel: "31 Oct 2026",
    publishedAt: "2026-10-31",
    readTime: "7 min read",
    image: "/images/politics.jpg",
    quote: "The most consequential decisions are often made in rooms with terrible coffee and very good minutes.",
    tags: ["civic life", "local government", "public trust"],
    body: [
      "The morning after an election has a particular sound. It is the scrape of tape being pulled from painted walls, the fold of cardboard signs, and the quiet return of a building to its ordinary rhythm. Outside, the result is discussed as a single dramatic event. Inside, it becomes a calendar, a set of briefings, and a long list of promises that must now fit inside budgets and business days.",
      "This is where local politics becomes most revealing. A campaign can live comfortably in big ideas; a council chamber has to translate them into route maps, procurement rules, public consultations, and the unglamorous sequence of who signs what. The people who do that work rarely become symbols, yet they determine whether a new mandate feels like change or merely like new stationery.",
      "The useful question, then, is not only who won. It is which parts of the winning argument can survive contact with process, and which communities will be invited into the room before the decision is effectively finished. Democracy is often described as a moment at the ballot box. Anyone who has watched a municipal meeting run past nine at night knows it is also a habit.",
    ],
  },
  {
    slug: "why-small-policies-make-loud-years",
    category: "politics",
    title: "Why Small Policies Make Loud Years",
    dek: "A bus timetable or a permit form can change a city more durably than a grand speech.",
    kind: "Blog",
    format: "Essay",
    author: "Noor Bennett",
    dateLabel: "28 Oct 2026",
    publishedAt: "2026-10-28",
    readTime: "6 min read",
    image: "/images/politics-2.jpg",
    quote: "Policy is usually felt at the scale of a Tuesday.",
    tags: ["policy", "cities", "public services"],
    body: [
      "Grand political language has a short half-life. It dominates a news cycle, supplies a quotation, and then gives way to the next argument. The measures that shape a year are often much less photogenic: an altered eligibility threshold, a revised timetable, a form that takes four minutes instead of forty.",
      "Such changes are difficult to dramatize because their effects accumulate privately. A later bus creates an extra hour with family. A simpler permit lets a corner shop open before the summer. Each instance seems modest; together they alter the texture of a place and the amount of patience people are asked to carry.",
      "That is why reading the small print is not merely an act for specialists. It is a way of noticing where a government expects friction to be tolerated and where it has decided to remove it. The loud years are rarely made by one enormous decision. They are made by a hundred quiet ones that keep showing up.",
    ],
  },
  {
    slug: "a-field-guide-to-the-new-civic-language",
    category: "politics",
    title: "A Field Guide to the New Civic Language",
    dek: "From consultation to co-design, a glossary for words that appear in every public meeting.",
    kind: "Blog",
    format: "Explainer",
    author: "Theo Park",
    dateLabel: "24 Oct 2026",
    publishedAt: "2026-10-24",
    readTime: "5 min read",
    image: undefined,
    quote: "A glossary is a small but useful form of civic power.",
    tags: ["glossary", "participation", "explainers"],
    body: [
      "Public documents have developed a vocabulary that can make simple propositions feel weatherproof. Residents are invited to consultations, strategies are described as place-based, and services become ecosystems. None of these words is inherently dishonest, but all of them can conceal the basic question: who gets to decide?",
      "A consultation traditionally asks for a response to a proposal that has already been drafted. Co-design, at its best, moves the invitation earlier, when the shape of the proposal is still unsettled. Pilot refers to a temporary test, while a framework usually sets the boundaries within which later choices will happen. The distinctions are not academic; they mark the points at which participation can still change an outcome.",
      "The next time a meeting agenda arrives full of familiar abstractions, try translating each item into an ordinary sentence. What is being built, who is paying, when can someone object, and what happens after the objection? A glossary is a small but useful form of civic power.",
    ],
  },
  {
    slug: "the-quiet-return-of-skin",
    category: "beauty",
    title: "The Quiet Return of Skin",
    dek: "Texture, light, and a little restraint are replacing the pursuit of a flawless finish.",
    kind: "News",
    format: "Beauty Report",
    author: "Lila Moreau",
    dateLabel: "01 Nov 2026",
    publishedAt: "2026-11-01",
    readTime: "8 min read",
    image: "/images/beauty.jpg",
    quote: "The most interesting finish now looks like a face, not a filter.",
    tags: ["skin", "makeup", "beauty trends"],
    body: [
      "For several seasons, the dominant beauty image was a surface so smoothed it seemed to have been lit from inside the screen. This autumn, the camera has moved closer again. Freckles remain visible, pores catch the light, and the most compelling complexions have the slight irregularity of skin that is actually doing its job.",
      "The shift is partly technical. Better lighting and higher-resolution imagery make heavy correction obvious, while new formulations favor flexible coverage over total camouflage. But it is also cultural: audiences have become expert at recognizing the visual signature of a filter, and perfection now reads as effort rather than ease.",
      "None of this means the end of artifice. Color is still theatrical, brows are still sculpted, and a deliberately placed shine can be as constructed as any contour. The difference is that the construction no longer needs to deny the face beneath it. The most interesting finish now looks like a face, not a filter.",
    ],
  },
  {
    slug: "color-was-the-whole-conversation",
    category: "beauty",
    title: "Color Was the Whole Conversation",
    dek: "Runway reports from a season that treated pigment as punctuation, not decoration.",
    kind: "Blog",
    format: "Trend Report",
    author: "Ines Kato",
    dateLabel: "30 Oct 2026",
    publishedAt: "2026-10-30",
    readTime: "5 min read",
    image: "/images/beauty-2.jpg",
    quote: "One deliberate stroke can carry an entire look.",
    tags: ["color", "runway", "editorial"],
    body: [
      "The strongest beauty looks this season did not arrive with a full palette. They arrived with one decision: a cobalt lid, a vermilion lip, a wash of acid yellow at the temple. Everything else was kept quiet enough to let that choice speak at normal volume.",
      "There is a practical pleasure in this approach. A single saturated note is easier to translate from a runway photograph to a bathroom mirror, and it does not demand a complete set of matching products. It asks for placement and confidence rather than technical perfection.",
      "More broadly, the season suggests that color is being treated like punctuation. A comma of blue changes the rhythm of a sentence; an exclamation of red changes its temperature. One deliberate stroke can carry an entire look, provided the rest of the page is allowed to breathe.",
    ],
  },
  {
    slug: "five-minutes-one-good-mirror",
    category: "beauty",
    title: "Five Minutes, One Good Mirror",
    dek: "A tiny morning ritual built around daylight, texture, and leaving a few things alone.",
    kind: "Blog",
    format: "Guide",
    author: "Rina Sol",
    dateLabel: "26 Oct 2026",
    publishedAt: "2026-10-26",
    readTime: "4 min read",
    image: undefined,
    quote: "A routine should make the morning shorter, not turn it into a project.",
    tags: ["routine", "wellbeing", "minimalism"],
    body: [
      "A good five-minute routine begins before a product is opened. It begins with the mirror placed near a window, because daylight tells a more forgiving and more accurate story than a bathroom bulb. Look first for what actually needs attention; usually it is less than habit suggests.",
      "Then choose three moves: hydration where skin feels tight, a little coverage only where you want it, and one point of color or definition. Keep the textures light enough that they can be blended with fingers and corrected with a glance. Anything requiring a second tool belongs to another, slower morning.",
      "The point is not to optimize a face. It is to reduce the number of small decisions standing between you and the day. A routine should make the morning shorter, not turn it into a project.",
    ],
  },
  {
    slug: "the-new-rules-of-speed",
    category: "sports",
    title: "The New Rules of Speed",
    dek: "Training, recovery, and data have turned fractions of a second into a team sport.",
    kind: "News",
    format: "Sports Analysis",
    author: "Jules Okafor",
    dateLabel: "01 Nov 2026",
    publishedAt: "2026-11-01",
    readTime: "7 min read",
    image: "/images/sports.jpg",
    quote: "The fastest athlete on the track is supported by an entire invisible team.",
    tags: ["athletics", "performance", "data"],
    body: [
      "A sprint still looks like the simplest event in sport: a straight line, a starting signal, and a body trying to get from one end to the other. The margin that separates a good race from a memorable one, however, is now assembled from thousands of observations made long before the stadium gets loud.",
      "Coaches study force through the ground, sleep patterns, reaction times, and the tiny asymmetries that become expensive at full speed. The best programs treat those measurements as questions rather than verdicts. A number can identify a pattern, but it cannot tell you whether an athlete is rested, confident, or quietly carrying an injury.",
      "The romance of speed survives this scrutiny. If anything, it grows more interesting: the explosive ten seconds are the visible portion of months of careful, collaborative work. The fastest athlete on the track is supported by an entire invisible team.",
    ],
  },
  {
    slug: "how-the-off-season-became-the-main-event",
    category: "sports",
    title: "How the Off-Season Became the Main Event",
    dek: "Training clips, community tournaments, and player-led media keep the story running all year.",
    kind: "Blog",
    format: "Feature",
    author: "Marta Vale",
    dateLabel: "29 Oct 2026",
    publishedAt: "2026-10-29",
    readTime: "6 min read",
    image: "/images/trending.jpg",
    quote: "The calendar still has a pause; the conversation no longer does.",
    tags: ["sports culture", "media", "fandom"],
    body: [
      "There was a time when the end of a season produced a clean silence. Players disappeared, broadcasters switched to other sports, and supporters were left with a results table and a few months of speculation. That silence has been filled, almost entirely, by the athletes themselves.",
      "Training clips, charitable matches, podcasts, behind-the-scenes diaries, and community tournaments now supply a steady rhythm between competitive fixtures. Some of it is carefully produced; some is a phone held at arm's length in an empty gym. Both forms give fans a sense of continuity that the official calendar never quite provided.",
      "The risk is obvious: rest becomes another kind of content, and every quiet week is treated as a gap to be filled. The opportunity is more interesting. Teams can build deeper relationships without asking anyone to care about a score. The calendar still has a pause; the conversation no longer does.",
    ],
  },
  {
    slug: "the-stadium-as-a-living-room",
    category: "sports",
    title: "The Stadium as a Living Room",
    dek: "Why the best fan experiences increasingly happen just outside the turnstiles.",
    kind: "Blog",
    format: "Dispatch",
    author: "Ben Aoki",
    dateLabel: "25 Oct 2026",
    publishedAt: "2026-10-25",
    readTime: "5 min read",
    image: undefined,
    quote: "Belonging is built in the spaces before and after the whistle.",
    tags: ["fan experience", "cities", "community"],
    body: [
      "Arrive two hours early and a stadium reveals a different architecture. The important places are not the seats but the edges: the shaded wall where regulars meet, the food stall that remembers an order, the small plaza where children practice the celebration they saw last week.",
      "Designers have started paying attention to these informal rituals. Wider concourses, open views, places to sit without buying anything, and routes that let a crowd linger rather than merely pass through can make a venue feel less like a machine for processing tickets.",
      "None of this replaces the match. It gives the match a surrounding life. Belonging is built in the spaces before and after the whistle, where supporters recognize one another and the enormous building briefly behaves like a neighborhood.",
    ],
  },
  {
    slug: "after-the-flash-the-work",
    category: "celebrities",
    title: "After the Flash, the Work",
    dek: "A conversation about rehearsal, repetition, and the untelevised years behind an overnight success.",
    kind: "News",
    format: "Interview",
    author: "Cleo Hart",
    dateLabel: "31 Oct 2026",
    publishedAt: "2026-10-31",
    readTime: "9 min read",
    image: "/images/celebrities.jpg",
    quote: "The camera catches the arrival. It almost never catches the commute.",
    tags: ["interview", "creative work", "film"],
    body: [
      "The phrase overnight success is usually told from the point of view of the audience. From the other side, it looks like a long sequence of small rooms: early call times, rejected auditions, a part rewritten overnight, and the particular discipline of continuing when nobody is keeping score.",
      "In this conversation, a working performer describes fame less as a transformation than as a change in volume. The schedule gets fuller, opinions arrive from farther away, and the private process of learning a role becomes public commentary. What remains stable is the craft: rehearsal, repetition, and the willingness to be bad at something before being good at it.",
      "The most revealing moment came when the subject was asked what they would like photographed differently. Not the premiere, they said, but the months before it—the ordinary commute to a rehearsal room, the notes in a paper script, the unglamorous evidence of practice. The camera catches the arrival. It almost never catches the commute.",
    ],
  },
  {
    slug: "the-red-carpet-is-a-reading-room",
    category: "celebrities",
    title: "The Red Carpet Is a Reading Room",
    dek: "What a carefully chosen outfit says about authorship, collaboration, and the art of the entrance.",
    kind: "Blog",
    format: "Essay",
    author: "Sana Reed",
    dateLabel: "28 Oct 2026",
    publishedAt: "2026-10-28",
    readTime: "5 min read",
    image: "/images/hero.jpg",
    quote: "Getting dressed in public is still a form of authorship.",
    tags: ["fashion", "red carpet", "style"],
    body: [
      "A red carpet is often treated as a test with a right answer. The best looks resist that idea. They offer a sentence rather than a verdict: an unexpected proportion, a color borrowed from an old film, a silhouette that changes as the wearer moves.",
      "Behind that sentence is a group of authors. Stylists, designers, tailors, jewelers, hair and makeup artists, and the person who finally decides how to stand all contribute to the image. Reading it well means noticing the collaboration, not reducing the result to a ranking.",
      "This is also why the most memorable entrances tend to have a point of view rather than simply a price. They understand the event, the work being celebrated, and the person's own history with clothes. Getting dressed in public is still a form of authorship.",
    ],
  },
  {
    slug: "a-very-modern-kind-of-icon",
    category: "celebrities",
    title: "A Very Modern Kind of Icon",
    dek: "The contemporary star is expected to be talented, available, candid, and somehow still mysterious.",
    kind: "Blog",
    format: "Profile",
    author: "Milo Grant",
    dateLabel: "23 Oct 2026",
    publishedAt: "2026-10-23",
    readTime: "6 min read",
    image: undefined,
    quote: "Mystery is no longer the absence of information. It is the presence of a boundary.",
    tags: ["profile", "internet culture", "fame"],
    body: [
      "The old machinery of stardom depended on distance. A magazine cover, a controlled interview, and a rare public appearance could make a person feel larger than ordinary life. Today, the same person may post breakfast, answer a reply, and appear in a livestream before lunch.",
      "Availability creates intimacy, but it also creates an expectation of permanent access. The contemporary performer is asked to be candid about process, responsive to audiences, and articulate about every subject that passes through a feed—all while maintaining enough distance to make the work feel special.",
      "A few have found a sustainable rhythm by being specific about what they share. They offer process without surrendering every private hour, and humor without turning their lives into a continuous confession. Mystery is no longer the absence of information. It is the presence of a boundary.",
    ],
  },
  {
    slug: "the-new-shape-of-now",
    category: "trending",
    title: "The New Shape of Now",
    dek: "Culture no longer arrives as one big moment. It gathers in fragments, loops, and unexpected reruns.",
    kind: "News",
    format: "Cover Story",
    author: "Iris Vale",
    dateLabel: "02 Nov 2026",
    publishedAt: "2026-11-02",
    readTime: "10 min read",
    image: "/images/trending.jpg",
    quote: "The present tense has become plural: several nows, moving at different speeds.",
    tags: ["cover story", "culture", "internet", "trends"],
    body: [
      "There was once a dependable sequence to a cultural moment: an appearance, a review, a wave of imitation, and then a slow fade. Now a song can return after a decade because of a ten-second clip, a garment can become omnipresent in one neighborhood and invisible in the next, and a joke can complete three life cycles before lunch. The center has not disappeared exactly; it has multiplied.",
      "This makes trend reporting both harder and more interesting. A single chart cannot explain why one image travels while another disappears, and popularity measured in one place may say little about attachment somewhere else. What matters is the route: who found the thing first, what they changed about it, and whether the second version carries more meaning than the original.",
      "The new shape of now is less like a wave and more like a set of overlapping conversations. Some are fast, some are archival, some are intensely local. The present tense has become plural: several nows, moving at different speeds. A modern magazine cannot pretend to stand above all of them. It can choose to read closely, connect a few dots, and leave enough space for surprise.",
    ],
  },
  {
    slug: "why-everyone-is-talking-about-slow-discovery",
    category: "trending",
    title: "Why Everyone Is Talking About Slow Discovery",
    dek: "The quiet backlash against perfect recommendations, infinite feeds, and knowing the ending too soon.",
    kind: "Blog",
    format: "Trend Report",
    author: "Ada Mensah",
    dateLabel: "31 Oct 2026",
    publishedAt: "2026-10-31",
    readTime: "6 min read",
    image: "/images/technology.jpg",
    quote: "Not knowing what comes next has become a small luxury.",
    tags: ["discovery", "algorithms", "digital habits"],
    body: [
      "Recommendation systems are extremely good at removing the wrong surprise. They learn the shape of a preference and then build a corridor around it, lined with more of the same. The result is efficient, often enjoyable, and occasionally so accurate that it feels as though the future has been spoiled.",
      "Slow discovery is a loose name for the small rituals people are using to put uncertainty back: browsing a shelf without a search term, asking a friend for one album and nothing else, following a footnote into an unfamiliar subject. These are not rejections of technology. They are deliberate changes of pace within it.",
      "The appeal is not nostalgia. It is the pleasure of forming an opinion before being told what the opinion is likely to be. Not knowing what comes next has become a small luxury, and protecting it requires surprisingly little: a closed tab, an unanswered prompt, or a recommendation accepted without reading the reviews first.",
    ],
  },
  {
    slug: "the-group-chat-has-an-archive",
    category: "trending",
    title: "The Group Chat Has an Archive",
    dek: "Our most influential cultural record is scattered across threads, screenshots, and private jokes.",
    kind: "Blog",
    format: "Internet Culture",
    author: "Felix Quinn",
    dateLabel: "27 Oct 2026",
    publishedAt: "2026-10-27",
    readTime: "5 min read",
    image: undefined,
    quote: "The archive is intimate, badly indexed, and more honest than most official histories.",
    tags: ["group chats", "memory", "internet culture"],
    body: [
      "Public platforms are built to be searchable. Private conversations are not. A group chat accumulates in geological layers: a vanished restaurant plan, a screenshot of a headline, a nickname that stopped being funny in March, and the exact message in which a friend first described an idea that later became a project.",
      "That messiness is what makes it valuable. The archive is intimate, badly indexed, and more honest than most official histories. It preserves not only what people shared but how little sense a trend made when it first arrived.",
      "Of course, private records raise private questions: who gets to keep them, who can quote them, and when a joke should be allowed to expire. There is no elegant solution. Perhaps the best approach is to treat the group chat like a family photo album rather than a database—worth revisiting, but not something to publish without asking everyone in the frame.",
    ],
  },
  {
    slug: "the-gallery-that-stayed-open-late",
    category: "culture",
    title: "The Gallery That Stayed Open Late",
    dek: "A small room, a generous hour, and a reminder that art often needs an unhurried audience.",
    kind: "News",
    format: "Culture Dispatch",
    author: "Eva Rossi",
    dateLabel: "30 Oct 2026",
    publishedAt: "2026-10-30",
    readTime: "7 min read",
    image: "/images/culture.jpg",
    quote: "The room became better the moment it stopped asking anyone to hurry.",
    tags: ["art", "galleries", "cities"],
    body: [
      "At seven on a Thursday, the gallery was still lit. Nobody was giving a talk and nothing was being sold with particular urgency. A handful of visitors moved slowly around a room of abstract paintings, and two strangers ended up discussing the same blue rectangle for almost ten minutes.",
      "Late opening is a modest institutional change with a surprisingly large effect. It allows people to arrive after work, to bring a friend without making an occasion of it, and to spend the kind of time that a lunchtime visit rarely permits. The room became better the moment it stopped asking anyone to hurry.",
      "Small cultural spaces are often praised for discovery, but their more radical service may be duration. They let a thought stay unfinished a little longer. On this evening, the gallery did not need a crowd to feel alive; it needed a few people willing to look at one thing and then look again.",
    ],
  },
  {
    slug: "a-second-life-for-the-album-note",
    category: "culture",
    title: "A Second Life for the Album Note",
    dek: "Liner notes are finding new readers in an era that supposedly has no time for context.",
    kind: "Blog",
    format: "Essay",
    author: "Jonah Bell",
    dateLabel: "27 Oct 2026",
    publishedAt: "2026-10-27",
    readTime: "6 min read",
    image: "/images/hero.jpg",
    quote: "Context does not interrupt listening. For some records, it completes it.",
    tags: ["music", "writing", "archives"],
    body: [
      "The album note was supposed to be a casualty of streaming: another physical artifact flattened into a tiny screen. Instead, it has become a deliberate extra. Artists publish scanned notebooks, engineers explain a microphone choice, and listeners seek out the paragraph that tells them why a certain room sounds the way it does.",
      "The renewed interest is not simply nostalgia for paper. It is a response to music arriving without edges. When a song can appear inside any playlist, a note restores a little shape: who played together, what was recorded live, which sentence was written after the last take.",
      "Context does not interrupt listening. For some records, it completes it. A good note does not instruct the audience what to hear; it opens a door beside the sound and leaves it slightly ajar.",
    ],
  },
  {
    slug: "notes-from-the-small-stage",
    category: "culture",
    title: "Notes From the Small Stage",
    dek: "In an intimate room, the space between performers and audience becomes part of the instrument.",
    kind: "Blog",
    format: "Review",
    author: "Priya Shah",
    dateLabel: "22 Oct 2026",
    publishedAt: "2026-10-22",
    readTime: "4 min read",
    image: undefined,
    quote: "The room was not a neutral container. It was the quietest member of the ensemble.",
    tags: ["live music", "performance", "review"],
    body: [
      "The room held perhaps sixty chairs and made no attempt to imitate a concert hall. The lights were simple, the piano was close enough to hear the mechanism, and the first song began without an announcement. That lack of ceremony turned out to be the evening's clearest instruction: listen closely.",
      "Small stages expose everything. A breath before a phrase, the scrape of a chair, the performer's decision to leave a silence unfilled—all become part of the music. The audience, aware of being visible, contributes a particular kind of attention that cannot be reproduced by scale.",
      "By the final piece, the room was not a neutral container. It was the quietest member of the ensemble, holding the notes for a fraction longer and making even the softest passage feel shared.",
    ],
  },
  {
    slug: "the-interface-learns-to-disappear",
    category: "technology",
    title: "The Interface Learns to Disappear",
    dek: "The next design challenge is not adding intelligence, but knowing when to stop announcing it.",
    kind: "News",
    format: "Analysis",
    author: "Kai Nakamura",
    dateLabel: "01 Nov 2026",
    publishedAt: "2026-11-01",
    readTime: "8 min read",
    image: "/images/technology.jpg",
    quote: "The best sign of a thoughtful system is often how rarely it asks to be admired.",
    tags: ["design", "AI", "interfaces"],
    body: [
      "For years, new technology announced itself with a visible badge: a button, a panel, a brightly named mode. Those signals helped people understand that something different was happening. Now that intelligent behavior is spreading into ordinary tools, the badge has become less useful and more insistent.",
      "A quieter interface does not hide what a system is doing. On the contrary, it needs clearer boundaries, better explanations when something goes wrong, and an obvious way to decline a suggestion. The difference is that these controls appear at the moment of relevance rather than as permanent decoration.",
      "This is a design problem, not merely a technical one. The best sign of a thoughtful system is often how rarely it asks to be admired. It completes the task, leaves a understandable trail, and returns attention to the person who had something else to do.",
    ],
  },
  {
    slug: "a-softer-kind-of-smart-city",
    category: "technology",
    title: "A Softer Kind of Smart City",
    dek: "Shade, seating, and reliable information may matter more than another glowing screen.",
    kind: "Blog",
    format: "Feature",
    author: "Elena Ruiz",
    dateLabel: "29 Oct 2026",
    publishedAt: "2026-10-29",
    readTime: "7 min read",
    image: "/images/trending.jpg",
    quote: "A city can be responsive without turning every surface into a dashboard.",
    tags: ["cities", "urban design", "public technology"],
    body: [
      "The phrase smart city still conjures a rendering full of sensors, luminous maps, and glass towers. Walk through a neighborhood at midday, though, and the useful questions are simpler: Is there shade? Can a person sit down? Does the crossing give enough time? Is the transit information correct?",
      "A softer approach starts with those experiences and works backward to the technology. A well-placed sensor might help schedule street cleaning. A simple open-data feed might make a bus arrival more trustworthy. The measure of success is not how much data a district produces but how little friction its residents encounter.",
      "This does not make the engineering less ambitious. It makes the brief more humane. A city can be responsive without turning every surface into a dashboard, and the most advanced system may be the one that leaves the street looking ordinary.",
    ],
  },
  {
    slug: "what-we-keep-when-everything-syncs",
    category: "technology",
    title: "What We Keep When Everything Syncs",
    dek: "Convenience can erase the small differences that make a personal archive feel personal.",
    kind: "Blog",
    format: "Opinion",
    author: "Owen Pike",
    dateLabel: "24 Oct 2026",
    publishedAt: "2026-10-24",
    readTime: "5 min read",
    image: undefined,
    quote: "A backup preserves the file; a keepsake preserves the reason it mattered.",
    tags: ["digital memory", "cloud", "design"],
    body: [
      "Synchronization is one of the quiet triumphs of modern computing. A photograph taken on a phone appears on a laptop, a note survives a lost device, and a document continues exactly where it was left. The miracle is so complete that we notice it only when it fails.",
      "Yet perfect replication can flatten memory. A folder of images arranged by date is not the same as a small set chosen because they mattered. The accidental duplicate, the file named in a hurry, and the version someone edited on a train all carry traces of a decision that a clean system tends to tidy away.",
      "The answer is not to reject convenience. It is to keep a second, deliberately imperfect layer: a printed photograph, a short annotated collection, a folder that is allowed to stay unfinished. A backup preserves the file; a keepsake preserves the reason it mattered.",
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}

export function getArticlesByCategory(slug: string): Article[] {
  return sortedArticles.filter((article) => article.category === slug);
}

export function countArticlesByCategory(slug: string): number {
  return getArticlesByCategory(slug).length;
}

export function getArticle(
  categorySlug: string,
  articleSlug: string,
): Article | undefined {
  return articles.find(
    (article) =>
      article.category === categorySlug && article.slug === articleSlug,
  );
}

export function getArticleHref(article: Article): string {
  return `/explore/${article.category}/${article.slug}`;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sameDesk = sortedArticles.filter(
    (candidate) =>
      candidate.category === article.category && candidate.slug !== article.slug,
  );
  const fromElsewhere = sortedArticles.filter(
    (candidate) =>
      candidate.category !== article.category && candidate.slug !== article.slug,
  );

  return [...sameDesk, ...fromElsewhere].slice(0, limit);
}
