const THEMES = {
  all: { label: "Tout étudier", short: "Tout", glyph: "全", color: "#2f5f9f" },
  directions: { label: "Se diriger dans l'espace", short: "Directions", glyph: "向", color: "#0f766e" },
  places: { label: "Vocabulaire des lieux", short: "Lieux", glyph: "地", color: "#b48a28" },
  food: { label: "Nourriture", short: "Cuisine", glyph: "食", color: "#c13f3a" },
  beijing: { label: "Choses à faire à Pékin", short: "Pékin", glyph: "京", color: "#2f5f9f" },
  feelings: { label: "Description des sentiments", short: "Sentiments", glyph: "心", color: "#7a4f9f" }
};

const MODES = [
  { id: "flashcards", label: "Flashcards" },
  { id: "completion", label: "Complétion" },
  { id: "listening", label: "Écoute" },
  { id: "explorer", label: "Explorer" }
];

const SCOPES = [
  { id: "phrases", label: "Phrases" },
  { id: "words", label: "Mots" }
];

const RATINGS = {
  again: { label: "À revoir", short: "3 min", help: "La carte revient presque tout de suite.", tone: "danger" },
  hard: { label: "Difficile", short: "6 h", help: "Tu l'as reconnue, mais elle reste fragile.", tone: "ghost" },
  good: { label: "Acquis", short: "plus tard", help: "La carte est espacée normalement.", tone: "secondary" },
  mastered: { label: "Maîtrisé", short: "long terme", help: "La carte part en révision longue.", tone: "primary" }
};

let phraseSerial = 0;

