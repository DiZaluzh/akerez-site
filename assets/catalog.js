/* Product and work registry.
   Add a future AKEREZ product here and create its page under /products/<slug>/.
   Home and /products/ render this list. Names stay as written. */
window.AKEREZ_CATALOG = {
  products: [
    {
      slug: "verbs",
      href: "/products/verbs/",
      name: "Verbs",
      meta: {
        en: "iPhone · French verbs",
        fr: "iPhone · Verbes français",
        uk: "iPhone · Французькі дієслова",
      },
      summary: {
        en: "Focused conjugation practice — exercises, a conjugator, and progress that stays on the device.",
        fr: "Une pratique ciblée de la conjugaison — des exercices, un conjugueur, et une progression qui reste sur l’appareil.",
        uk: "Зосереджена практика дієвідмінювання — вправи, кон’югатор і прогрес, який лишається на пристрої.",
      },
    },
    {
      slug: "invoice-book",
      href: "/products/invoice-book/",
      name: "Invoice Book",
      meta: {
        en: "iPhone · Invoices",
        fr: "iPhone · Factures",
        uk: "iPhone · Рахунки",
      },
      summary: {
        en: "Create, manage, and export invoices as PDF. Offline, with no account required.",
        fr: "Créez, gérez et exportez des factures en PDF. Hors ligne, sans compte.",
        uk: "Створюйте, ведіть і експортуйте рахунки у PDF. Офлайн, без облікового запису.",
      },
    },
  ],
  work: [
    {
      slug: "berry",
      href: "/work/berry/",
      name: "BERRY",
      meta: {
        en: "Montréal · Studio",
        fr: "Montréal · Studio",
        uk: "Монреаль · Студія",
      },
      summary: {
        en: "A public site and visit experience for an independent beauty studio. Custom work — not an AKEREZ product.",
        fr: "Un site public et une expérience de visite pour un studio de beauté indépendant. Un projet sur mesure — pas un produit AKEREZ.",
        uk: "Публічний сайт і досвід візиту для незалежної студії краси. Індивідуальна робота — не продукт AKEREZ.",
      },
    },
  ],
};
