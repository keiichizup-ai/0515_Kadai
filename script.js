let wins = 0;
let losses = 0;
let draws = 0;
let streak = 0;

const playerHandEl = document.getElementById('player-hand');
const cpuHandEl = document.getElementById('cpu-hand');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('start-btn');
const rpsButtons = document.getElementById('rps-buttons');
const resetBtn = document.getElementById('reset-btn');

const hands = {
    rock: '✊',
    scissors: '✌️',
    paper: '✋'
};

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    rpsButtons.classList.remove('hidden');
    messageEl.innerHTML = "じゃん・けん・・・<br>（出す手を選んで！）";
});

function playGame(playerChoice) {
    // ボタンを一時無効化
    rpsButtons.classList.add('hidden');
    
    // アニメーション開始
    playerHandEl.classList.add('shaking');
    cpuHandEl.classList.add('shaking');
    messageEl.innerText = "ポン！";

    setTimeout(() => {
        // アニメーション停止
        playerHandEl.classList.remove('shaking');
        cpuHandEl.classList.remove('shaking');

        // CPUの手を決定
        const choices = ['rock', 'scissors', 'paper'];
        const cpuChoice = choices[Math.floor(Math.random() * 3)];

        // 表示を更新
        playerHandEl.innerText = hands[playerChoice];
        cpuHandEl.innerText = hands[cpuChoice];

        // 勝敗判定
        const result = getResult(playerChoice, cpuChoice);
        updateScore(result);
        
        resetBtn.classList.remove('hidden');
    }, 600); // 0.6秒後に結果表示
}

function getResult(p, c) {
    if (p === c) return 'draw';
    if ((p === 'rock' && c === 'scissors') ||
        (p === 'scissors' && c === 'paper') ||
        (p === 'paper' && c === 'rock')) {
        return 'win';
    }
    return 'lose';
}

function updateScore(result) {
    if (result === 'win') {
        wins++;
        streak++;
        messageEl.innerHTML = "<span style='color:red; font-weight:bold;'>あなたの勝ち！</span><br>今週は最高な一週間になりますよ！";
    } else if (result === 'lose') {
        losses++;
        streak = 0;
        messageEl.innerHTML = "<span style='color:blue; font-weight:bold;'>負けちゃった...</span><br>来週こそは頑張りましょう！";
    } else {
        draws++;
        messageEl.innerHTML = "<span>あいこ！</span><br>もう一回勝負する？";
    }

    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('draws').innerText = draws;
    document.getElementById('streak').innerText = streak;
}

resetBtn.addEventListener('click', () => {
    resetBtn.classList.add('hidden');
    rpsButtons.classList.remove('hidden');
    messageEl.innerText = "じゃん・けん・・・";
    playerHandEl.innerText = '✊';
    cpuHandEl.innerText = '✊';
});