const DATA = [
  p("directions", "A2", "请问，地铁站怎么走？", "Qǐngwèn, dìtiězhàn zěnme zǒu?", "Excusez-moi, comment aller à la station de métro ?", "地铁站", "dìtiězhàn", "请问 rend la question naturelle et polie."),
  p("directions", "A2", "一直往前走，然后在路口右转。", "Yìzhí wǎng qián zǒu, ránhòu zài lùkǒu yòu zhuǎn.", "Allez tout droit, puis tournez à droite au carrefour.", "路口", "lùkǒu", "往前走 est plus naturel que seulement 走前."),
  p("directions", "A2", "这里离王府井远吗？", "Zhèlǐ lí Wángfǔjǐng yuǎn ma?", "Est-ce loin de Wangfujing d'ici ?", "远", "yuǎn", "离 indique la distance entre deux points."),
  p("directions", "A2", "我想去最近的公交车站。", "Wǒ xiǎng qù zuìjìn de gōngjiāo chēzhàn.", "Je voudrais aller à l'arrêt de bus le plus proche.", "公交车站", "gōngjiāo chēzhàn", "最近的 signifie le plus proche."),
  p("directions", "A2", "过马路以后，银行就在左边。", "Guò mǎlù yǐhòu, yínháng jiù zài zuǒbian.", "Après avoir traversé la rue, la banque est juste à gauche.", "左边", "zuǒbian", "就在 renforce l'idée de localisation précise."),
  p("directions", "A2", "这条路可以到故宫吗？", "Zhè tiáo lù kěyǐ dào Gùgōng ma?", "Cette route permet-elle d'aller à la Cité interdite ?", "故宫", "Gùgōng", "到 marque l'arrivée à un lieu."),
  p("directions", "A2", "从这里走过去大概十分钟。", "Cóng zhèlǐ zǒu guòqù dàgài shí fēnzhōng.", "À pied depuis ici, il faut environ dix minutes.", "十分钟", "shí fēnzhōng", "大概 donne une estimation souple."),
  p("directions", "A2", "你可以跟着地图走。", "Nǐ kěyǐ gēnzhe dìtú zǒu.", "Tu peux suivre la carte.", "地图", "dìtú", "跟着 signifie suivre quelque chose ou quelqu'un."),
  p("directions", "A2", "先上楼，再往右拐。", "Xiān shàng lóu, zài wǎng yòu guǎi.", "Montez d'abord, puis tournez à droite.", "上楼", "shàng lóu", "先...再... structure les étapes."),
  p("directions", "A2", "出门以后向左看。", "Chū mén yǐhòu xiàng zuǒ kàn.", "Après être sorti, regardez vers la gauche.", "向左", "xiàng zuǒ", "向 indique la direction du regard ou du mouvement."),
  p("directions", "B1", "这个入口不在这里，在后面。", "Zhège rùkǒu bú zài zhèlǐ, zài hòumian.", "Cette entrée n'est pas ici, elle est derrière.", "入口", "rùkǒu", "入口 est l'entrée, 出口 la sortie."),
  p("directions", "A2", "我迷路了，可以帮我一下吗？", "Wǒ mílù le, kěyǐ bāng wǒ yíxià ma?", "Je me suis perdu, pouvez-vous m'aider un instant ?", "迷路", "mílù", "一下 adoucit la demande."),
  p("directions", "A2", "到十字路口的时候左转。", "Dào shízì lùkǒu de shíhou zuǒ zhuǎn.", "Quand vous arrivez au croisement, tournez à gauche.", "左转", "zuǒ zhuǎn", "十字路口 est un croisement en forme de dix."),
  p("directions", "B1", "这边人很多，我们走小路吧。", "Zhèbiān rén hěn duō, wǒmen zǒu xiǎolù ba.", "Il y a beaucoup de monde par ici, prenons une petite rue.", "小路", "xiǎolù", "吧 propose une solution de manière légère."),
  p("directions", "A2", "司机师傅，请在前面停车。", "Sījī shīfu, qǐng zài qiánmiàn tíngchē.", "Chauffeur, arrêtez-vous devant s'il vous plaît.", "停车", "tíngchē", "师傅 est courant pour s'adresser à un chauffeur."),
  p("directions", "B1", "我们坐几号线比较方便？", "Wǒmen zuò jǐ hào xiàn bǐjiào fāngbiàn?", "Quelle ligne est la plus pratique pour nous ?", "几号线", "jǐ hào xiàn", "比较方便 signifie relativement plus pratique."),

  p("places", "A2", "附近有图书馆吗？", "Fùjìn yǒu túshūguǎn ma?", "Y a-t-il une bibliothèque près d'ici ?", "图书馆", "túshūguǎn", "附近 est très utile pour demander les lieux proches."),
  p("places", "A2", "我在超市门口等你。", "Wǒ zài chāoshì ménkǒu děng nǐ.", "Je t'attends à l'entrée du supermarché.", "超市", "chāoshì", "门口 désigne l'entrée ou le devant d'un lieu."),
  p("places", "A2", "药店晚上几点关门？", "Yàodiàn wǎnshang jǐ diǎn guānmén?", "À quelle heure la pharmacie ferme-t-elle le soir ?", "药店", "yàodiàn", "几点 sert à demander l'heure."),
  p("places", "A2", "医院离这里不太远。", "Yīyuàn lí zhèlǐ bú tài yuǎn.", "L'hôpital n'est pas très loin d'ici.", "医院", "yīyuàn", "不太 rend l'affirmation plus nuancée."),
  p("places", "B1", "派出所在这条街的尽头。", "Pàichūsuǒ zài zhè tiáo jiē de jìntóu.", "Le poste de police est au bout de cette rue.", "派出所", "pàichūsuǒ", "尽头 signifie le bout d'une rue ou d'un couloir."),
  p("places", "A2", "洗手间在二楼右边。", "Xǐshǒujiān zài èr lóu yòubiān.", "Les toilettes sont à droite au deuxième étage.", "洗手间", "xǐshǒujiān", "二楼 correspond au premier étage selon l'usage français."),
  p("places", "A2", "商场里面有很多餐厅。", "Shāngchǎng lǐmian yǒu hěn duō cāntīng.", "Il y a beaucoup de restaurants dans le centre commercial.", "商场", "shāngchǎng", "里面 précise l'intérieur d'un lieu."),
  p("places", "A2", "这个公园早上很安静。", "Zhège gōngyuán zǎoshang hěn ānjìng.", "Ce parc est très calme le matin.", "公园", "gōngyuán", "安静 décrit une ambiance calme."),
  p("places", "A2", "火车站的人总是很多。", "Huǒchēzhàn de rén zǒngshì hěn duō.", "Il y a toujours beaucoup de monde à la gare.", "火车站", "huǒchēzhàn", "总是 signifie toujours ou tout le temps."),
  p("places", "B1", "机场快线很方便。", "Jīchǎng kuàixiàn hěn fāngbiàn.", "L'express de l'aéroport est très pratique.", "机场快线", "jīchǎng kuàixiàn", "快线 désigne une ligne rapide."),
  p("places", "A2", "我想参观这个博物馆。", "Wǒ xiǎng cānguān zhège bówùguǎn.", "Je voudrais visiter ce musée.", "博物馆", "bówùguǎn", "参观 s'emploie pour visiter un site, musée ou lieu culturel."),
  p("places", "B1", "这家餐厅需要提前订位。", "Zhè jiā cāntīng xūyào tíqián dìngwèi.", "Ce restaurant nécessite une réservation à l'avance.", "订位", "dìngwèi", "提前 signifie à l'avance."),
  p("places", "A2", "咖啡馆适合学习。", "Kāfēiguǎn shìhé xuéxí.", "Le café convient bien pour étudier.", "咖啡馆", "kāfēiguǎn", "适合 indique que quelque chose convient à un usage."),
  p("places", "B1", "酒店前台可以帮我们叫车。", "Jiǔdiàn qiántái kěyǐ bāng wǒmen jiào chē.", "La réception de l'hôtel peut nous appeler une voiture.", "前台", "qiántái", "叫车 signifie commander ou appeler une voiture."),
  p("places", "A2", "我朋友住在这个小区。", "Wǒ péngyou zhù zài zhège xiǎoqū.", "Mon ami habite dans cette résidence.", "小区", "xiǎoqū", "小区 est très courant pour parler d'un quartier résidentiel."),
  p("places", "B1", "北京的胡同很有意思。", "Běijīng de hútòng hěn yǒu yìsi.", "Les hutongs de Pékin sont très intéressants.", "胡同", "hútòng", "胡同 est un mot important dans le contexte de Pékin."),

  p("food", "A2", "我不吃辣，可以少放一点辣椒吗？", "Wǒ bù chī là, kěyǐ shǎo fàng yìdiǎn làjiāo ma?", "Je ne mange pas épicé, pouvez-vous mettre un peu moins de piment ?", "辣", "là", "少放一点 est une demande naturelle au restaurant."),
  p("food", "A2", "这个菜有什么推荐？", "Zhège cài yǒu shénme tuījiàn?", "Qu'est-ce que vous recommandez comme plat ?", "推荐", "tuījiàn", "推荐 sert autant pour demander que pour conseiller."),
  p("food", "A2", "我想点一碗牛肉面。", "Wǒ xiǎng diǎn yì wǎn niúròu miàn.", "Je voudrais commander un bol de nouilles au boeuf.", "牛肉面", "niúròu miàn", "碗 est le classificateur pour un bol."),
  p("food", "A2", "请给我一杯热水。", "Qǐng gěi wǒ yì bēi rè shuǐ.", "Donnez-moi un verre d'eau chaude s'il vous plaît.", "热水", "rè shuǐ", "热水 est une demande fréquente en Chine."),
  p("food", "A2", "这个包子是猪肉馅的吗？", "Zhège bāozi shì zhūròu xiàn de ma?", "Ce baozi est-il farci au porc ?", "猪肉馅", "zhūròu xiàn", "馅 désigne la farce."),
  p("food", "A2", "我们要不要一起吃火锅？", "Wǒmen yào bu yào yìqǐ chī huǒguō?", "Et si on mangeait une fondue chinoise ensemble ?", "火锅", "huǒguō", "要不要 sert à proposer une action."),
  p("food", "A2", "这家店的烤鸭很有名。", "Zhè jiā diàn de kǎoyā hěn yǒumíng.", "Le canard laqué de ce restaurant est très connu.", "烤鸭", "kǎoyā", "有名 signifie connu ou réputé."),
  p("food", "A2", "米饭可以再来一份吗？", "Mǐfàn kěyǐ zài lái yí fèn ma?", "Peut-on avoir encore une portion de riz ?", "米饭", "mǐfàn", "再来一份 est pratique pour redemander une portion."),
  p("food", "B1", "我对花生过敏。", "Wǒ duì huāshēng guòmǐn.", "Je suis allergique aux cacahuètes.", "过敏", "guòmǐn", "对...过敏 exprime une allergie à quelque chose."),
  p("food", "A2", "这个汤有点咸。", "Zhège tāng yǒudiǎn xián.", "Cette soupe est un peu salée.", "咸", "xián", "有点 est souvent utilisé pour une nuance négative."),
  p("food", "A2", "你喜欢喝豆浆还是茶？", "Nǐ xǐhuan hē dòujiāng háishi chá?", "Tu préfères boire du lait de soja ou du thé ?", "豆浆", "dòujiāng", "还是 introduit un choix dans une question."),
  p("food", "A2", "早餐我常吃鸡蛋和油条。", "Zǎocān wǒ cháng chī jīdàn hé yóutiáo.", "Au petit-déjeuner, je mange souvent des oeufs et des youtiao.", "油条", "yóutiáo", "常 indique une habitude."),
  p("food", "A2", "请把菜单给我看一下。", "Qǐng bǎ càidān gěi wǒ kàn yíxià.", "Montrez-moi le menu s'il vous plaît.", "菜单", "càidān", "把 met l'objet avant le verbe d'action."),
  p("food", "B1", "这道菜味道很清淡。", "Zhè dào cài wèidao hěn qīngdàn.", "Ce plat a un goût très léger.", "清淡", "qīngdàn", "清淡 décrit une cuisine peu grasse ou peu forte."),
  p("food", "A2", "我想打包带走。", "Wǒ xiǎng dǎbāo dàizǒu.", "Je voudrais l'emballer pour l'emporter.", "打包", "dǎbāo", "打包带走 est indispensable pour les restes ou la vente à emporter."),
  p("food", "A2", "可以用手机支付吗？", "Kěyǐ yòng shǒujī zhīfù ma?", "Peut-on payer avec le téléphone ?", "手机支付", "shǒujī zhīfù", "手机支付 couvre les paiements mobiles."),

  p("beijing", "A2", "今天我们去故宫参观吧。", "Jīntiān wǒmen qù Gùgōng cānguān ba.", "Aujourd'hui, allons visiter la Cité interdite.", "故宫", "Gùgōng", "吧 rend la proposition plus naturelle."),
  p("beijing", "A2", "下午可以去天坛散步。", "Xiàwǔ kěyǐ qù Tiāntán sànbù.", "L'après-midi, on peut aller se promener au Temple du Ciel.", "天坛", "Tiāntán", "散步 signifie se promener."),
  p("beijing", "A2", "我想在颐和园坐船。", "Wǒ xiǎng zài Yíhéyuán zuò chuán.", "Je voudrais faire du bateau au Palais d'Été.", "颐和园", "Yíhéyuán", "在 indique le lieu où se déroule l'action."),
  p("beijing", "B1", "晚上去什刹海听音乐怎么样？", "Wǎnshang qù Shíchàhǎi tīng yīnyuè zěnmeyàng?", "Et si on allait écouter de la musique à Shichahai le soir ?", "什刹海", "Shíchàhǎi", "怎么样 sert à proposer ou demander un avis."),
  p("beijing", "A2", "我们可以爬长城，但是要早点出发。", "Wǒmen kěyǐ pá Chángchéng, dànshì yào zǎodiǎn chūfā.", "On peut monter à la Grande Muraille, mais il faut partir tôt.", "长城", "Chángchéng", "早点 signifie un peu plus tôt."),
  p("beijing", "B1", "在王府井可以逛街和吃小吃。", "Zài Wángfǔjǐng kěyǐ guàngjiē hé chī xiǎochī.", "À Wangfujing, on peut faire du shopping et manger des snacks.", "王府井", "Wángfǔjǐng", "逛街 est flâner en ville ou faire les magasins."),
  p("beijing", "B1", "我想去七九八看展览。", "Wǒ xiǎng qù Qījiǔbā kàn zhǎnlǎn.", "Je veux aller au 798 voir une exposition.", "七九八", "Qījiǔbā", "七九八 désigne le 798 Art District."),
  p("beijing", "A2", "北海公园适合慢慢走。", "Běihǎi Gōngyuán shìhé mànman zǒu.", "Le parc Beihai est parfait pour marcher tranquillement.", "北海公园", "Běihǎi Gōngyuán", "慢慢 indique un rythme lent et détendu."),
  p("beijing", "B1", "天气好的时候，可以去景山看城市。", "Tiānqì hǎo de shíhou, kěyǐ qù Jǐngshān kàn chéngshì.", "Quand il fait beau, on peut aller à Jingshan voir la ville.", "景山", "Jǐngshān", "的时候 permet de dire quand une condition se produit."),
  p("beijing", "A2", "胡同骑车很有意思。", "Hútòng qí chē hěn yǒu yìsi.", "Faire du vélo dans les hutongs est très intéressant.", "胡同", "hútòng", "骑车 signifie faire du vélo ou conduire un deux-roues."),
  p("beijing", "B1", "我们在南锣鼓巷买点纪念品吧。", "Wǒmen zài Nánluógǔxiàng mǎi diǎn jìniànpǐn ba.", "Achetons quelques souvenirs à Nanluoguxiang.", "南锣鼓巷", "Nánluógǔxiàng", "买点 rend la quantité modeste et naturelle."),
  p("beijing", "A2", "周末可以去国家博物馆。", "Zhōumò kěyǐ qù Guójiā Bówùguǎn.", "Le week-end, on peut aller au Musée national.", "国家博物馆", "Guójiā Bówùguǎn", "国家 signifie national."),
  p("beijing", "A2", "坐地铁去鸟巢很方便。", "Zuò dìtiě qù Niǎocháo hěn fāngbiàn.", "Aller au Nid d'oiseau en métro est pratique.", "鸟巢", "Niǎocháo", "坐地铁 est la structure naturelle pour prendre le métro."),
  p("beijing", "B1", "我想在前门附近喝茶。", "Wǒ xiǎng zài Qiánmén fùjìn hē chá.", "Je voudrais boire du thé près de Qianmen.", "前门", "Qiánmén", "附近 se place après le lieu."),
  p("beijing", "B1", "下雪的时候，北京特别漂亮。", "Xià xuě de shíhou, Běijīng tèbié piàoliang.", "Quand il neige, Pékin est particulièrement belle.", "下雪", "xià xuě", "特别 renforce l'adjectif."),
  p("beijing", "B1", "我们应该避开早晚高峰。", "Wǒmen yīnggāi bìkāi zǎowǎn gāofēng.", "Nous devrions éviter les heures de pointe du matin et du soir.", "早晚高峰", "zǎowǎn gāofēng", "避开 signifie éviter volontairement."),

  p("feelings", "A2", "我今天有点累。", "Wǒ jīntiān yǒudiǎn lèi.", "Je suis un peu fatigué aujourd'hui.", "累", "lèi", "有点 nuance souvent une sensation moins positive."),
  p("feelings", "A2", "我很高兴认识你。", "Wǒ hěn gāoxìng rènshi nǐ.", "Je suis ravi de faire ta connaissance.", "高兴", "gāoxìng", "认识你 est naturel lors d'une première rencontre."),
  p("feelings", "A2", "他看起来不太舒服。", "Tā kàn qǐlai bú tài shūfu.", "Il n'a pas l'air très bien.", "不舒服", "bù shūfu", "看起来 signifie avoir l'air."),
  p("feelings", "B1", "我有一点紧张，但是也很期待。", "Wǒ yǒu yìdiǎn jǐnzhāng, dànshì yě hěn qīdài.", "Je suis un peu nerveux, mais aussi impatient.", "紧张", "jǐnzhāng", "期待 est l'attente positive d'un événement."),
  p("feelings", "B1", "这件事让我很放心。", "Zhè jiàn shì ràng wǒ hěn fàngxīn.", "Cette affaire me rassure.", "放心", "fàngxīn", "让 introduit ce qui provoque une émotion."),
  p("feelings", "B1", "我对中文越来越有信心。", "Wǒ duì Zhōngwén yuèláiyuè yǒu xìnxīn.", "J'ai de plus en plus confiance en mon chinois.", "信心", "xìnxīn", "越来越 marque une progression."),
  p("feelings", "B1", "她听到这个消息很惊讶。", "Tā tīngdào zhège xiāoxi hěn jīngyà.", "Elle a été surprise en entendant cette nouvelle.", "惊讶", "jīngyà", "听到 insiste sur le fait d'entendre une information."),
  p("feelings", "B1", "我有时候会想家。", "Wǒ yǒushíhou huì xiǎng jiā.", "Parfois, le mal du pays me prend.", "想家", "xiǎng jiā", "想家 se dit pour le mal du pays ou le manque de chez soi."),
  p("feelings", "A2", "排队太久了，我有点烦。", "Páiduì tài jiǔ le, wǒ yǒudiǎn fán.", "La file d'attente dure trop longtemps, ça m'agace un peu.", "烦", "fán", "太...了 exprime un excès."),
  p("feelings", "B1", "谢谢你，我心里很感动。", "Xièxie nǐ, wǒ xīnlǐ hěn gǎndòng.", "Merci, je suis vraiment touché.", "感动", "gǎndòng", "心里 rend l'émotion plus intérieure."),
  p("feelings", "B1", "我觉得这次旅行很难忘。", "Wǒ juéde zhè cì lǚxíng hěn nánwàng.", "Je trouve ce voyage inoubliable.", "难忘", "nánwàng", "难忘 signifie difficile à oublier."),
  p("feelings", "B1", "他说话太快，我有点着急。", "Tā shuōhuà tài kuài, wǒ yǒudiǎn zháojí.", "Il parle trop vite, je panique un peu.", "着急", "zháojí", "着急 décrit l'inquiétude pressée."),
  p("feelings", "B1", "我最近压力比较大。", "Wǒ zuìjìn yālì bǐjiào dà.", "J'ai pas mal de pression ces derniers temps.", "压力", "yālì", "比较 rend la phrase plus naturelle et moins absolue."),
  p("feelings", "B1", "完成以后，我觉得很有成就感。", "Wánchéng yǐhòu, wǒ juéde hěn yǒu chéngjiùgǎn.", "Après avoir terminé, je ressens un fort sentiment d'accomplissement.", "成就感", "chéngjiùgǎn", "有成就感 est très courant après un effort réussi."),
  p("feelings", "B1", "我不知道为什么有点失落。", "Wǒ bù zhīdào wèishénme yǒudiǎn shīluò.", "Je ne sais pas pourquoi, je me sens un peu déçu ou vide.", "失落", "shīluò", "失落 est plus subtil que triste."),
  p("feelings", "A2", "跟朋友聊天让我放松。", "Gēn péngyou liáotiān ràng wǒ fàngsōng.", "Discuter avec des amis me détend.", "放松", "fàngsōng", "跟 introduit la personne avec qui l'on fait une action.")
];

