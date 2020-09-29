import { BRAND_COLORS } from './colors';

const NAME = {
    app: "JetO",
    home: "home",
    articles: "articles",
    gallery: "gallery",
    contacts: "contact",
    pageNotFound: "page-not-found",
    scrollButton: "scroll-button",
    snakeXenzia: "snake-xenzia",
};

const ROUTES = {
    [NAME.home]: `${NAME.home}`,
    [NAME.articles]: `${NAME.articles}`,
    [NAME.gallery]: `${NAME.gallery}`,
    [NAME.contacts]: `#${NAME.contacts}`, // # means it is an anchor link (on the same page)
}

const ICONS = {
    [NAME.aboutMe]: { 
        font: `fas fa-user-alt center`, 
        code: `&#xf406;`,
    },
    [NAME.skills]: {
        font: `fas fa-drafting-compass center`,
        code: `&#xf568;`,
    },
    [NAME.projects]: {
        font: `fas fa-sitemap center`,
        code: `&#xf0e8;`,
    },
    [NAME.articles]: {
        font: `far fa-edit center`,
        code: `&#xf044;`,
    },
    [NAME.gallery]: {
        font: `far fa-images center`,
        code: `&#xf302;`, 
    },
    [NAME.contacts]: {
        font: `fas fa-phone-alt center`,
        code: `&#xf879;`,
    },
    [NAME.educationFull]: {
        font: `fas fa-user-graduate center`,
        code: `&#xf501;`,
    },
    [NAME.education]: {
        font: `fas fa-graduation-cap center`,
        code: `&#xf19d;`,
    },
};

const LOGO = {
    src: require("../../assets/logos/JetO512.png"),
    alt: `${NAME.app} icon`,
    dimension: 30,
};

const IMAGES = {
    image: require("../../assets/images/JetO.png"),
}

const USER = {
    image: IMAGES.image,
    firstName: "JetO",
    lastName: "DBL",
    discipline: "Design. Build. Launch",
    mobile: "+23465121439",
    email: "jeto.dbl@gmail.com",
    twitter: "jeto_dbl",
    facebook: "",
    whatsApp: "2348090565698",
    youtube: "",
    youtubeChannelCode: "",
    instagram: "jeto.dbl",
    linkedIn: "",
    github: "jeto-dbl",
};

USER.aboutMe = [
    {
        type: NAME.aboutMe,
        header: "",
        paragraphs: [
            ``,
        ],
        image: IMAGES.image3,
    },
    
];

USER.skills = [
    {
        type: NAME.services,
        // icon: ICONS[NAME.skills].font,
        skills: [
            {
                title: "",
                icon: ICONS[NAME.projects].font,
                progress: "100",  // In percentage
                progressColor: "",
            },
           
        ]
    },
    {
        type: NAME.technical,
        // icon: ICONS[NAME.projects].font,
        skills: [
            {
                title: "",
                icon: "",
                progress: "90",
                progressColor: BRAND_COLORS.autoCad,
            },
        ]
    },
]

USER.projects = [
    {
        type: NAME.projects,
        header: "",
        paragraphs: [
            ``,
        ],
        image: IMAGES.image,
    },
    
];

USER.articles = [
    {
        header: "",
        headerFontSize: "1.5rem",
        paragraphs: [
            ``,
        ],
        image: IMAGES.image,
        link: ``,
        linkType: NAME.external,
    },
   
];

const GALLERY_IMAGES = [
    {
        src: "",
        caption: "",
    },
]

const FA_ICONS = {
    // this has to be called in fontawesome.js since it has a prefix of 'fas' in 'CONTACTS'
    faPhoneAlt: "phone-alt", 
    // this also has to be called in fontawesome.js since it has a prefix of 'fas' in 'CONTACTS'
    faEnvelope: "envelope", 
    faWhatsApp: "whatsapp",
    faWhatsAppSquare: "whatsapp-square",
    faYoutube: "youtube",
    faYoutubeSquare: "youtube-square",
    faLinkedinIn: "linkedin-in",
    faLinkedin: "linkedin",
    faInstagram: "instagram",
    faFacebookF: "facebook-f",
    faFacebook: "facebook",
    faFacebookSquare: "facebook",
    faTwitter: "twitter",
    faTwitterSquare: "twitter-square",
    faGithub: "github",
    faGithubSquare: "github-square",

}

