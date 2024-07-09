document.addEventListener('DOMContentLoaded', (event) => {
    const releasesContainer = document.getElementById('releases-container');

    fetch('https://api.github.com/repos/FlashYan123/letsplay/releases')
        .then(response => response.json())
        .then(data => {
            data.forEach(release => {
                const releaseElement = document.createElement('div');
                releaseElement.classList.add(release.prerelease ? 'announcementpre' : 'announcement');

                const nameElement = document.createElement('h2');
                nameElement.textContent = release.name;

                const typeElement = document.createElement('p');
                // typeElement.textContent = release.prerelease ? 'Pre-release' : 'Release';

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = release.body;

                const dateElement = document.createElement('p');
                dateElement.textContent = `Published on: ${new Date(release.published_at).toLocaleDateString()} by ${release.author ? release.author.login : 'Unknown'}`;

                releaseElement.appendChild(nameElement);
                releaseElement.appendChild(typeElement);
                releaseElement.appendChild(descriptionElement);
                releaseElement.appendChild(dateElement);

                releasesContainer.appendChild(releaseElement);
            });
        })
        .catch(error => console.error('Error fetching releases:', error));
});