Object.assign(THEMES, {
  colors: { label: "Couleurs et adjectifs courants", short: "Couleurs", glyph: "色", color: "#536b2f" }
});

DATA.push(
  p("directions", "A2", "请问，出口在哪里？", "Qǐngwèn, chūkǒu zài nǎlǐ?", "Excusez-moi, où est la sortie ?", "出口", "chūkǒu", "出口 est la sortie, très utile dans le métro ou un bâtiment."),
  p("directions", "A2", "往南走两百米就到了。", "Wǎng nán zǒu liǎng bǎi mǐ jiù dào le.", "Marchez deux cents mètres vers le sud et vous y êtes.", "往南", "wǎng nán", "往 + direction indique vers où aller."),
  p("directions", "A2", "这个地方在地铁站旁边。", "Zhège dìfang zài dìtiězhàn pángbiān.", "Cet endroit est à côté de la station de métro.", "旁边", "pángbiān", "旁边 signifie à côté, très courant pour situer un lieu."),
  p("directions", "B1", "你走错方向了。", "Nǐ zǒu cuò fāngxiàng le.", "Tu es parti dans la mauvaise direction.", "方向", "fāngxiàng", "走错 signifie se tromper en marchant ou en choisissant."),
  p("directions", "A2", "从A口出来比较近。", "Cóng A kǒu chūlái bǐjiào jìn.", "C'est plus proche si vous sortez par la sortie A.", "出来", "chūlái", "从...出来 indique sortir depuis un point précis."),
  p("directions", "A2", "这条街不能停车。", "Zhè tiáo jiē bù néng tíngchē.", "On ne peut pas se garer dans cette rue.", "不能", "bù néng", "不能 exprime une impossibilité ou une interdiction."),
  p("directions", "A2", "走到红绿灯再右转。", "Zǒu dào hónglǜdēng zài yòu zhuǎn.", "Allez jusqu'au feu, puis tournez à droite.", "红绿灯", "hónglǜdēng", "红绿灯 désigne le feu de circulation."),
  p("directions", "B1", "我们应该换乘二号线。", "Wǒmen yīnggāi huànchéng èr hào xiàn.", "Nous devrions prendre une correspondance vers la ligne 2.", "换乘", "huànchéng", "换乘 signifie changer de ligne ou faire une correspondance."),
  p("directions", "B1", "这个地址在东城区。", "Zhège dìzhǐ zài Dōngchéng Qū.", "Cette adresse est dans le district de Dongcheng.", "地址", "dìzhǐ", "地址 est indispensable pour taxi, livraison et rendez-vous."),
  p("directions", "A2", "先过桥，然后下楼梯。", "Xiān guò qiáo, ránhòu xià lóutī.", "Traversez d'abord le pont, puis descendez l'escalier.", "楼梯", "lóutī", "楼梯 signifie escalier."),

  p("places", "A2", "社区中心今天开门吗？", "Shèqū zhōngxīn jīntiān kāimén ma?", "Le centre communautaire est-il ouvert aujourd'hui ?", "社区中心", "shèqū zhōngxīn", "社区 désigne une communauté ou un quartier de vie."),
  p("places", "A2", "邮局在银行旁边。", "Yóujú zài yínháng pángbiān.", "La poste est à côté de la banque.", "邮局", "yóujú", "邮局 est la poste."),
  p("places", "A2", "这附近有中国银行吗？", "Zhè fùjìn yǒu Zhōngguó Yínháng ma?", "Y a-t-il une Banque de Chine près d'ici ?", "银行", "yínháng", "银行 signifie banque."),
  p("places", "A2", "学校门口有很多学生。", "Xuéxiào ménkǒu yǒu hěn duō xuésheng.", "Il y a beaucoup d'élèves devant l'école.", "学校", "xuéxiào", "学校 désigne l'école au sens large."),
  p("places", "B1", "大使馆需要提前预约。", "Dàshǐguǎn xūyào tíqián yùyuē.", "L'ambassade nécessite une réservation à l'avance.", "大使馆", "dàshǐguǎn", "大使馆 signifie ambassade."),
  p("places", "A2", "电影院晚上人很多。", "Diànyǐngyuàn wǎnshang rén hěn duō.", "Il y a beaucoup de monde au cinéma le soir.", "电影院", "diànyǐngyuàn", "电影院 est le cinéma."),
  p("places", "A2", "市场里的水果很新鲜。", "Shìchǎng lǐ de shuǐguǒ hěn xīnxiān.", "Les fruits du marché sont très frais.", "市场", "shìchǎng", "市场 désigne un marché."),
  p("places", "A2", "我想去书店买一本地图。", "Wǒ xiǎng qù shūdiàn mǎi yì běn dìtú.", "Je veux aller à la librairie acheter une carte.", "书店", "shūdiàn", "书店 signifie librairie."),
  p("places", "B1", "他的公寓离公司很近。", "Tā de gōngyù lí gōngsī hěn jìn.", "Son appartement est très proche de l'entreprise.", "公寓", "gōngyù", "公寓 correspond à appartement."),
  p("places", "A2", "地铁口前面有一家便利店。", "Dìtiě kǒu qiánmiàn yǒu yì jiā biànlìdiàn.", "Il y a une supérette devant la bouche de métro.", "便利店", "biànlìdiàn", "便利店 est une supérette ouverte tard."),

  p("food", "A2", "这里有素食吗？", "Zhèlǐ yǒu sùshí ma?", "Y a-t-il des plats végétariens ici ?", "素食", "sùshí", "素食 signifie nourriture végétarienne."),
  p("food", "A2", "我想买一瓶牛奶。", "Wǒ xiǎng mǎi yì píng niúnǎi.", "Je voudrais acheter une bouteille de lait.", "牛奶", "niúnǎi", "瓶 est le classificateur pour bouteille."),
  p("food", "A2", "饮料要冰的还是常温的？", "Yǐnliào yào bīng de háishi chángwēn de?", "La boisson, vous la voulez froide ou à température ambiante ?", "冰的", "bīng de", "冰的 signifie froid ou glacé pour une boisson."),
  p("food", "A2", "我想吃一点甜品。", "Wǒ xiǎng chī yìdiǎn tiánpǐn.", "J'aimerais manger un peu de dessert.", "甜品", "tiánpǐn", "甜品 désigne les desserts."),
  p("food", "A2", "可以给我一双筷子吗？", "Kěyǐ gěi wǒ yì shuāng kuàizi ma?", "Pouvez-vous me donner une paire de baguettes ?", "筷子", "kuàizi", "双 est le classificateur pour les objets par paire."),
  p("food", "B1", "结账的时候可以开发票吗？", "Jiézhàng de shíhou kěyǐ kāi fāpiào ma?", "Au moment de payer, pouvez-vous faire une facture ?", "发票", "fāpiào", "发票 est la facture officielle."),
  p("food", "A2", "我今天想叫外卖。", "Wǒ jīntiān xiǎng jiào wàimài.", "Aujourd'hui, j'ai envie de commander à manger.", "外卖", "wàimài", "外卖 désigne la livraison de repas."),
  p("food", "A2", "这份炒饭不太油。", "Zhè fèn chǎofàn bú tài yóu.", "Cette portion de riz sauté n'est pas trop grasse.", "炒饭", "chǎofàn", "炒饭 signifie riz sauté."),
  p("food", "A2", "这个菜里面有鸡肉吗？", "Zhège cài lǐmian yǒu jīròu ma?", "Y a-t-il du poulet dans ce plat ?", "鸡肉", "jīròu", "鸡肉 signifie viande de poulet."),
  p("food", "A2", "我吃饱了，谢谢。", "Wǒ chī bǎo le, xièxie.", "J'ai assez mangé, merci.", "饱", "bǎo", "饱 signifie rassasié."),

  p("beijing", "B1", "秋天去香山看红叶很漂亮。", "Qiūtiān qù Xiāngshān kàn hóngyè hěn piàoliang.", "En automne, aller voir les feuilles rouges à Xiangshan est magnifique.", "香山", "Xiāngshān", "香山 est connu pour les feuilles rouges en automne."),
  p("beijing", "A2", "雍和宫的建筑很特别。", "Yōnghégōng de jiànzhù hěn tèbié.", "L'architecture du temple de Yonghe est très particulière.", "雍和宫", "Yōnghégōng", "雍和宫 est le temple des Lamas."),
  p("beijing", "B1", "热门景点最好提前预约。", "Rèmén jǐngdiǎn zuì hǎo tíqián yùyuē.", "Pour les sites populaires, mieux vaut réserver à l'avance.", "预约", "yùyuē", "预约 signifie réserver un créneau."),
  p("beijing", "A2", "门票可以在网上买吗？", "Ménpiào kěyǐ zài wǎngshàng mǎi ma?", "Peut-on acheter les billets en ligne ?", "门票", "ménpiào", "门票 est un billet d'entrée."),
  p("beijing", "A2", "天安门广场早上很热闹。", "Tiān'ānmén Guǎngchǎng zǎoshang hěn rènao.", "La place Tian'anmen est très animée le matin.", "天安门广场", "Tiān'ānmén Guǎngchǎng", "广场 signifie place publique."),
  p("beijing", "A2", "来北京一定要尝尝北京烤鸭。", "Lái Běijīng yídìng yào chángchang Běijīng kǎoyā.", "Quand on vient à Pékin, il faut absolument goûter le canard laqué.", "北京烤鸭", "Běijīng kǎoyā", "尝尝 est une forme douce de essayer/goûter."),
  p("beijing", "B1", "奥林匹克公园晚上灯光很好看。", "Àolínpǐkè Gōngyuán wǎnshang dēngguāng hěn hǎokàn.", "Le soir, les lumières du parc olympique sont très belles.", "奥林匹克公园", "Àolínpǐkè Gōngyuán", "灯光 signifie éclairage ou lumières."),
  p("beijing", "B1", "三里屯适合晚上和朋友见面。", "Sānlǐtún shìhé wǎnshang hé péngyou jiànmiàn.", "Sanlitun convient bien pour retrouver des amis le soir.", "三里屯", "Sānlǐtún", "见面 signifie se voir ou se retrouver."),
  p("beijing", "A2", "早市可以买到便宜的水果。", "Zǎoshì kěyǐ mǎi dào piányi de shuǐguǒ.", "Au marché du matin, on peut acheter des fruits bon marché.", "早市", "zǎoshì", "早市 est un marché matinal."),
  p("beijing", "A2", "下雨的时候打车比较方便。", "Xià yǔ de shíhou dǎ chē bǐjiào fāngbiàn.", "Quand il pleut, prendre un taxi est plus pratique.", "打车", "dǎ chē", "打车 signifie prendre ou appeler un taxi."),

  p("feelings", "A2", "听到这个好消息，我很开心。", "Tīngdào zhège hǎo xiāoxi, wǒ hěn kāixīn.", "En entendant cette bonne nouvelle, je suis très content.", "开心", "kāixīn", "开心 est un mot très naturel pour content/heureux."),
  p("feelings", "A2", "第一次一个人旅行，我有点害怕。", "Dì yī cì yí ge rén lǚxíng, wǒ yǒudiǎn hàipà.", "Pour mon premier voyage seul, j'ai un peu peur.", "害怕", "hàipà", "害怕 signifie avoir peur."),
  p("feelings", "A2", "他迟到了，所以我有点生气。", "Tā chídào le, suǒyǐ wǒ yǒudiǎn shēngqì.", "Il est en retard, donc je suis un peu fâché.", "生气", "shēngqì", "生气 signifie être fâché."),
  p("feelings", "B1", "一个人在国外有时候会觉得孤单。", "Yí ge rén zài guówài yǒushíhou huì juéde gūdān.", "À l'étranger, seul, on peut parfois se sentir solitaire.", "孤单", "gūdān", "孤单 décrit la solitude ressentie."),
  p("feelings", "B1", "我对今天的安排很满意。", "Wǒ duì jīntiān de ānpái hěn mǎnyì.", "Je suis très satisfait de l'organisation d'aujourd'hui.", "满意", "mǎnyì", "对...满意 signifie être satisfait de quelque chose."),
  p("feelings", "B1", "我有点后悔没有早点出发。", "Wǒ yǒudiǎn hòuhuǐ méiyǒu zǎodiǎn chūfā.", "Je regrette un peu de ne pas être parti plus tôt.", "后悔", "hòuhuǐ", "后悔 signifie regretter."),
  p("feelings", "A2", "等车的时候我觉得很无聊。", "Děng chē de shíhou wǒ juéde hěn wúliáo.", "Quand j'attends le bus, je m'ennuie beaucoup.", "无聊", "wúliáo", "无聊 signifie ennuyeux ou s'ennuyer."),
  p("feelings", "B1", "明天要去长城，我特别兴奋。", "Míngtiān yào qù Chángchéng, wǒ tèbié xīngfèn.", "Demain je vais à la Grande Muraille, je suis très enthousiaste.", "兴奋", "xīngfèn", "兴奋 exprime l'excitation positive."),
  p("feelings", "B1", "他还没回来，我有点担心。", "Tā hái méi huílái, wǒ yǒudiǎn dānxīn.", "Il n'est pas encore revenu, je m'inquiète un peu.", "担心", "dānxīn", "担心 signifie s'inquiéter."),
  p("feelings", "B1", "喝完茶以后，我的心情很平静。", "Hē wán chá yǐhòu, wǒ de xīnqíng hěn píngjìng.", "Après avoir bu du thé, mon humeur est très calme.", "平静", "píngjìng", "平静 décrit un calme intérieur."),

  p("colors", "A2", "我喜欢红色的门。", "Wǒ xǐhuan hóngsè de mén.", "J'aime les portes rouges.", "红色", "hóngsè", "色 sert souvent à former les noms de couleurs."),
  p("colors", "A2", "这件蓝色外套很好看。", "Zhè jiàn lánsè wàitào hěn hǎokàn.", "Ce manteau bleu est très joli.", "蓝色", "lánsè", "件 est le classificateur pour les vêtements."),
  p("colors", "A2", "公园里的树很绿。", "Gōngyuán lǐ de shù hěn lǜ.", "Les arbres du parc sont très verts.", "绿", "lǜ", "绿 peut être adjectif sans 色."),
  p("colors", "A2", "请给我黄色的票。", "Qǐng gěi wǒ huángsè de piào.", "Donnez-moi le billet jaune s'il vous plaît.", "黄色", "huángsè", "黄色 signifie jaune."),
  p("colors", "A2", "这家店的墙是白色的。", "Zhè jiā diàn de qiáng shì báisè de.", "Les murs de ce magasin sont blancs.", "白色", "báisè", "白色 signifie blanc."),
  p("colors", "A2", "黑色的包比较耐脏。", "Hēisè de bāo bǐjiào nài zāng.", "Les sacs noirs résistent mieux aux salissures.", "黑色", "hēisè", "耐脏 signifie qui ne se salit pas facilement."),
  p("colors", "A2", "这个手机是新的。", "Zhège shǒujī shì xīn de.", "Ce téléphone est neuf.", "新", "xīn", "新 signifie nouveau ou neuf."),
  p("colors", "A2", "这双鞋有点旧。", "Zhè shuāng xié yǒudiǎn jiù.", "Cette paire de chaussures est un peu vieille.", "旧", "jiù", "旧 signifie ancien ou usé."),
  p("colors", "A2", "这家餐厅不贵。", "Zhè jiā cāntīng bú guì.", "Ce restaurant n'est pas cher.", "贵", "guì", "贵 signifie cher."),
  p("colors", "A2", "这个水果很便宜。", "Zhège shuǐguǒ hěn piányi.", "Ce fruit est bon marché.", "便宜", "piányi", "便宜 signifie bon marché."),
  p("colors", "A2", "房间很干净，也很安静。", "Fángjiān hěn gānjìng, yě hěn ānjìng.", "La chambre est propre et calme.", "干净", "gānjìng", "干净 signifie propre."),
  p("colors", "A2", "这条路有点脏。", "Zhè tiáo lù yǒudiǎn zāng.", "Cette route est un peu sale.", "脏", "zāng", "脏 signifie sale."),
  p("colors", "A2", "今天北京很冷。", "Jīntiān Běijīng hěn lěng.", "Aujourd'hui, il fait froid à Pékin.", "冷", "lěng", "冷 décrit le froid."),
  p("colors", "A2", "这个房间很暖和。", "Zhège fángjiān hěn nuǎnhuo.", "Cette pièce est bien chaude.", "暖和", "nuǎnhuo", "暖和 décrit une chaleur agréable."),
  p("colors", "A2", "这条路比较短。", "Zhè tiáo lù bǐjiào duǎn.", "Cette route est plutôt courte.", "短", "duǎn", "短 signifie court."),
  p("colors", "B1", "这个包很轻，适合旅行。", "Zhège bāo hěn qīng, shìhé lǚxíng.", "Ce sac est léger, il convient pour voyager.", "轻", "qīng", "轻 signifie léger.")
);

