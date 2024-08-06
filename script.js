const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const target = document.getElementById('target');

function shoot(event) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 2.5}px`;
    bullet.style.top = `${player.offsetTop}px`;

    gameContainer.appendChild(bullet);

    const bulletInterval = setInterval(() => {
        bullet.style.top = `${bullet.offsetTop - 5}px`;

        if (bullet.offsetTop < 0) {
            clearInterval(bulletInterval);
            bullet.remove();
        }

        if (isColliding(bullet, target)) {
            clearInterval(bulletInterval);
            bullet.remove();
            target.style.backgroundColor = 'green';
            setTimeout(() => {
                target.style.backgroundColor = 'red';
            }, 100);
        }
    }, 10);
}

function isColliding(bullet, target) {
    const bulletRect = bullet.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    return !(
        bulletRect.top > targetRect.bottom ||
        bulletRect.bottom < targetRect.top ||
        bulletRect.left > targetRect.right ||
        bulletRect.right < targetRect.left
    );
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        shoot(event);
    }
});
