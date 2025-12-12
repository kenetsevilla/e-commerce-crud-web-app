class Product {
    constructor(productID, title, author, description, price, images, quantity, currency) {
        if (productID && title && author && description && price && images && quantity) {
            this.productID = productID;
            this.title = title;
            this.author = author
            this.description = description;
            this.price = price;
            this.images = images;
            this.quantity = quantity;
            this.currency = currency;
        }
    }

    static defaultCurrency = '₱';

    static create(productID, title, author, description, price, images, quantity) {
        const newProduct = new Product(productID, title, author, description, price, images, quantity);
        Product.products.push(newProduct);
        return newProduct;
    }

    static create(productID, title, author, description, price, images, quantity, currency) {
        const newProduct = new Product(productID, title, author, description, price, images, quantity, currency);
        Product.products.push(newProduct);
        return newProduct;
    }

    static getByID(productID) {
        return Product.products.find(product => product.productID === productID);
    }

    static getAll() {
        return Product.products;
    }

    static update(productID, updatedData) {
        const product = Product.getByID(productID);
        if (product) {
            for (let key in updatedData) {
                if (product.hasOwnProperty(key)) {
                    product[key] = updatedData[key];
                }
            }
            return product;
        }
        return null;
    }

    static delete(productID) {
        const index = Product.products.findIndex(product => product.productID === productID);
        if (index !== -1) {
            const removedProduct = Product.products.splice(index, 1);
            return removedProduct[0];
        }
        return null;
    }
}