const VOCAB_GLOSSES = {
  "地铁站": "station de métro",
  "路口": "carrefour",
  "远": "loin",
  "公交车站": "arrêt de bus",
  "左边": "côté gauche",
  "故宫": "Cité interdite",
  "十分钟": "dix minutes",
  "地图": "carte",
  "上楼": "monter à l'étage",
  "向左": "vers la gauche",
  "入口": "entrée",
  "迷路": "se perdre",
  "左转": "tourner à gauche",
  "小路": "petite route",
  "停车": "s'arrêter / stationner",
  "几号线": "quelle ligne",
  "出口": "sortie",
  "往南": "vers le sud",
  "旁边": "à côté",
  "方向": "direction",
  "出来": "sortir",
  "不能": "ne pas pouvoir",
  "红绿灯": "feu de circulation",
  "换乘": "changer de ligne",
  "地址": "adresse",
  "楼梯": "escalier",
  "图书馆": "bibliothèque",
  "超市": "supermarché",
  "药店": "pharmacie",
  "医院": "hôpital",
  "派出所": "poste de police",
  "洗手间": "toilettes",
  "商场": "centre commercial",
  "公园": "parc",
  "火车站": "gare ferroviaire",
  "机场快线": "express de l'aéroport",
  "博物馆": "musée",
  "订位": "réserver une place",
  "咖啡馆": "café",
  "前台": "réception",
  "小区": "résidence / quartier résidentiel",
  "胡同": "hutong",
  "社区中心": "centre communautaire",
  "邮局": "poste",
  "银行": "banque",
  "学校": "école",
  "大使馆": "ambassade",
  "电影院": "cinéma",
  "市场": "marché",
  "书店": "librairie",
  "公寓": "appartement",
  "便利店": "supérette",
  "辣": "épicé",
  "推荐": "recommander",
  "牛肉面": "nouilles au boeuf",
  "热水": "eau chaude",
  "猪肉馅": "farce au porc",
  "火锅": "fondue chinoise",
  "烤鸭": "canard laqué",
  "米饭": "riz cuit",
  "过敏": "être allergique",
  "咸": "salé",
  "豆浆": "lait de soja",
  "油条": "youtiao",
  "菜单": "menu",
  "清淡": "léger, peu fort",
  "打包": "emballer à emporter",
  "手机支付": "paiement mobile",
  "素食": "nourriture végétarienne",
  "牛奶": "lait",
  "冰的": "froid / glacé",
  "甜品": "dessert",
  "筷子": "baguettes",
  "发票": "facture officielle",
  "外卖": "livraison de repas",
  "炒饭": "riz sauté",
  "鸡肉": "poulet",
  "饱": "rassasié",
  "天坛": "Temple du Ciel",
  "颐和园": "Palais d'Été",
  "什刹海": "Shichahai",
  "长城": "Grande Muraille",
  "王府井": "Wangfujing",
  "七九八": "798 Art District",
  "北海公园": "parc Beihai",
  "景山": "Jingshan",
  "南锣鼓巷": "Nanluoguxiang",
  "国家博物馆": "Musée national",
  "鸟巢": "Nid d'oiseau",
  "前门": "Qianmen",
  "下雪": "neiger",
  "早晚高峰": "heures de pointe",
  "香山": "Xiangshan",
  "雍和宫": "temple de Yonghe",
  "预约": "réserver",
  "门票": "billet d'entrée",
  "天安门广场": "place Tian'anmen",
  "北京烤鸭": "canard laqué de Pékin",
  "奥林匹克公园": "parc olympique",
  "三里屯": "Sanlitun",
  "早市": "marché du matin",
  "打车": "prendre un taxi",
  "累": "fatigué",
  "高兴": "content / ravi",
  "不舒服": "ne pas se sentir bien",
  "紧张": "nerveux",
  "放心": "rassuré",
  "信心": "confiance",
  "惊讶": "surpris",
  "想家": "avoir le mal du pays",
  "烦": "agacé",
  "感动": "touché",
  "难忘": "inoubliable",
  "着急": "inquiet, pressé",
  "压力": "pression",
  "成就感": "sentiment d'accomplissement",
  "失落": "déçu, vide",
  "放松": "se détendre",
  "开心": "content",
  "害怕": "avoir peur",
  "生气": "être fâché",
  "孤单": "solitaire",
  "满意": "satisfait",
  "后悔": "regretter",
  "无聊": "s'ennuyer",
  "兴奋": "enthousiaste",
  "担心": "s'inquiéter",
  "平静": "calme",
  "红色": "rouge",
  "蓝色": "bleu",
  "绿": "vert",
  "黄色": "jaune",
  "白色": "blanc",
  "黑色": "noir",
  "新": "nouveau / neuf",
  "旧": "ancien / usé",
  "贵": "cher",
  "便宜": "bon marché",
  "干净": "propre",
  "脏": "sale",
  "冷": "froid",
  "暖和": "chaud, agréable",
  "短": "court",
  "轻": "léger"
};

