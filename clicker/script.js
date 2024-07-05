document.addEventListener('DOMContentLoaded', (event) => {
    let counter = 0;
    let pointsPerClick = 1;
    let upgradeCost = 10;
    const counterElement = document.getElementById('counter');
    const clickButton = document.getElementById('clickButton');
    const upgradeButton = document.getElementById('upgradeButton');
    const pointsPerClickElement = document.getElementById('pointsPerClick');

    function updateDisplay() {
        counterElement.textContent = `Score: ${counter}`;
        pointsPerClickElement.textContent = `Points per click: ${pointsPerClick}`;
        upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
    }

    clickButton.addEventListener('click', () => {
        counter += pointsPerClick;
        updateDisplay();
    });

    upgradeButton.addEventListener('click', () => {
        if (counter >= upgradeCost) {
            counter -= upgradeCost;
            pointsPerClick *= 2;
            upgradeCost *= 3;
            updateDisplay();
        } else {
            alert("Not enough points to upgrade!");
        }
    });

    updateDisplay();
});