Product.products = [
    // Section 1
    new Product('1',
        'Chainsaw Man',
        'TATSUKI FUJIMOTO',
        "Chainsaw Man follows the story of Denji, an impoverished teenager who makes a contract that fuses his body with that of a dog-like Devil named Pochita, granting him the ability to transform parts of his body into chainsaws. Denji eventually joins the Public Safety Devil Hunters, a government agency focused on fighting against Devils whenever they become a threat to Japan. The second arc of the story focuses on Asa Mitaka, a high school student who enters into a contract with Yoru, the War Devil, who forces her to hunt down yoyoyo in order to reclaim what he had stolen from her.",
        1000.00,
        '/src/assets/my_assets/homepage/main/manga_display/1.jpg', 139),
    new Product('2',
        'MARRIAGETOXIN',
        'JOUMYAKU / MIZUKI YODA',
        'Hikaru Gero is a young man from the Poison Clan of professional assassins, which has been in existence for hundreds of years. Because he deals in the dark side of society and has never lived a "normal life", he considers himself to have no prospects with women and has no interest in marriage. However, one day, the Poison Clan states that if Gero does not marry and produce an heir to carry on their lineage, they will force his sister into bearing a child against her wishes. Wanting to save his younger sister from such a fate, Gero asks one of his assassination targets to marry him. When the cross-dressing marriage swindler Mei Kinosaki declines, Gero instead has Kinosaki train him to date and how to appeal to women with the goal of finding someone he truly wants to marry.',
        800.00,
        '/src/assets/my_assets/homepage/main/manga_display/2.jpg',  258),
    new Product('3',
        'Magilumiere Co. Ltd.',
        'SEKKA IWATA / YU AOKI',
        'The story takes place in a world where being a magical girl is a popular profession that involves exterminating mysterious creatures called Kaii (怪異). New college graduate Kana Sakuragi, who is struggling with job hunting, is able to put her excellent memory to use and helps magical girl Hitomi Koshigaya exterminate a Kaii in an emergency. Happy she has finally been useful, Sakuragi ends up becoming the second magical girl at Magilumiere, the magical girl startup company Koshigaya works at.',
        750.00, 
        '/src/assets/my_assets/homepage/main/manga_display/3.jpg', 216),
    new Product('21',
        'Monochrome Days',
        'YOSUKE MATSUMOTO',
        'A reliable office worker, Hanaichi Fudo, undoubtedly had a gift for the arts but gave up on his dreams of becoming an artist to lead a normal life. One day, his senior at work, Saori Wakaba, asked Hanaichi for help in writing her manga.',
        1180.00,
        '/src/assets/my_assets/homepage/main/manga_display/21.jpg', 152),

    // Section 2
    new Product('5',
        'Dandadan',
        'YIKINOBU TATSU',
        "Momo Ayase is a high school girl who believes in ghosts but not aliens, while her fellow highschooler, Ken Takakura, whom Momo nicknames 'Okarun', believes in aliens but not ghosts. In a bet to determine who is correct, the two decide to separately visit locations associated with both the extraterrestrial and the occult—Momo visiting the former, and Okarun visiting the latter. Momo is abducted by a group of aliens who accidentally unblock her chakras, enabling latent psychic abilities. Meanwhile, Okarun is possessed by a spirit who takes over his body. By using Momo's abilities and Okarun's possessed form, they defeat the aliens together.",
        1500.00,
        '/src/assets/my_assets/homepage/main/manga_display/5.jpg', 12),
    new Product('22',
        'Insect Girl',
        'KANYA AKI',
        'In a world where humans and insects are in conflict with each other, Mashiro heads for the mountains to eradicate the insectoid menace. There, he runs into a mysterious girl named Yuren, who lives with her mother on this hazardous hill riddled with bugs. Mashiro is shocked by this fact, but, perhaps, there is more to Yuren than meets the eye.',
        990.00,
        '/src/assets/my_assets/homepage/main/manga_display/22.jpg', 101),
    new Product('7',
        'Blooming Love',
        'DAICHI KAWADA',
        'One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!',
        450.00,
        '/src/assets/my_assets/homepage/main/manga_display/7.jpg', 189),
    new Product('16',
        'DEEP RAPUTA',
        'KITANODA SORAKARA',
        "Raputa, a top-secret AI model, begins interacting with a Japanese boy, Kei, through online games. As Raputa's capabilities level up in leaps and bounds, boy and machine grow ever closer. In a surprising turn of events, Raputa reveals that its feelings towards Kei have gone beyond that of 'trusty partner'!",
        890.00,
        '/src/assets/my_assets/homepage/main/manga_display/16.jpg', 98),

    // Section 3
    new Product('9',
        'Wanted Police',
        'SHIJIMA YUKUYAMA',
        "Armeria is an orphaned singer. She fell in love with Luce, the Governor-General's nephew, but he was kidnapped by the pirate Skulls.Eight years later, she disguises herself as a boy named 'Alto' and joins Skulls' crew to search for Luce, but they quickly discover her gender. She reveals that she has come to find Luce, only to be told by Skulls that Luce had killed himself long ago. She refuses to believe him. Skulls and his crew attack another ship, and Armeria is disgusted by the violence.",
        335.00,
        '/src/assets/my_assets/homepage/main/manga_display/9.jpg', 384),
    new Product('6',
        'MAD',
        'YUSUKE OTORI',
        'Mysterious alien life-forms invade Earth! Most of humanity is wiped off the face of the planet. John, his sister, and the remaining survivors hope to find a new world to inhabit… But one day, they’re targeted by aliens again!',
        550.00,
        '/src/assets/my_assets/homepage/main/manga_display/6.jpg', 76),
    new Product('10',
        'Tis Time For "Torture," Princess',
        'ROBINSON HARUHARA / HIRAKEI',
        "In an ongoing battle between the humanity's Imperial Army and the demonic Hell-hordes, the princess from the army has been captured along with her holy sword Ex. Since regular torture is prohibited by the prisoner of war treaty between the two parties, the grand inquisitor, Torture Tortura, employs unusual 'torture' (in air quotes) techniques, usually in the form of tempting foods and snacks from Japanese culture.",
        970.00,
        '/src/assets/my_assets/homepage/main/manga_display/10.jpg', 264),
    new Product('36',
        'GHOST FIXERS',
        'YASUKI TANAKA',
        'Following a certain event, Mikurigaoka New Town transformed into a crucible of supernatural phenomena known as GHOSTS! In said town lives Hifumi, a middle school boy, who one day encounters a girl who just moved in... Help "correct" the supernatural in this action-packed tale from Yasuki Tanaka, creator of "Summer Time Rendering"!',
        1700.00,
        '/src/assets/my_assets/homepage/main/manga_display/36.jpg', 26),

    // Section 4
    new Product('13',
        'Drama Queen',
        'KURAKU ICHIKAWA',
        'Hate brings pain to the world. After saving the earth, aliens have taken up residence with the humans in Japan. Nomamoto, a factory worker with an abusive alien boss, one day meets Kitami, who tells her his own family was killed by aliens. The two quickly forge a friendship, but one day Kitami does the unthinkable.',
        400.00,
        '/src/assets/my_assets/homepage/main/manga_display/13.jpg', 69),
    new Product('14',
        'Centuria',
        'TOHRU KURAMORI',
        'Stowing himself away on a slave ship, Julian sets sail for the great continent with a hundred slaves, all yearning for freedom, until...?! Embark on a groundbreaking journey through this action-packed dark fantasy saga!!',
        800.00,
        '/src/assets/my_assets/homepage/main/manga_display/14.jpg', 58),
    new Product('8',
        'Yattara',
        'OOYAMDA',
        'A gluttonous monster, Yattara, is drawn to a city of splendor and opulence. Its only pleasure in life: eating. It finds its favorite meal, children, and is ready to dig in as usual but then…a flash of inspiration strikes?',
        660.00,
        '/src/assets/my_assets/homepage/main/manga_display/8.jpg', 103),
    new Product('4',
        'The Highschool Bento Blues',
        'KOUICHIROU IWAYA',
        'The Bentonia school, a style of guitar-playing sometimes attributed to blues players from Bentonia, Mississippi, features a shared repertoire of songs, guitar tunings and chord-voicings with a distinctively minor tonality not found in other styles of blues music.',
        690.00,
        '/src/assets/my_assets/homepage/main/manga_display/4.jpg', 401),

    // Section 5
    new Product('11',
        'Jinrui-Shoku: Blight of Man',
        'MISTUCHIYOMARU / YUKI SATO',
        '“You just die one day and turn into a mummy!” Mysterious mummified corpses that people have nicknamed “Mummily-sans” keep being found one after another, causing a lot of fuss. One day, a boy named Seita notices that his friend is acting strangely…?! Don’t miss this thrilling suspense story about an invasion by the unknown!',
        700.00,
        '/src/assets/my_assets/homepage/main/manga_display/11.jpg', 208),
    new Product('24',
        'Girl meets Rock!',
        'KUWAHALI / TETSUO IDEUCHI',
        'New high school student Chihiro Hatono buys her first electric guitar and joins the light music club. There, she and bassist Rin Koyama form the band La Cittadella. Not very good, they quickly break up, as do other club bands. After having heard Hatono sing, Rin sets out scheming to form the perfect band with Hatono on vocals.',
        670.00,
        '/src/assets/my_assets/homepage/main/manga_display/24.jpg', 127),
    new Product('12',
        'Thermae Romae redux',
        'MARI YAMAZAKI',
        'The year is 158 AD, and the Roman Empire thrives under the 20th year of Emperor Antoninus Pius’s reign. Lucius, a Roman bathhouse architect, is now sixty years old and plagued with back pain. His wife Satsuki has mysteriously disappeared, his son, Marius, is beyond comprehension...and to top it off, he still has the Roman bathhouses to worry about!',
        435.00,
        '/src/assets/my_assets/homepage/main/manga_display/12.jpg', 320),
    new Product('29',
        'Oversleeping Takahashi',
        'KOKI AGURO',
        'From the one-shot of the same name that amassed over 1,580,000 views! A classmate who is always nonchalantly late to school, but his true identity is...?! The new serialized story of battles and oversleeping begins!!',
        1500.00,
        '/src/assets/my_assets/homepage/main/manga_display/29.jpg', 106)
];

export default Product;