const CHAR_INFO = {
  "我": "wǒ · je, moi", "你": "nǐ · tu, toi", "他": "tā · il", "她": "tā · elle", "们": "men · pluriel", "这": "zhè · ce, ceci", "那": "nà · cela", "个": "gè · classificateur", "一": "yī · un", "二": "èr · deux", "三": "sān · trois", "七": "qī · sept", "九": "jiǔ · neuf", "十": "shí · dix", "百": "bǎi · cent",
  "请": "qǐng · s'il vous plaît", "问": "wèn · demander", "哪": "nǎ · lequel, où", "里": "lǐ · intérieur", "怎": "zěn · comment", "么": "me · suffixe interrogatif", "吗": "ma · particule de question", "吧": "ba · proposition douce", "了": "le · changement ou accompli", "的": "de · particule de liaison", "得": "de/dé · obtenir, complément", "地": "dì/de · terre, lieu", "方": "fāng · direction, carré", "向": "xiàng · direction",
  "走": "zǒu · marcher", "去": "qù · aller", "来": "lái · venir", "到": "dào · arriver", "从": "cóng · depuis", "往": "wǎng · vers", "在": "zài · être à", "离": "lí · être à distance de", "过": "guò · traverser, passer", "出": "chū · sortir", "入": "rù · entrer", "上": "shàng · monter, dessus", "下": "xià · descendre, dessous", "转": "zhuǎn · tourner", "拐": "guǎi · tourner", "换": "huàn · changer", "乘": "chéng · prendre un transport", "停": "tíng · arrêter", "坐": "zuò · s'asseoir, prendre",
  "前": "qián · devant, avant", "后": "hòu · après, derrière", "左": "zuǒ · gauche", "右": "yòu · droite", "边": "biān · côté", "旁": "páng · à côté", "南": "nán · sud", "北": "běi · nord", "东": "dōng · est", "西": "xī · ouest", "中": "zhōng · centre", "口": "kǒu · bouche, entrée", "门": "mén · porte", "楼": "lóu · étage, bâtiment", "梯": "tī · échelle, escalier", "桥": "qiáo · pont", "街": "jiē · rue", "路": "lù · route", "站": "zhàn · station", "线": "xiàn · ligne", "灯": "dēng · lampe, feu",
  "人": "rén · personne", "车": "chē · véhicule", "铁": "tiě · fer", "公": "gōng · public", "交": "jiāo · croiser, transport", "图": "tú · dessin, carte", "书": "shū · livre", "馆": "guǎn · établissement", "店": "diàn · boutique", "院": "yuàn · établissement", "园": "yuán · jardin, parc", "场": "chǎng · lieu, terrain", "市": "shì · marché, ville", "区": "qū · district", "宫": "gōng · palais", "城": "chéng · ville, muraille", "京": "jīng · capitale", "国": "guó · pays", "家": "jiā · famille, maison", "海": "hǎi · mer", "山": "shān · montagne", "湖": "hú · lac",
  "吃": "chī · manger", "喝": "hē · boire", "菜": "cài · plat, légume", "饭": "fàn · repas, riz cuit", "米": "mǐ · riz", "面": "miàn · nouilles, face", "肉": "ròu · viande", "牛": "niú · boeuf", "猪": "zhū · porc", "鸡": "jī · poulet", "蛋": "dàn · oeuf", "水": "shuǐ · eau", "茶": "chá · thé", "奶": "nǎi · lait", "豆": "dòu · haricot", "汤": "tāng · soupe", "辣": "là · épicé", "咸": "xián · salé", "甜": "tián · sucré", "饱": "bǎo · rassasié", "锅": "guō · marmite", "筷": "kuài · baguette", "子": "zi · suffixe nominal",
  "红": "hóng · rouge", "蓝": "lán · bleu", "绿": "lǜ · vert", "黄": "huáng · jaune", "白": "bái · blanc", "黑": "hēi · noir", "色": "sè · couleur", "新": "xīn · nouveau", "旧": "jiù · ancien", "贵": "guì · cher", "便": "biàn · pratique", "宜": "yí · approprié, bon marché", "干": "gān · sec", "净": "jìng · propre", "脏": "zāng · sale", "冷": "lěng · froid", "暖": "nuǎn · chaud", "和": "hé/huo · et, doux", "短": "duǎn · court", "轻": "qīng · léger", "重": "zhòng · lourd", "大": "dà · grand", "小": "xiǎo · petit", "多": "duō · beaucoup", "少": "shǎo · peu", "好": "hǎo · bon", "坏": "huài · mauvais", "快": "kuài · rapide", "慢": "màn · lent",
  "高": "gāo · haut, content", "兴": "xìng/xīng · joie, enthousiasme", "开": "kāi · ouvrir", "心": "xīn · coeur", "累": "lèi · fatigué", "怕": "pà · peur", "害": "hài · nuire, peur", "生": "shēng · naître, produire", "气": "qì · air, colère", "孤": "gū · seul", "单": "dān · unique", "满": "mǎn · plein", "意": "yì · idée, intention", "后": "hòu · après", "悔": "huǐ · regretter", "无": "wú · sans", "聊": "liáo · discuter", "奋": "fèn · s'élever, s'exciter", "担": "dān · porter, se charger", "平": "píng · plat, calme", "静": "jìng · calme", "放": "fàng · relâcher", "松": "sōng · détendu", "烦": "fán · agacé", "感": "gǎn · ressentir", "动": "dòng · bouger, émouvoir",
  "学": "xué · étudier", "习": "xí · pratiquer", "看": "kàn · regarder", "听": "tīng · écouter", "说": "shuō · parler", "认": "rèn · reconnaître", "识": "shi · connaître", "买": "mǎi · acheter", "卖": "mài · vendre", "用": "yòng · utiliser", "给": "gěi · donner", "要": "yào · vouloir, devoir", "想": "xiǎng · vouloir, penser", "可": "kě · pouvoir", "能": "néng · pouvoir", "会": "huì · savoir, pouvoir", "应": "yīng · devoir", "该": "gāi · devrait", "需": "xū · avoir besoin", "订": "dìng · réserver", "约": "yuē · rendez-vous", "票": "piào · billet", "钱": "qián · argent", "付": "fù · payer", "支": "zhī · payer, soutenir"
};

