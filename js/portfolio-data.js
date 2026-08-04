/* ============================================================
   PORTFOLIO DATA
   ------------------------------------------------------------
   This is the ONLY file you need to edit to update your video
   gallery. Add, remove, or reorder objects in the array below —
   the grid and the category filters rebuild themselves
   automatically from whatever is in this list.

   FIELDS
   - title      : string  — shown under the video on hover / in the lightbox
   - category   : string  — used to auto-generate the filter pills
                              (use the same spelling across items you
                              want grouped together, e.g. "Podcast")
   - videoSrc   : string  — path or URL to the actual video file (.mp4)
   - posterSrc  : string  — path or URL to a thumbnail image shown
                              before the video plays. Leave "" to fall
                              back to a generated gradient placeholder.
   - client     : string  — optional, shown as a small tag (e.g. niche
                              or platform). Leave "" to hide it.
   ============================================================ */

const PORTFOLIO_ITEMS = [ {
    title: "AI Agent Product – Promotional Video Sample",
    category: "English Content",
    videoSrc: "https://www.youtube.com/embed/B3PTnGbNG2Q",
    posterSrc: "",
    client: "AI Product"
  },
  {
    title: "Arabic Video Edit — High Retention",
    category: "Arabic Content",
 videoSrc: "https://www.youtube.com/embed/a7vG1RSG2tk",
    posterSrc: "",
    client: "Arabic Creator"
  },
  {
    title: "Arabic Podcast Clip — Subtitles & FX",
    category: "Arabic Content",
    videoSrc: "assets/videos/reel-02.mp4",
    posterSrc: "",
    client: "Arabic Podcast"
  },
  {
    title: "Podcast Highlight — \"The Focus Trap\"",
    category: "Podcast",
    videoSrc: "assets/videos/reel-01.mp4",
    posterSrc: "",
    client: "Coaching podcast"
  },
  {
    title: "Founder Story — 60-Second Cut",
    category: "Personal Branding",
    videoSrc: "assets/videos/reel-02.mp4",
    posterSrc: "",
    client: "Business coach"
  },
  {
    title: "5 Mistakes New Students Make",
    category: "Educator",
    videoSrc: "assets/videos/reel-03.mp4",
    posterSrc: "",
    client: "Online educator"
  },
  {
    title: "Behind the Scenes — Launch Week",
    category: "Personal Branding",
    videoSrc: "assets/videos/reel-04.mp4",
    posterSrc: "",
    client: "Digital creator"
  },
  {
    title: "Podcast Clip — Cold Open Hook",
    category: "Podcast",
    videoSrc: "assets/videos/reel-05.mp4",
    posterSrc: "",
    client: "Interview podcast"
  },
  {
    title: "Quick Tip — Caption Style Test",
    category: "Social",
    videoSrc: "assets/videos/reel-06.mp4",
    posterSrc: "",
    client: "Personal account"
  }
];
