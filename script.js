const pages = document.querySelectorAll('.page');

function goToPage(pageId) {
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
        } else {
            page.classList.add('hidden');
        }
    });

    if (pageId === 'first-text-page') {
        resetFirstTextPage();
        handleFirstTextPage();
        // const textElement = document.getElementById('first-text-page');
        // const firstText = document.getElementById('first-text');
        // firstText.classList.remove('fade-out');
        // firstText.classList.add('fade-in');
        textElement.addEventListener('click', handleFirstTextClick, { once: true });
    } else if (pageId === 'second-text-page') {
        resetSecondTextPage();
        handleSecondTextPage();
    } else if (pageId === 'question-page') {
        loadQuestions();
    } else if (pageId === 'end-page') {
        loadRandomImage();
    }
}

// function handleFirstTextClick() {
//     const firstText = document.getElementById('first-text');
//     firstText.classList.add('fade-out');
//     firstText.addEventListener('animationend', () => goToPage('question-page'), { once: true });
// }

function resetFirstTextPage() {
    const texts = [
        document.getElementById('first-text-1'),
        document.getElementById('first-text-2'),
        document.getElementById('first-text-3')
    ];

    texts.forEach((text, index) => {
        text.classList.add('hidden');
        text.classList.remove('fade-in');
        text.classList.remove('fade-out');
    });

    texts[0].classList.remove('hidden');
    texts[0].classList.add('fade-in');
}

function handleFirstTextPage() {
    let currentText = 0;
    const texts = [
        document.getElementById('first-text-1'),
        document.getElementById('first-text-2'),
        document.getElementById('first-text-3')
    ];

    function showNextText() {
        if (currentText < texts.length - 1) {
            texts[currentText].classList.add('fade-out');
            texts[currentText].addEventListener('animationend', () => {
                texts[currentText].classList.add('hidden');
                currentText++;
                texts[currentText].classList.remove('hidden');
                texts[currentText].classList.add('fade-in');
                document.getElementById('first-text-page').addEventListener('click', showNextText, { once: true });
            }, { once: true });
        } else {
            texts[currentText].classList.add('fade-out');
            texts[currentText].addEventListener('animationend', () => goToPage('question-page'), { once: true });
        }
    }

    document.getElementById('first-text-page').addEventListener('click', showNextText, { once: true });
}


function resetSecondTextPage() {
    const texts = [
        document.getElementById('second-text-1'),
        document.getElementById('second-text-2'),
        document.getElementById('second-text-3')
    ];

    texts.forEach((text, index) => {
        text.classList.add('hidden');
        text.classList.remove('fade-in');
        text.classList.remove('fade-out');
    });

    texts[0].classList.remove('hidden');
    texts[0].classList.add('fade-in');
}

function handleSecondTextPage() {
    let currentText = 0;
    const texts = [
        document.getElementById('second-text-1'),
        document.getElementById('second-text-2'),
        document.getElementById('second-text-3')
    ];

    function showNextText() {
        if (currentText < texts.length - 1) {
            texts[currentText].classList.add('fade-out');
            texts[currentText].addEventListener('animationend', () => {
                texts[currentText].classList.add('hidden');
                currentText++;
                texts[currentText].classList.remove('hidden');
                texts[currentText].classList.add('fade-in');
                document.getElementById('second-text-page').addEventListener('click', showNextText, { once: true });
            }, { once: true });
        } else {
            texts[currentText].classList.add('fade-out');
            texts[currentText].addEventListener('animationend', () => goToPage('random-page'), { once: true });
        }
    }

    document.getElementById('second-text-page').addEventListener('click', showNextText, { once: true });
}

function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    const questions = [
        { question: "[tA斯給Te]<br><br>你覺得希翁想告訴你的是?", 
            choices: ["她是假(臺語諧音)的", "救命啊", "她是gay的"] },
        { question: "聰明的你馬上就明白了，這是其他宇宙的希翁不小心來到你的宇宙了，而你的宇宙的希翁被困在其他宇宙。你决定?", 
            choices: ["馬上出發 拯救希翁", "馬上出發 拯救希翁!", "馬上出發 拯救希翁（三個選項 民主!）"] },
        { question: "你馬上收拾行李，帶上__前往其他宇宙。", 
            choices: ["直笛", "大便糖", "阐释者"] },
        { question: "你該如何前往其他宇宙?", 
            choices: ["走進什麼傳送門之類的", "站在路邊突然被阿布高和的卡車撞到", "發動地鳴應該會有嶄新的宇宙"] },
        { question: "你眼前一黑，竟然成功來到了其他宇宙，打開眼睛後發現不知名生物，它是...", 
            choices: ["電器狗", "米奇", "噴水小火龍"] },
        { question: "你與不知名生物一起踏上尋找希翁的旅途，你們會選擇什麼交通工具？", 
            choices: ["貢丸", "山豬", "倒著開後座超多人車子"] },
        { question: "你們決定前往__，說不定會遇到希翁。", 
            choices: ["侵略火星", "攻打羅馬", "紅彤彤的太陽"] },
        { question: "你沒有找到希翁。突然蹦出一個高人指點，讓你使用道具引誘希翁自己出現。你選擇的道具是...", 
            choices: ["大便糖", "鯡魚罐頭", "芋頭"] },
        { question: "[誘捕失敗]<br><br>看來希翁不喜歡你選的東西呢 請重新選擇誘捕道具。", 
            choices: ["浣熊", "骨灰", "大便味咖喱"] },
        // Add more questions here
    ];

    let currentQuestion = 0;

    function showNextQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            questionContainer.innerHTML = `
                <p class="question">${q.question}</p>
                ${q.choices.map(choice => `<button class="choice" onclick="selectChoice()">${choice}</button>`).join('')}
            `;
        } else {
            goToPage('second-text-page');
        }
    }

    window.selectChoice = function() {
        currentQuestion++;
        showNextQuestion();
    }

    showNextQuestion();
}