const VOCAB_DATA = buildVocabData();

const STORE_KEY = "mandarin_phrase_lab_progress_v1";
const state = {
  scope: "phrases",
  theme: "all",
  mode: "flashcards",
  currentId: DATA[0].id,
  revealed: false,
  search: "",
  feedback: null,
  history: [],
  reviewModal: null,
  charLocked: false
};

let progress = loadProgress();
let lastSpokenText = "";

const els = {
  themeNav: document.querySelector("#themeNav"),
  scopeSwitch: document.querySelector("#scopeSwitch"),
  modeSwitch: document.querySelector("#modeSwitch"),
  statsGrid: document.querySelector("#statsGrid"),
  practiceArea: document.querySelector("#practiceArea"),
  phraseList: document.querySelector("#phraseList"),
  searchInput: document.querySelector("#searchInput"),
  listTitle: document.querySelector("#listTitle"),
  ttsPlayer: document.querySelector("#ttsPlayer"),
  shuffleButton: document.querySelector("#shuffleButton"),
  testVoiceButton: document.querySelector("#testVoiceButton"),
  modalRoot: document.querySelector("#modalRoot"),
  charPopover: document.querySelector("#charPopover")
};

function p(theme, level, hanzi, pinyin, fr, answer, answerReading, note) {
  return {
    id: `${theme}-${String(phraseSerial++).padStart(2, "0")}`,
    kind: "phrase",
    theme,
    level,
    hanzi,
    pinyin,
    fr,
    answer,
    answerReading,
    note
  };
}

function buildVocabData() {
  const seen = new Set();
  const words = [];
  for (const item of DATA) {
    const key = `${item.theme}|${item.answer}`;
    if (seen.has(key)) continue;
    seen.add(key);
    words.push({
      id: `word-${String(words.length).padStart(3, "0")}`,
      kind: "word",
      theme: item.theme,
      level: item.level,
      hanzi: item.answer,
      pinyin: item.answerReading,
      fr: VOCAB_GLOSSES[item.answer] || `Mot-clé : ${item.fr}`,
      answer: item.answer,
      answerReading: item.answerReading,
      note: `Phrase source : ${item.hanzi} — ${item.fr}`,
      sourceId: item.id,
      sourceHanzi: item.hanzi,
      sourcePinyin: item.pinyin,
      sourceFr: item.fr
    });
  }
  return words;
}

function sourceData() {
  return state.scope === "words" ? VOCAB_DATA : DATA;
}

function scopeLabel() {
  return state.scope === "words" ? "mots" : "phrases";
}

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY));
    return parsed && typeof parsed === "object" ? parsed : { items: {}, days: [] };
  } catch {
    return { items: {}, days: [] };
  }
}

function saveProgress() {
  localStorage.setItem(STORE_KEY, JSON.stringify(progress));
}

function entry(id) {
  if (!progress.items) progress.items = {};
  if (!progress.items[id]) {
    progress.items[id] = { score: 0, seen: 0, correct: 0, due: 0, last: 0 };
  }
  return progress.items[id];
}

function filteredData() {
  const query = normalizeSearch(state.search);
  return sourceData().filter((item) => {
    const themeOk = state.theme === "all" || item.theme === state.theme;
    if (!themeOk) return false;
    if (!query) return true;
    const haystack = normalizeSearch(`${item.hanzi} ${item.pinyin} ${item.fr} ${item.answer} ${item.sourceHanzi || ""}`);
    return haystack.includes(query);
  });
}

function currentPhrase() {
  return sourceData().find((item) => item.id === state.currentId) || filteredData()[0] || sourceData()[0] || DATA[0];
}