const CONTACTS = [
    // mobile: 
    {
        type: `Mobile handle`,
        title: "Give us a call",
        link: ``,
        // link: `tel:${USER.mobile}`,
        // logoPlain: `fas fa-phone-alt`,
        logoPlain: FA_ICONS.faPhoneAlt,
        prefix: "fas",
        text: USER.mobile,
        color: BRAND_COLORS.mobile,
    },
    // email: 
    {
        type: `Email handle`,
        title: "Send us an email",
        link: `mailto:${USER.email}`,
        // logoPlain: `fas fa-envelope`,
        logoPlain: FA_ICONS.faEnvelope,
        prefix: "fas",
        text: USER.email,
        // color:`#444`,
        color: BRAND_COLORS.email,
    },
    // github: 
    {
        type: `GitHub handle`,
        title: "We would love to work for you",
        link: `https://github.com/${USER.github}`,
        // logoPlain: `fab fa-github`,
        // logoSquare: `fab fa-github-square`,
        logoPlain: FA_ICONS.faGithub,
        logoSquare: FA_ICONS.faGithubSquare,
        prefix: "fab",
        text: USER.github,
        color: BRAND_COLORS.github,
    },
    // twitter: 
    {
        type: `Twitter handle`,
        title: "Send us a tweet",
        link: `https://twitter.com/${USER.twitter}`,
        // logoPlain: `fab fa-twitter`,
        // logoSquare: `fab fa-twitter-square`,
        logoPlain: FA_ICONS.faTwitter,
        logoSquare: FA_ICONS.faTwitterSquare,
        prefix: "fab",
        text: USER.twitter,
        color: BRAND_COLORS.twitter,
    },
    // whatsApp: 
    {
        type: `WhatsApp handle`,
        title: "Let's chat",
        link: ``,
        // link: `https://wa.me/${USER.whatsApp}`,
        // logoPlain: `fab fa-whatsapp`,
        // logoSquare: `fab fa-whatsapp-square`,
        logoPlain: FA_ICONS.faWhatsApp,
        logoSquare: FA_ICONS.faWhatsAppSquare,
        prefix: "fab",
        text: USER.whatsApp,
        color: BRAND_COLORS.whatsapp,
    },
    // youtube: 
    {
        type: `YouTube handle`,
        title: "Watch our amazing contents",
        link: ``,
        // link: `https://www.youtube.com/channel/${USER.youtubeChannelCode}`,
        // logoPlain: `fab fa-youtube`,
        // logoSquare: `fab fa-youtube-square`,
        logoPlain: FA_ICONS.faYoutube,
        logoSquare: FA_ICONS.faYoutubeSquare,
        prefix: "fab",
        text: USER.youtube,
        color: BRAND_COLORS.youtube,
    },
    // linkedIn: 
    {
        type: `Linkedin handle`,
        title: "Reach out to us linkedin",
        link: ``,
        // link: `http://linkedin.com/in/${USER.linkedIn}`,
        // logoPlain: `fab fa-linkedin-in`,
        // logoSquare: `fab fa-linkedin`,
        logoPlain: FA_ICONS.faLinkedinIn,
        logoSquare: FA_ICONS.faLinkedin,
        prefix: "fab",
        text: USER.linkedIn,
        color: BRAND_COLORS.linkedIn,
    },
    // instagram: 
    {
        type:`Instagram handle`,
        title: "Reach out to us on instagram",
        link: `https://www.instagram.com/${USER.instagram}`,
        // logoPlain: `fab fa-instagram`,
        logoPlain: FA_ICONS.faInstagram,
        prefix: "fab",
        text: USER.instagram,
        color: BRAND_COLORS.instagram,
    },
    // facebook: 
    {
        type: `Facebook handle`,
        title: "Reach out to us on facebook",
        link: ``,
        // link: `https://web.facebook.com/${USER.facebook}`,
        // logoPlain: `fab fa-facebook-f`,
        // logoCircle: `fab fa-facebook`,
        // logoSquare: `fab fa-facebook-square`,
        logoPlain: FA_ICONS.faFacebookF,
        logoCircle: FA_ICONS.faFacebook,
        logoSquare: FA_ICONS.faFacebookSquare,
        prefix: "fab",
        text: USER.facebook,
        color: BRAND_COLORS.facebook,
    },
]


export {
    LOGO,
    NAME,
    USER,
    ROUTES,
    ICONS,
    IMAGES,
    GALLERY_IMAGES,
    CONTACTS,
}