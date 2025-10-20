const API_BASE_URL = 'http://localhost:5000';

function chiaDoi() {
    const playersText = document.getElementById('players').value;
    const teamCount = parseInt(document.getElementById('teamCount').value);
    
    const players = playersText.split('\n')
        .map(player => player.trim())
        .filter(player => player !== '');

    fetch(`${API_BASE_URL}/api/chia-doi`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({players: players, teamCount: teamCount})
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Lỗi: ' + data.error);
        } else {
            hienThiKetQua(data.teams);
        }
    })
    .catch(error => {
        alert('Kết nối thất bại: ' + error);
    });
}

function hienThiKetQua(teams) {
    const container = document.getElementById('teamsContainer');
    const resultSection = document.getElementById('resultSection');
    
    let html = '';
    
    teams.forEach((team, index) => {
        html += `
            <div class="team-card">
                <div class="team-header">
                    <span class="team-name">Đội ${index + 1}</span>
                    <span class="team-count">${team.length} người</span>
                </div>
                <ul class="player-list">
                    ${team.map((player, playerIndex) => `
                        <li class="player-item">
                            <span class="player-number">${playerIndex + 1}</span>
                            <span>${player}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });
    
    container.innerHTML = html;
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Các function hỗ trợ khác
function shufflePlayers() {
    const textarea = document.getElementById('players');
    const players = textarea.value.split('\n')
        .map(player => player.trim())
        .filter(player => player !== '');
    
    if (players.length === 0) {
        alert('Vui lòng nhập danh sách cầu thủ trước!');
        return;
    }
    
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    textarea.value = shuffled.join('\n');
}

function clearAll() {
    document.getElementById('players').value = '';
    document.getElementById('teamCount').value = '2';
    document.getElementById('resultSection').style.display = 'none';
}

function chiaLai() {
    chiaDoi();
}