function loadRandomImage() {
    const images = [
        { src: './image/十萬獎牌.png', url: 'https://www.youtube.com/live/4O-o0ktc-Gs?si=dX8w7GI0eTXQ7vWc' },
        { src: './image/卡比翁.png', url: 'https://www.youtube.com/live/uJW45sTnld8?si=Hluqv6r4zJyfUgdA' },
        { src: './image/口球米O鼠翁.png', url: 'https://www.youtube.com/live/guXIqOyel-M?si=e_BeD3_4oqmg5qjk&t=2430' },
        { src: './image/希音未來.png', url: 'https://www.youtube.com/live/IqXr-M0RDvU?si=xPINCAyOkNxgka18' },
        { src: './image/吸翁.png', url: 'https://www.youtube.com/live/6-tl-_Ep6DI?si=v0Z3-YfPLVVEg2q-' },
        { src: './image/夏翁.png', url: 'https://www.youtube.com/live/FRqSHG35X3s?si=sQ8cINNLjHN61Nhm' },
        { src: './image/希翁.png', url: 'https://www.youtube.com/live/gHAxaLMeltA?si=qevh_tncJAeBUa4m' },
        { src: './image/希翁師.png', url: 'https://www.youtube.com/live/369vdrHg4PU?si=DoK7oFjnmeBNIVvN' },
        { src: './image/希翁狼.png', url: 'https://www.youtube.com/live/uJW45sTnld8?si=UH1gIqVEpjo1FRvW' },
        { src: './image/機翁.png', url: 'https://www.youtube.com/watch?v=ALm_EY08RtE' },
        { src: './image/浣熊翁.png', url: 'https://www.youtube.com/live/02nH7dI4cWY?si=Ilkg8ARK6VhaaRP_' },
        { src: './image/漆幺幺翁.png', url: 'https://www.youtube.com/live/ePLtH2JErrE?si=mmVYIq37AdvBin83&t=523' },
        { src: './image/王希蜜.png', url: 'https://www.youtube.com/live/mGzEJFAI-88?si=-v4b6LYGJtc_o7RR' },
        { src: './image/王翁翁.png', url: 'https://www.youtube.com/live/IOiOWbg-64M?si=EvJmwj827avQ83In' },
        { src: './image/米主播.png', url: 'https://www.youtube.com/live/n1xVrnnfIzU?si=ZwX1tCCgN8fyQV0L&t=3423' },
        { src: './image/翁哥.png', url: 'https://www.youtube.com/live/ZxUQZIhXaO0?si=VOf2kzFTvdGrw0O9' },
        { src: './image/老希.png', url: 'https://www.youtube.com/live/VQwUpU4eqhk?si=IBFUkMBLq86Betg0' },
        { src: './image/肌翁.png', url: 'https://www.youtube.com/live/MNwv8Xd0MYA?si=L_meXUA4vbKiUpZX' },
        { src: './image/貢丸幫幫主.png', url: 'https://www.youtube.com/live/YGBZhpsefcA?si=UV5b8iJmb8sUMMaY' },
        { src: './image/醉翁.png', url: 'https://www.youtube.com/live/neUDeKue5Eo?si=dD4whvVz1xcs5xa1' },
        { src: './image/阿曼達翁.png', url: 'https://www.youtube.com/live/fX0BkVjHX8A?si=8LDgPtxvtK8x4EBN' },
        { src: './image/雞翁.png', url: 'https://www.youtube.com/live/NmKv_e3w560?si=ytWF51vkZ2cmZ5uL&t=5555' },
        { src: './image/電臺大姐姐.png', url: 'https://www.youtube.com/live/stR4I7dmgDo?si=EKm22cLDsUHvFZjO' },
        { src: './image/骨骨.png', url: 'https://www.youtube.com/live/Di_lx8nfvjw?si=amUfl-wwJKP1AFBx' },
        { src: './image/魔法阿嫲翁.png', url: 'https://www.youtube.com/live/d9ZjBFGBspg?si=AIHmnde9Q_XRpR9s&t=18813' },
        { src: './image/鯡魚罐頭翁.png', url: 'https://www.youtube.com/live/cQn55fyW1A8?si=_CGHpb6q8cBBrmOG' },
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imgElement = document.getElementById('random-image');
    imgElement.src = randomImage.src;

    const linkButton = document.getElementById('external-link');
    linkButton.onclick = () => window.open(randomImage.url, '_blank');

    const downloadButton = document.getElementById('download-image');
    downloadButton.onclick = () => {
        const link = document.createElement('a');
        link.href = randomImage.src;
        const fileName = randomImage.src.split('/').pop(); // Extracts the filename from the path
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
}

// Initialize the app by showing the home page
goToPage('home-page');
