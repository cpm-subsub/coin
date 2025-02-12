(async function checkIP() {
    const blockedIPs = ["122.211.63.65", "111.222.333.444"];
    const webhookURL = "https://discord.com/api/webhooks/1338858412087312444/s5BAVTmRf2nYvNYU7o8xE0BYElIUqQ0sSA4aUT5SWRWZ3Y85Lm_rBGSmjnwh8C342Gak";

    try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        const userIP = data.query; // 取得したIPアドレス
        const userAgent = navigator.userAgent;

        console.log("取得したIP:", userIP);

        if (blockedIPs.includes(userIP)) {
            alert("アクセスが禁止されています。");
            
            // Discord Webhook に送信
            const payload = {
                embeds: [{
                    title: "⚠️ IPブロック通知",
                    description: `**ブロック対象のIP:** \`${userIP}\`\n**デバイス情報:** \`${userAgent}\``,
                    color: 16711680 // 赤色
                }]
            };

            await fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // リダイレクトして追い出す
            window.location.href = "https://www.google.com";
        }
    } catch (error) {
        console.error("IP取得エラー:", error);
    }
})();