function normalizeSearch(value) {
  return String(value)
    .toLowerCase()
    .replace(/[ǖǘǚǜü]/g, "v")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizeAnswer(value) {
  return normalizeSearch(value).replace(/[\s,.;:!?，。！？、；：“”"'’()-]/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHanzi(text) {
  return Array.from(String(text)).map((char) => {
    if (!/[\u3400-\u9fff]/u.test(char)) return escapeHtml(char);
    const info = charInfo(char);
    return `<span class="char-token" tabindex="0" data-char="${escapeHtml(char)}" data-info="${escapeHtml(info)}">${escapeHtml(char)}</span>`;
  }).join("");
}

function charInfo(char) {
  const examples = sourceData()
    .filter((item) => item.hanzi.includes(char))
    .slice(0, 2)
    .map((item) => item.hanzi)
    .join(" / ");
  const base = CHAR_INFO[char] || "sens variable selon le mot et le contexte";
  return examples ? `${base} · exemple: ${examples}` : base;
}

function clozeMarkup(item) {
  const index = item.hanzi.indexOf(item.answer);
  if (index >= 0) {
    const before = item.hanzi.slice(0, index);
    const after = item.hanzi.slice(index + item.answer.length);
    return `${renderHanzi(before)}<span class="blank">${" ".repeat(Math.min(item.answer.length, 6))}</span>${renderHanzi(after)}`;
  }
  return `${renderHanzi(item.hanzi)} <span class="blank"></span>`;
}

function render() {
  renderScopeSwitch();
  renderThemes();
  renderModes();
  renderStats();
  renderPractice();
  renderList();
  renderReviewModal();
}

function renderScopeSwitch() {
  els.scopeSwitch.innerHTML = SCOPES.map((scope) => `
    <button class="${state.scope === scope.id ? "active" : ""}" type="button" data-scope="${scope.id}" role="tab" aria-selected="${state.scope === scope.id}">
      ${scope.label}
    </button>
  `).join("");
}

function renderThemes() {
  const source = sourceData();
  const counts = Object.fromEntries(Object.keys(THEMES).map((key) => [key, key === "all" ? source.length : source.filter((item) => item.theme === key).length]));
  els.themeNav.innerHTML = Object.entries(THEMES)
    .map(([key, theme]) => `
      <button class="theme-button ${state.theme === key ? "active" : ""}" type="button" data-theme="${key}">
        <span class="theme-glyph" style="background:${theme.color}">${theme.glyph}</span>
        <span>
          <strong>${theme.label}</strong>
          <small>${theme.short}</small>
        </span>
        <span class="theme-count">${counts[key]}</span>
      </button>
    `)
    .join("");
}

function renderModes() {
  els.modeSwitch.innerHTML = MODES.map((mode) => `
    <button class="${state.mode === mode.id ? "active" : ""}" type="button" data-mode="${mode.id}" role="tab" aria-selected="${state.mode === mode.id}">
      ${mode.label}
    </button>
  `).join("");
}

function renderStats() {
  const items = filteredData();
  const source = sourceData();
  const now = Date.now();
  const studied = source.reduce((sum, item) => sum + entry(item.id).seen, 0);
  const mastered = source.filter((item) => entry(item.id).score >= 4).length;
  const due = items.filter((item) => entry(item.id).due <= now).length;
  const streak = streakCount();
  els.statsGrid.innerHTML = [
    [state.scope === "words" ? "Mots" : "Phrases", items.length, "dans la sélection"],
    ["Révisions", studied, "réponses enregistrées"],
    ["Acquises", mastered, "score solide"],
    ["Série", streak, "jours actifs"]
  ].map(([label, value, caption], index) => `
    <div class="stat-card" style="border-top:4px solid ${["#0f766e", "#c13f3a", "#b48a28", "#2f5f9f"][index]}">
      <strong>${value}</strong>
      <span>${label} · ${caption}</span>
      ${index === 2 ? `<div class="due-line" aria-hidden="true"><i style="--width:${Math.round((mastered / Math.max(source.length, 1)) * 100)}%"></i></div>` : ""}
      ${index === 0 ? `<div class="due-line" aria-hidden="true"><i style="--width:${Math.round((due / Math.max(items.length, 1)) * 100)}%"></i></div>` : ""}
    </div>
  `).join("");
}

function renderPractice() {
  const item = currentPhrase();
  if (!filteredData().length) {
    els.practiceArea.innerHTML = `<div class="empty-state">Aucune phrase ne correspond à cette recherche.</div>`;
    return;
  }

  if (state.mode === "completion") {
    renderCompletion(item);
  } else if (state.mode === "listening") {
    renderListening(item);
  } else if (state.mode === "explorer") {
    renderExplorer(item);
  } else {
    renderFlashcard(item);
  }
}

function renderFlashcard(item) {
  const meta = entry(item.id);
  const theme = THEMES[item.theme];
  els.practiceArea.innerHTML = `
    <div class="practice-grid">
      <article class="phrase-card">
        ${cardHead(item)}
        <div class="hanzi">${renderHanzi(item.hanzi)}</div>
        ${state.revealed ? `
          <div class="pinyin">${escapeHtml(item.pinyin)}</div>
          <p class="translation">${escapeHtml(item.fr)}</p>
          <div class="note">${escapeHtml(item.note)}</div>
        ` : `
          <p class="translation">${state.scope === "words" ? "Traduction et prononciation masquées." : "Traduction, pinyin et nuance masqués."}</p>
        `}
        <div class="card-spacer"></div>
        ${state.revealed ? answerButtons() : `
          <div class="card-actions">
            <button class="primary-button" type="button" data-action="reveal">Révéler</button>
            <button class="ghost-button" type="button" data-action="next">Suivant</button>
          </div>
        `}
      </article>
      <aside class="memory-panel">
        <div class="mini-card tone-board">
          <span>${theme.glyph}</span>
          <strong>${theme.label}</strong>
          <p>${escapeHtml(item.answer)} · ${escapeHtml(item.answerReading)}</p>
        </div>
        <div class="mini-card">
          <strong>Trace mémoire</strong>
          <p>Vu ${meta.seen} fois. Score ${meta.score}/6.</p>
        </div>
        <div class="mini-card">
          <strong>Prochaine révision</strong>
          <p>${dueLabel(meta.due)}</p>
        </div>
      </aside>
    </div>
  `;
}

function renderCompletion(item) {
  const prompt = item.kind === "word"
    ? `<span class="blank">${" ".repeat(Math.min(item.hanzi.length, 6))}</span>`
    : clozeMarkup(item);
  const reading = item.kind === "word" ? "_____" : escapeHtml(item.pinyin.replace(item.answerReading, "_____"));
  els.practiceArea.innerHTML = `
    <article class="phrase-card cloze-card">
      ${cardHead(item)}
      <div class="hanzi">${prompt}</div>
      <div class="pinyin">${reading}</div>
      <p class="translation">${escapeHtml(item.fr)}</p>
      <form class="answer-form" data-form="completion">
        <input id="answerInput" type="text" placeholder="Hanzi ou pinyin..." autocomplete="off" />
        <div class="answer-actions">
          <button class="primary-button" type="submit">Vérifier</button>
          <button class="ghost-button" type="button" data-action="hint">Indice</button>
          <button class="ghost-button" type="button" data-action="next">Passer</button>
        </div>
      </form>
      ${state.feedback ? `<div class="feedback ${state.feedback.ok ? "correct" : "wrong"}">${state.feedback.text}</div>` : ""}
      <div class="card-spacer"></div>
      ${state.feedback?.ok ? answerButtons() : ""}
    </article>
  `;
  const input = document.querySelector("#answerInput");
  if (input) input.focus();
}

function renderListening(item) {
  els.practiceArea.innerHTML = `
    <div class="listen-layout">
      <article class="phrase-card">
        ${cardHead(item)}
        <div class="big-listen">
          <button type="button" data-action="speak" title="Ecouter avec Google Translate" aria-label="Ecouter avec Google Translate">
            <svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 9.5a4 4 0 0 1 0 5"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>
          </button>
        </div>
        ${state.revealed ? `
          <div class="hanzi">${renderHanzi(item.hanzi)}</div>
          <div class="pinyin">${escapeHtml(item.pinyin)}</div>
          <p class="translation">${escapeHtml(item.fr)}</p>
          <div class="note">${escapeHtml(item.note)}</div>
        ` : `
          <p class="translation">${escapeHtml(item.fr)}</p>
        `}
        <div class="card-spacer"></div>
        ${state.revealed ? answerButtons() : `
          <div class="card-actions">
            <button class="primary-button" type="button" data-action="reveal">Révéler</button>
            <button class="ghost-button" type="button" data-action="next">Suivant</button>
          </div>
        `}
      </article>
    </div>
  `;
}

function renderExplorer() {
  const items = filteredData();
  els.practiceArea.innerHTML = `
    <article class="phrase-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">${escapeHtml(THEMES[state.theme].label)}</p>
          <h2>${items.length} ${scopeLabel()}</h2>
        </div>
        <button class="danger-button" type="button" data-action="reset">Réinitialiser</button>
      </div>
      <div class="compact-list">
        ${items.map((item) => `
          <div class="compact-row">
            <div>
              <strong>${renderHanzi(item.hanzi)}</strong>
              <span>${escapeHtml(item.pinyin)} · ${escapeHtml(item.fr)}</span>
            </div>
            <button class="icon-button" type="button" data-id="${item.id}" data-action="speakItem" title="Ecouter" aria-label="Ecouter">
              <svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 9.5a4 4 0 0 1 0 5"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>
            </button>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function cardHead(item) {
  const theme = THEMES[item.theme];
  return `
    <div class="card-head">
      <div class="badge-row">
        <span class="badge" style="background:${theme.color}">${theme.label}</span>
        <span class="badge level">${item.kind === "word" ? "Mot" : "Phrase"}</span>
        <span class="badge level">${item.level}</span>
      </div>
      <div class="icon-stack">
        <button class="icon-button" type="button" data-action="back" title="Revenir en arrière" aria-label="Revenir en arrière" ${state.history.length ? "" : "disabled"}>
          <svg viewBox="0 0 24 24"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <button class="icon-button" type="button" data-action="speak" title="Ecouter avec Google Translate" aria-label="Ecouter avec Google Translate">
          <svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 9.5a4 4 0 0 1 0 5"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>
        </button>
        <button class="icon-button" type="button" data-action="google" title="Ouvrir dans Google Translate" aria-label="Ouvrir dans Google Translate">
          <svg viewBox="0 0 24 24"><path d="M7 7h10v10"/><path d="M7 17 17 7"/><path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"/></svg>
        </button>
      </div>
    </div>
  `;
}

function answerButtons() {
  return `
    <div class="card-actions">
      ${Object.entries(RATINGS).map(([key, rating]) => `
        <button class="${rating.tone}-button" type="button" data-rating="${key}">
          ${rating.label}
          <span class="rating-help">${rating.short}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderList() {
  const items = filteredData();
  els.listTitle.textContent = `${state.scope === "words" ? "Mots" : "Phrases"} · ${THEMES[state.theme].label}`;
  els.phraseList.innerHTML = items.length ? items.map((item) => `
    <button class="phrase-item ${item.id === state.currentId ? "active" : ""}" type="button" data-id="${item.id}">
      <div class="list-item-head">
        <strong>${escapeHtml(item.hanzi)}</strong>
        <em>${item.level}</em>
      </div>
      <span>${escapeHtml(item.pinyin)}</span>
      <span>${escapeHtml(item.fr)}</span>
    </button>
  `).join("") : `<div class="empty-state">Aucune phrase trouvée.</div>`;
}

function renderReviewModal() {
  const review = state.reviewModal;
  if (!review) {
    els.modalRoot.innerHTML = "";
    return;
  }
  const rating = RATINGS[review.rating];
  const item = review.item;
  els.modalRoot.innerHTML = `
    <div class="review-backdrop" data-modal="review">
      <section class="review-modal" role="dialog" aria-modal="true" aria-label="Résultat de révision">
        <header>
          <div>
            <p class="eyebrow">Notation enregistrée</p>
            <h2>${rating.label}</h2>
          </div>
          <button class="icon-button" type="button" data-modal-action="closeReview" aria-label="Fermer">
            <svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </header>
        <div class="review-body">
          <div class="review-hanzi">${renderHanzi(item.hanzi)}</div>
          <div class="pinyin">${escapeHtml(item.pinyin)}</div>
          <p class="translation">${escapeHtml(item.fr)}</p>
          <div class="note">${escapeHtml(rating.help)} ${escapeHtml(item.note)}</div>
          <div class="review-grid">
            <div class="review-metric">
              <strong>${review.before.score} → ${review.after.score}</strong>
              <span>Score mémoire</span>
            </div>
            <div class="review-metric">
              <strong>${review.after.seen}</strong>
              <span>Passages vus</span>
            </div>
            <div class="review-metric">
              <strong>${dueLabel(review.after.due)}</strong>
              <span>Prochaine révision</span>
            </div>
          </div>
        </div>
        <footer>
          <button class="ghost-button" type="button" data-modal-action="returnReviewed">Revenir à cette carte</button>
          <button class="danger-button" type="button" data-modal-action="undoRating">Annuler la notation</button>
          <button class="primary-button" type="button" data-modal-action="closeReview">Continuer</button>
        </footer>
      </section>
    </div>
  `;
}

function closeReviewModal() {
  state.reviewModal = null;
  render();
}

function returnReviewed() {
  const review = state.reviewModal;
  if (!review) return;
  pushHistory();
  state.scope = review.scope;
  state.currentId = review.item.id;
  state.revealed = true;
  state.feedback = null;
  state.reviewModal = null;
  render();
}

function undoRating() {
  const review = state.reviewModal;
  if (!review) return;
  progress.items[review.item.id] = { ...review.before };
  saveProgress();
  state.scope = review.scope;
  state.currentId = review.item.id;
  state.revealed = true;
  state.feedback = null;
  state.reviewModal = null;
  render();
}

function handleRating(rating) {
  const item = currentPhrase();
  const meta = entry(item.id);
  const before = { ...meta };
  const now = Date.now();
  const nextScore = {
    again: Math.max(0, meta.score - 1),
    hard: Math.max(1, meta.score),
    good: Math.min(6, meta.score + 1),
    mastered: Math.min(6, meta.score + 2)
  }[rating];
  const delays = {
    again: 3 * 60 * 1000,
    hard: 6 * 60 * 60 * 1000,
    good: Math.max(18, 12 * Math.pow(1.85, nextScore)) * 60 * 60 * 1000,
    mastered: Math.max(48, 24 * Math.pow(2.15, nextScore)) * 60 * 60 * 1000
  };
  meta.score = nextScore;
  meta.seen += 1;
  meta.correct += rating === "again" ? 0 : 1;
  meta.last = now;
  meta.due = now + delays[rating];
  rememberToday();
  saveProgress();
  state.reviewModal = {
    scope: state.scope,
    item: { ...item },
    rating,
    before,
    after: { ...meta }
  };
  nextPhrase();
}

function checkAnswer(value) {
  const item = currentPhrase();
  const accepted = [item.answer, item.answerReading, normalizeAnswer(item.answerReading)]
    .map(normalizeAnswer);
  const ok = accepted.includes(normalizeAnswer(value));
  state.feedback = ok
    ? { ok: true, text: `Correct : ${item.answer} · ${item.answerReading}` }
    : { ok: false, text: `Réponse attendue : ${item.answer} · ${item.answerReading}` };
  if (ok) {
    const meta = entry(item.id);
    meta.correct += 1;
    meta.seen += 1;
    meta.score = Math.min(6, meta.score + 1);
    meta.last = Date.now();
    meta.due = Date.now() + Math.max(12, 10 * Math.pow(1.7, meta.score)) * 60 * 60 * 1000;
    rememberToday();
    saveProgress();
  }
  render();
}

function showHint() {
  const item = currentPhrase();
  state.feedback = { ok: false, text: `Indice : ${item.answer.slice(0, 1)}... · ${item.answerReading}` };
  render();
}

function pushHistory() {
  if (!state.currentId) return;
  const last = state.history[state.history.length - 1];
  if (last?.id === state.currentId && last?.scope === state.scope) return;
  state.history.push({ id: state.currentId, scope: state.scope });
  state.history = state.history.slice(-50);
}

function goBack() {
  const previous = state.history.pop();
  if (!previous) return;
  state.scope = previous.scope;
  state.currentId = previous.id;
  state.revealed = false;
  state.feedback = null;
  state.reviewModal = null;
  render();
}

function nextPhrase(randomize = false) {
  const items = filteredData();
  if (!items.length) return;
  const now = Date.now();
  const ordered = [...items].sort((a, b) => {
    const pa = entry(a.id);
    const pb = entry(b.id);
    return (pa.due <= now ? 0 : 1) - (pb.due <= now ? 0 : 1)
      || pa.score - pb.score
      || pa.last - pb.last;
  });
  const currentIndex = ordered.findIndex((item) => item.id === state.currentId);
  const next = randomize
    ? ordered[Math.floor(Math.random() * ordered.length)]
    : ordered[(currentIndex + 1 + ordered.length) % ordered.length];
  if (next.id !== state.currentId) pushHistory();
  state.currentId = next.id;
  state.revealed = false;
  state.feedback = null;
  render();
}

function dueLabel(timestamp) {
  if (!timestamp) return "Disponible maintenant.";
  const diff = timestamp - Date.now();
  if (diff <= 0) return "Disponible maintenant.";
  if (diff < 60 * 60 * 1000) return `Dans ${Math.ceil(diff / 60000)} min.`;
  if (diff < 24 * 60 * 60 * 1000) return `Dans ${Math.ceil(diff / 3600000)} h.`;
  return new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" }).format(new Date(timestamp));
}

function rememberToday() {
  const key = localDateKey(new Date());
  if (!progress.days) progress.days = [];
  if (!progress.days.includes(key)) progress.days.push(key);
  progress.days = progress.days.slice(-90);
}

function streakCount() {
  const days = new Set(progress.days || []);
  let count = 0;
  const cursor = new Date();
  for (;;) {
    const key = localDateKey(cursor);
    if (!days.has(key)) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function speak(text) {
  lastSpokenText = text;
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=zh-CN&q=${encodeURIComponent(text)}`;
  els.ttsPlayer.src = url;
  els.ttsPlayer.play().catch(() => speakNative(text));
}

function speakNative(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function openGoogleTranslate(text) {
  const url = `https://translate.google.com/?sl=zh-CN&tl=fr&text=${encodeURIComponent(text)}&op=translate`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function showCharPopover(token, locked = false) {
  const rect = token.getBoundingClientRect();
  els.charPopover.innerHTML = `
    <strong>${escapeHtml(token.dataset.char)}</strong>
    <span>${escapeHtml(token.dataset.info)}</span>
  `;
  els.charPopover.hidden = false;
  const top = Math.max(12, rect.top - els.charPopover.offsetHeight - 10);
  const left = Math.min(window.innerWidth - els.charPopover.offsetWidth - 12, Math.max(12, rect.left + rect.width / 2 - els.charPopover.offsetWidth / 2));
  els.charPopover.style.top = `${top}px`;
  els.charPopover.style.left = `${left}px`;
  state.charLocked = locked;
}

function hideCharPopover(force = false) {
  if (state.charLocked && !force) return;
  els.charPopover.hidden = true;
  state.charLocked = false;
}

function bindCharLookup(root) {
  root.addEventListener("pointerover", (event) => {
    const token = event.target.closest("[data-char]");
    if (token) showCharPopover(token);
  });
  root.addEventListener("focusin", (event) => {
    const token = event.target.closest("[data-char]");
    if (token) showCharPopover(token, true);
  });
  root.addEventListener("pointerout", (event) => {
    if (event.target.closest("[data-char]")) hideCharPopover();
  });
  root.addEventListener("click", (event) => {
    const token = event.target.closest("[data-char]");
    if (!token) return;
    event.stopPropagation();
    showCharPopover(token, true);
  });
}

els.themeNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  if (button.dataset.theme === state.theme) return;
  pushHistory();
  state.theme = button.dataset.theme;
  const items = filteredData();
  if (items.length && !items.some((item) => item.id === state.currentId)) {
    state.currentId = items[0].id;
  }
  state.revealed = false;
  state.feedback = null;
  render();
});

els.scopeSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scope]");
  if (!button) return;
  if (button.dataset.scope === state.scope) return;
  pushHistory();
  state.scope = button.dataset.scope;
  const items = filteredData();
  state.currentId = items[0]?.id || sourceData()[0]?.id || DATA[0].id;
  state.revealed = false;
  state.feedback = null;
  state.reviewModal = null;
  render();
});

els.modeSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  state.revealed = false;
  state.feedback = null;
  render();
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  const items = filteredData();
  if (items.length && !items.some((item) => item.id === state.currentId)) {
    state.currentId = items[0].id;
  }
  render();
});

