let cube = document.querySelector('.cube');

let isDragging = false;
let startX, startY;
let targetX = 0, targetY = 0;
let threshold = 50; // 드래그 감지 임계값

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 좌우 드래그 → Y축 회전
            if (deltaX > 0) {
                // 오른쪽 드래그 → right → back → left → front
                if (targetY % 360 === 0) targetY += 90; // front -> right
                else if (targetY % 360 === 90) targetY += 90; // right -> back
                else if (targetY % 360 === 180) targetY += 90; // back -> left
                else targetY += 90; // left -> front
            } else {
                // 왼쪽 드래그 → left → back → right → front
                if (targetY % 360 === 0) targetY -= 90; // front -> left
                else if (targetY % 360 === -90) targetY -= 90; // left -> back
                else if (targetY % 360 === -180) targetY -= 90; // back -> right
                else targetY -= 90; // right -> front
            }
        } else {
            // 상하 드래그 → X축 회전
            if (deltaY > 0) {
                // 아래 드래그 → top → back → bottom → front
                if (targetX % 360 === 0) targetX -= 90; // front -> top
                else if (targetX % 360 === -90) targetX -= 90; // top -> back
                else if (targetX % 360 === -180) targetX -= 90; // back -> bottom
                else targetX -= 90; // bottom -> front
            } else {
                // 위로 드래그 → bottom → back → top → front
                if (targetX % 360 === 0) targetX += 90; // front -> bottom
                else if (targetX % 360 === 90) targetX += 90; // bottom -> back
                else if (targetX % 360 === 180) targetX += 90; // back -> top
                else targetX += 90; // top -> front
            }
        }

        updateCubeRotation();
        startX = e.clientX;
        startY = e.clientY;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 부드러운 회전 적용 + back면 자동 회전 보정
function updateCubeRotation() {
    let backCorrection = (targetX % 360 === 180 || targetX % 360 === -180) ? " rotateZ(180deg)" : "";  
    cube.style.transition = "transform 0.5s ease-out";
    cube.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)${backCorrection}`;
}


fetch('https://api.github.com/users/steph00/repos')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.projects').innerHTML = data.map(repo => 
            `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`).join('');
    });

    document.querySelectorAll('.leadership-btn').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    function toggleCard(card) {
        // Only enable click effect if the device is touch-based (mobile)
        if (window.matchMedia("(hover: none)").matches) {
            card.classList.toggle("flipped");
        }
    }
    