els.phraseList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (!button) return;
  pushHistory();
  state.currentId = button.dataset.id;
  state.revealed = false;
  state.feedback = null;
  render();
});

els.practiceArea.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  const ratingButton = event.target.closest("[data-rating]");
  if (ratingButton) {
    handleRating(ratingButton.dataset.rating);
    return;
  }
  if (!actionButton) return;
  const item = actionButton.dataset.id
    ? [...DATA, ...VOCAB_DATA].find((phrase) => phrase.id === actionButton.dataset.id)
    : currentPhrase();
  if (actionButton.dataset.action === "reveal") {
    state.revealed = true;
    render();
  }
  if (actionButton.dataset.action === "next") nextPhrase();
  if (actionButton.dataset.action === "back") goBack();
  if (actionButton.dataset.action === "hint") showHint();
  if (actionButton.dataset.action === "speak") speak(currentPhrase().hanzi);
  if (actionButton.dataset.action === "speakItem" && item) speak(item.hanzi);
  if (actionButton.dataset.action === "google") openGoogleTranslate(currentPhrase().hanzi);
  if (actionButton.dataset.action === "reset" && confirm("Réinitialiser toute la progression locale ?")) {
    progress = { items: {}, days: [] };
    saveProgress();
    render();
  }
});

els.modalRoot.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-modal-action]");
  if (!actionButton) {
    if (event.target.matches("[data-modal='review']")) closeReviewModal();
    return;
  }
  if (actionButton.dataset.modalAction === "closeReview") closeReviewModal();
  if (actionButton.dataset.modalAction === "returnReviewed") returnReviewed();
  if (actionButton.dataset.modalAction === "undoRating") undoRating();
});

els.practiceArea.addEventListener("submit", (event) => {
  if (!event.target.matches("[data-form='completion']")) return;
  event.preventDefault();
  const input = event.target.querySelector("input");
  checkAnswer(input.value);
});

els.shuffleButton.addEventListener("click", () => nextPhrase(true));
els.testVoiceButton.addEventListener("click", () => speak("你好，我想练习中文。"));
els.ttsPlayer.addEventListener("error", () => {
  if (lastSpokenText) speakNative(lastSpokenText);
});

bindCharLookup(els.practiceArea);
bindCharLookup(els.modalRoot);

document.addEventListener("click", () => hideCharPopover(true));

document.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea")) return;
  if (event.key === "Escape") {
    hideCharPopover(true);
    closeReviewModal();
  }
  if (event.key === " ") {
    event.preventDefault();
    state.revealed = !state.revealed;
    render();
  }
  if (event.key === "ArrowRight") nextPhrase();
  if (event.key.toLowerCase() === "g") speak(currentPhrase().hanzi);
});

render();
